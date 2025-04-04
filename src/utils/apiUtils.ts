import {
  Career,
  CreateCareerResponse,
  CreateExperienceResponse,
  Experience,
  LoginResponse,
  UpdateIconResponse,
  UserResponse,
} from "@/types/index";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// 🔐 トークンを取得（ローカルストレージから）
const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

// ✅ 共通の fetch ラッパー（credentials: "include" を常につける）
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getToken();

  const headers: HeadersInit = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include", // ← ここがポイント！！
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${response.status} - ${errorText}`);
  }

  return (await response.json()) as T;
};

// ✅ ログイン処理（トークン保存）
export const login = async (
  username: string,
  password: string
): Promise<void> => {
  const res = await apiRequest<LoginResponse>("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  // トークン保存
  localStorage.setItem("token", res.token);
};

// ✅ ユーザー情報を取得
export const fetchUser = async (): Promise<UserResponse> => {
  return await apiRequest<UserResponse>("/getMe", {
    method: "GET",
  });
};

// ✅ ユーザーアイコンアップロード
export const updateUserIcon = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${BASE_URL}/uploadmyicon`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: formData,
    credentials: "include", // ← 明示的に追加
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${response.status} - ${errorText}`);
  }

  const data: UpdateIconResponse = await response.json();
  return data.icon_url;
};

// ✅ 経験情報取得
export const fetchExperiences = async (): Promise<Experience[]> => {
  return await apiRequest<Experience[]>("/experiences", {
    method: "GET",
  });
};

// ✅ 経験情報作成
export const createExperience = async (
  title: string,
  techStack: string,
  content: string,
  iconFile: File
): Promise<CreateExperienceResponse> => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("tech_stack", techStack);
  formData.append("content", content);
  formData.append("file", iconFile);

  return await apiRequest<CreateExperienceResponse>("/experiences", {
    method: "POST",
    body: formData,
  });
};

// ✅ 経験情報削除
export const deleteExperience = async (id: number): Promise<void> => {
  await apiRequest(`/experiences/${id}`, {
    method: "DELETE",
  });
};

// ✅ Career 一覧取得
export const fetchCareers = async (): Promise<Career[]> => {
  const careers = await apiRequest<Career[]>("/careers", {
    method: "GET",
  });

  return careers.sort((a, b) => (a.period > b.period ? -1 : 1));
};

// ✅ Career 作成
export const createCareer = async (
  title: string,
  period: string,
  content: string
): Promise<CreateCareerResponse> => {
  return await apiRequest<CreateCareerResponse>("/careers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, period, content }),
  });
};

// ✅ Career 削除
export const deleteCareer = async (id: number): Promise<void> => {
  await apiRequest(`/careers/${id}`, {
    method: "DELETE",
  });
};

// import {
//   Career,
//   CreateCareerResponse,
//   CreateExperienceResponse,
//   CsrfTokenResponse,
//   Experience,
//   LoginResponse,
//   UpdateIconResponse,
//   UserResponse,
// } from "@/types/index";

// // ✅ BASE_URL の末尾 `/` を除去
// const BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

// if (typeof window !== "undefined") {
//   console.log("BASE_URL:", BASE_URL);
// }

// // ✅ 共通の fetch ラッパー
// const apiRequest = async <T>(
//   endpoint: string,
//   options: RequestInit
// ): Promise<T> => {
//   const response = await fetch(`${BASE_URL}${endpoint}`, {
//     ...options,
//     credentials: options.credentials ?? "include", // include が明示されていなければ include を設定
//   });

//   if (!response.ok) {
//     throw new Error(`API Error: ${response.status}`);
//   }

//   return (await response.json()) as T;
// };

// // ✅ CSRF トークンを取得
// export const getCsrfToken = async (): Promise<string> => {
//   const data = await apiRequest<CsrfTokenResponse>("/csrf", {
//     method: "GET",
//   });
//   console.log("取得したCSRFトークン:", data.csrf_token);
//   return data.csrf_token;
// };

// // ✅ ログイン処理
// export const login = async (
//   username: string,
//   password: string
// ): Promise<void> => {
//   const csrfToken = await getCsrfToken();
//   console.log("送信するCSRFトークン:", csrfToken);

//   await apiRequest<LoginResponse>("/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "X-CSRF-Token": csrfToken,
//     },
//     body: JSON.stringify({ username, password }),
//   });
// };

// // ✅ ユーザー情報を取得（Cookieベース）
// export const fetchUser = async (): Promise<UserResponse> => {
//   return await apiRequest<UserResponse>("/getMe", { method: "GET" });
// };

// // ✅ ユーザーアイコンをアップロード
// export const updateUserIcon = async (file: File): Promise<string> => {
//   const csrfToken = await getCsrfToken();
//   const formData = new FormData();
//   formData.append("file", file);

//   const response = await fetch(`${BASE_URL}/uploadmyicon`, {
//     method: "POST",
//     headers: {
//       "X-CSRF-Token": csrfToken,
//     },
//     credentials: "include",
//     body: formData,
//   });

//   if (!response.ok) {
//     const errorText = await response.text();
//     throw new Error(
//       `API Error (${response.status}): ${response.statusText} - ${errorText}`
//     );
//   }

//   const data: UpdateIconResponse = await response.json();
//   console.log("✅ アイコンアップロード成功:", data.icon_url);
//   return data.icon_url;
// };

// // ✅ 経験情報を取得
// export const fetchExperiences = async (): Promise<Experience[]> => {
//   return await apiRequest<Experience[]>("/experiences", { method: "GET" });
// };

// // ✅ 経験情報を作成
// export const createExperience = async (
//   title: string,
//   techStack: string,
//   content: string,
//   iconFile: File
// ): Promise<CreateExperienceResponse> => {
//   const csrfToken = await getCsrfToken();
//   const formData = new FormData();
//   formData.append("title", title);
//   formData.append("tech_stack", techStack);
//   formData.append("content", content);
//   formData.append("file", iconFile);

//   return await apiRequest<CreateExperienceResponse>("/experiences", {
//     method: "POST",
//     headers: {
//       "X-CSRF-Token": csrfToken,
//     },
//     body: formData,
//   });
// };

// // ✅ 経験情報を削除
// export const deleteExperience = async (id: number): Promise<void> => {
//   const csrfToken = await getCsrfToken();
//   await apiRequest(`/experiences/${id}`, {
//     method: "DELETE",
//     headers: {
//       "X-CSRF-Token": csrfToken,
//     },
//   });
// };

// // ✅ Career一覧取得
// export const fetchCareers = async (): Promise<Career[]> => {
//   const careers = await apiRequest<Career[]>("/careers", { method: "GET" });
//   return careers.sort((a, b) => (a.period > b.period ? -1 : 1));
// };

// // ✅ Career作成
// export const createCareer = async (
//   title: string,
//   period: string,
//   content: string
// ): Promise<CreateCareerResponse> => {
//   const csrfToken = await getCsrfToken();
//   return await apiRequest<CreateCareerResponse>("/careers", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "X-CSRF-Token": csrfToken,
//     },
//     body: JSON.stringify({ title, period, content }),
//   });
// };

// // ✅ Career削除
// export const deleteCareer = async (id: number): Promise<void> => {
//   const csrfToken = await getCsrfToken();
//   const response = await fetch(`${BASE_URL}/careers/${id}`, {
//     method: "DELETE",
//     headers: {
//       "X-CSRF-Token": csrfToken,
//     },
//     credentials: "include",
//   });

//   if (!response.ok) {
//     const errorText = await response.text();
//     throw new Error(
//       `API Error (${response.status}): ${response.statusText} - ${errorText}`
//     );
//   }

//   console.log(`🗑️ Career ID ${id} の削除に成功`);
// };
