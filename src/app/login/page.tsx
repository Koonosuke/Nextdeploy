"use client";

import { useUserContext } from "@/context/UserContext";
import { fetchUser, login } from "@/utils/apiUtils";
import { motion } from "framer-motion";
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
      setError("");
      await login(username, password);
      const fetchedUser = await fetchUser();
      setUser(fetchedUser);
      setIsLoggedIn(true);
      router.push("/home");
    } catch (error: any) {
      setError(error.message || "ログインに失敗しました");
    }
  };

  return (
    <div
      className="h-screen w-screen bg-gradient-to-br from-purple-800 to-blue-900 flex flex-col items-center justify-center px-4"
      style={{
        backgroundImage: `url('/images/background/tech-bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-black bg-opacity-70 rounded-2xl shadow-2xl p-8 w-full max-w-md text-white"
      >
        <h1 className="text-3xl font-extrabold mb-6 text-center animate-pulse">
          Wishing you happiness.
        </h1>

        <input
          type="text"
          placeholder="ユーザー名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-gray-800 text-white placeholder-gray-400 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-800 text-white placeholder-gray-400 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 transition-all duration-200 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </motion.button>

        {error && (
          <p className="text-red-400 mt-4 text-center font-medium">{error}</p>
        )}
      </motion.div>
    </div>
  );
};

export default LoginPage;
