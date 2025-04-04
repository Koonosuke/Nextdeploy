"use client";

import { useUserContext } from "@/context/UserContext";
import { fetchUser, login } from "@/utils/apiUtils";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser, setIsLoggedIn } = useUserContext();

  const handleLogin = async () => {
    try {
      setError(""); // エラーメッセージをクリア

      // ✅ 認証 → Cookie に JWT を保存
      await login(username, password);

      // ✅ Cookie からログイン中のユーザー情報を取得
      const fetchedUser = await fetchUser();

      // ✅ Context にログイン情報をセット
      setUser(fetchedUser);
      setIsLoggedIn(true);

      // ✅ /home に遷移
      router.push("/home");
    } catch (error: any) {
      setError(error.message || "ログインに失敗しました");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">ログイン</h1>
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="ユーザー名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border mb-2 p-2"
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border mb-2 p-2"
        />
        <button onClick={handleLogin} className="bg-blue-500 text-white p-2">
          ログイン
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;

// "use client";

// import { useUserContext } from "@/context/UserContext";
// import { fetchUser, login } from "@/utils/apiUtils";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// const LoginPage = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();
//   const { setUser, setIsLoggedIn } = useUserContext();

//   const handleLogin = async () => {
//     try {
//       setError(""); // エラーメッセージをクリア

//       // ✅ 認証 → Cookie に JWT を保存
//       await login(username, password);

//       // ✅ Cookie からログイン中のユーザー情報を取得
//       const fetchedUser = await fetchUser();

//       // ✅ Context にログイン情報をセット
//       setUser(fetchedUser);
//       setIsLoggedIn(true);

//       // ✅ /home に遷移
//       router.push("/home");
//     } catch (error: any) {
//       setError(error.message || "ログインに失敗しました");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-2xl mb-4">ログイン</h1>
//       <div className="flex flex-col">
//         <input
//           type="text"
//           placeholder="ユーザー名"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="border mb-2 p-2"
//         />
//         <input
//           type="password"
//           placeholder="パスワード"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="border mb-2 p-2"
//         />
//         <button onClick={handleLogin} className="bg-blue-500 text-white p-2">
//           ログイン
//         </button>
//         {error && <p className="text-red-500 mt-2">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
