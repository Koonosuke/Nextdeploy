"use client";

import AboutMe from "@/components/AboutMe";
import Header from "@/components/Header";
import TechStack from "@/components/TechStack";
import UpdateIconForm from "@/components/UpdateIconForm";
import { useUserContext } from "@/context/UserContext";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

const HomePage = () => {
  const { user, loading } = useUserContext();
  const router = useRouter();

  // デバイスによって背景画像を切り替え
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const backgroundImage = isMobile
    ? "/images/background/keshiki1.jpg" // SP用背景画像
    : "/images/background/enoshima.jpg"; // PC用背景画像

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user]);

  if (!user) {
    return null;
  }
  const heading = `Welcome to ${user.username}'s Portfolio!`;

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <section
        id="home"
        className="relative pt-20 px-4 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* 黒半透明オーバーレイ */}
        <div className="absolute inset-0 bg-black opacity-10 z-0" />

        {/* コンテンツ（z-10で上に表示） */}
        <motion.h2
          variants={container}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center text-white text-5xl sm:text-6xl font-black mb-12 tracking-wide drop-shadow-[2px_2px_8px_rgba(0,0,0,0.8)]"
        >
          {heading.split("").map((char, index) => (
            <motion.span
              key={index}
              variants={item}
              whileHover={{
                scale: 1.2,
                textShadow: "0 0 12px rgba(255,255,255,1)",
              }}
              className={`inline-block ${char === " " ? "w-2 sm:w-4" : ""}`}
            >
              {char}
            </motion.span>
          ))}
        </motion.h2>
        <motion.div
          initial={{ y: -100, opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 10,
            delay: 1.2,
          }}
          whileHover={{
            scale: 1.2,
            rotate: [0, 10, -10, 10, -10, 0],
            transition: { duration: 0.6 },
          }}
          className="relative z-10 mx-auto w-fit px-6 py-3 font-extrabold text-xl rounded-xl border-4 border-white shadow-xl
             text-white animate-[flashBg_1.2s_infinite] flex items-center justify-center gap-2"
        >
          <motion.span
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: "loop",
              delay: 1.5,
            }}
          >
            🚨
          </motion.span>
          <span>CRUD操作しないでください！！</span>
          <motion.span
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: "loop",
              delay: 1.8,
            }}
          >
            🚫
          </motion.span>
        </motion.div>

        <div className="flex flex-col items-center">
          {/* 改良されたアイコン更新フォーム */}
          <UpdateIconForm />

          {/* ソーシャルアイコン */}
          <div className="relative flex flex-wrap justify-center gap-12 mt-6 w-fit p-4">
            {/* 半透明の背景ボックス（白色に変更） */}
            <div className="absolute inset-0 w-full h-full bg-white bg-opacity-50 rounded-lg z-0"></div>

            {/* GitHub */}
            <a
              href="https://github.com/Koonosuke"
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-gray-800 hover:text-gray-500 transition-transform transform hover:scale-110 z-10"
            >
              <FaGithub className="w-14 h-14" />
            </a>

            {/* Zenn */}
            <a
              href="https://zenn.dev/koounosuke"
              target="_blank"
              rel="noopener noreferrer"
              className="relative transition-transform transform hover:scale-110 hover:opacity-80 z-10"
            >
              <img
                src="/images/icons/logo-only.svg"
                alt="Zenn"
                className="w-14 h-14"
              />
            </a>

            {/* X */}
            <a
              href="https://x.com/konosukebackend"
              target="_blank"
              rel="noopener noreferrer"
              className="relative transition-transform transform hover:scale-110 hover:opacity-80 z-10"
            >
              <img src="/images/icons/x.svg" alt="X" className="w-14 h-14" />
            </a>
          </div>

          <AboutMe />
        </div>
      </section>

      <TechStack />

      {/* Messageセクション（背景画像なし） */}
      <section id="message" className="py-12 px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Message</h2>
        <div className="max-w-3xl mx-auto">
          <p>
            私のポートフォリオをご覧いただきありがとうございます！何か質問があればぜひお問い合わせください。
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
