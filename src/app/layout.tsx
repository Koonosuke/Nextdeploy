"use client";

import { UserProvider } from "@/context/UserContext";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // 現在のページパスを取得

  useEffect(() => {
    // ページ遷移時に自動的にトップへスクロール
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <html lang="en">
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
