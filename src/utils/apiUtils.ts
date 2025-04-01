import {
  Career,
  CreateCareerResponse,
  CreateExperienceResponse,
  CsrfTokenResponse,
  Experience,
  LoginResponse,
  UpdateIconResponse,
  UserResponse,
} from "@/types/index";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// 共通の fetch ラッパー
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit
): Promise<T> => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include", // ← 毎回Cookieを送る
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return (await response.json()) as T;
};

// CSRF トークンを取得
export const getCsrfToken = async (): Promise<string> => {
  const data = await apiRequest<CsrfTokenResponse>("/csrf", {
    method: "GET",
    credentials: "include",
  });
  console.log("取得したCSRFトークン:", data.csrf_token);
  return data.csrf_token;
};
// ログイン処理
export const login = async (
  username: string,
  password: string
): Promise<void> => {
  const csrfToken = await getCsrfToken();
  console.log("送信するCSRFトークン:", csrfToken);

  await apiRequest<LoginResponse>("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken,
    },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });
};

// ✅ ユーザー情報を取得（Cookieベース）
export const fetchUser = async (): Promise<UserResponse> => {
  const data = await apiRequest<UserResponse>("/getMe", {
    method: "GET",
    credentials: "include", // ← Cookieを使って認証
  });
  return data;
};

// ✅ ユーザーアイコンをアップロード（JWTはCookieに入ってる！）
export const updateUserIcon = async (file: File): Promise<string> => {
  const csrfToken = await getCsrfToken(); // CSRFトークンを取得
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${BASE_URL}/uploadmyicon`, {
      method: "POST",
      headers: {
        "X-CSRF-Token": csrfToken, // CSRFトークンのみ必要
      },
      credentials: "include", // ← Cookie送信（JWT付き）
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API Error (${response.status}): ${response.statusText} - ${errorText}`
      );
    }

    const data: UpdateIconResponse = await response.json();
    console.log("✅ アイコンアップロード成功:", data.icon_url);
    return data.icon_url;
  } catch (error) {
    console.error("❌ アップロードエラー:", error);
    throw error;
  }
};

// ✅ 経験情報を取得（JWTはCookieで送信）
export const fetchExperiences = async (): Promise<Experience[]> => {
  return await apiRequest<Experience[]>("/experiences", {
    method: "GET",
    credentials: "include", // ← CookieからJWTを送る
  });
};

// ✅ 経験情報を作成（JWTはCookieで送信）
export const createExperience = async (
  title: string,
  techStack: string,
  content: string,
  iconFile: File
): Promise<CreateExperienceResponse> => {
  const csrfToken = await getCsrfToken(); // CSRFトークン取得

  const formData = new FormData();
  formData.append("title", title);
  formData.append("tech_stack", techStack);
  formData.append("content", content);
  formData.append("file", iconFile);

  return await apiRequest<CreateExperienceResponse>("/experiences", {
    method: "POST",
    headers: {
      "X-CSRF-Token": csrfToken, // ✅ CSRF対策のみ
    },
    credentials: "include", // ✅ Cookieを含めて送信
    body: formData,
  });
};

// ✅ 経験情報を削除（Cookieで認証）
export const deleteExperience = async (id: number): Promise<void> => {
  const csrfToken = await getCsrfToken(); // CSRF取得

  await apiRequest(`/experiences/${id}`, {
    method: "DELETE",
    headers: {
      "X-CSRF-Token": csrfToken, // ✅ CSRF対策のみ
    },
    credentials: "include", // ✅ CookieでJWT送信
  });
};

// ✅ Career一覧取得（Cookieで認証）
export const fetchCareers = async (): Promise<Career[]> => {
  const careers = await apiRequest<Career[]>("/careers", {
    method: "GET",
    credentials: "include", // ✅ Cookie送信で認証
  });

  return careers.sort((a, b) => (a.period > b.period ? -1 : 1));
};

// ✅ Career情報を作成（JWTはCookie経由で送信）
export const createCareer = async (
  title: string,
  period: string,
  content: string
): Promise<CreateCareerResponse> => {
  const csrfToken = await getCsrfToken();

  return await apiRequest<CreateCareerResponse>("/careers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken, // ✅ CSRFだけ必要
    },
    credentials: "include", // ✅ Cookieを送信（JWT含む）
    body: JSON.stringify({ title, period, content }),
  });
};

// ✅ Career情報を削除（JWTはCookie）
export const deleteCareer = async (id: number): Promise<void> => {
  const csrfToken = await getCsrfToken();

  const response = await fetch(`${BASE_URL}/careers/${id}`, {
    method: "DELETE",
    headers: {
      "X-CSRF-Token": csrfToken, // ✅ CSRFトークンだけでOK
    },
    credentials: "include", // ✅ CookieでJWT送信
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `API Error (${response.status}): ${response.statusText} - ${errorText}`
    );
  }

  console.log(`🗑️ Career ID ${id} の削除に成功`);
};
