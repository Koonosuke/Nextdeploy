"use client";

import { UserResponse } from "@/types/index";
import { fetchUser } from "@/utils/apiUtils";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type UserContextType = {
  user: UserResponse | null;
  setUser: (user: UserResponse | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const fetchedUser = await fetchUser(); // ← Cookieから認証される
        setUser(fetchedUser);
        setIsLoggedIn(true);
        console.log("✅ ユーザー初期化成功:", fetchedUser);
      } catch (error) {
        console.error("❌ ユーザー情報の取得失敗:", error);
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-500 mb-6" />
        <p className="text-xl font-semibold animate-pulse">接続中...</p>
        <p className="text-sm mt-2 opacity-70">
          🚀 準備ができるまで、少々お待ちください。
        </p>
      </div>
    );
  }

  return (
    <UserContext.Provider
      value={{ user, setUser, isLoggedIn, setIsLoggedIn, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
