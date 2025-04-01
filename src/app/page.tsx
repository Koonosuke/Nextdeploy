"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LandingPage = () => {
  const router = useRouter();

  useEffect(() => {
    // 初期ロード時に/loginへリダイレクト
    router.push("/login");
  }, [router]);

  return null; // ローディング中やリダイレクト中の状態を表示しない
};

export default LandingPage;
