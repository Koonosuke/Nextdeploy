"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaBook, FaEnvelope, FaHome } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const navigateTo = (path: string) => {
    setMenuOpen(false);
    router.push(path);
  };

  const navButtonStyle =
    "relative group flex items-center space-x-2 transition duration-300 ease-in-out";

  const navSpanStyle =
    "group-hover:text-teal-400 transition duration-300 ease-in-out";

  const underline =
    "absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 transition-all group-hover:w-full";

  return (
    <header className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white shadow-2xl sticky top-0 w-full z-50 border-b border-gray-700">
      <nav className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
        {/* ロゴ */}
        <h1
          onClick={() => navigateTo("/home")}
          className="cursor-pointer text-2xl font-extrabold tracking-wider hover:scale-105 transition"
        >
          <span className="text-teal-300 italic">Kishi's</span>{" "}
          <span className="text-white">Portfolio</span>
        </h1>

        {/* デスクトップメニュー */}
        <div className="hidden md:flex space-x-10 text-lg">
          <button
            onClick={() => navigateTo("/home")}
            className={navButtonStyle}
          >
            <FaHome className="text-xl text-teal-400" />
            <span className={navSpanStyle}>Home</span>
            <span className={underline}></span>
          </button>
          <button
            onClick={() => navigateTo("/experience")}
            className={navButtonStyle}
          >
            <FaBook className="text-xl text-blue-400" />
            <span className={navSpanStyle}>Experience</span>
            <span className={underline}></span>
          </button>
          <button
            onClick={() => navigateTo("/career")}
            className={navButtonStyle}
          >
            <FaBook className="text-xl text-purple-400" />
            <span className={navSpanStyle}>Career</span>
            <span className={underline}></span>
          </button>
          <a
            href="#message"
            className={navButtonStyle}
            onClick={() => setMenuOpen(false)}
          >
            <FaEnvelope className="text-xl text-pink-400" />
            <span className={navSpanStyle}>Message</span>
            <span className={underline}></span>
          </a>
        </div>

        {/* ハンバーガーメニュー（モバイル） */}
        <button
          className="md:hidden text-3xl focus:outline-none hover:text-teal-400 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </nav>

      {/* モバイルメニュー */}
      {menuOpen && (
        <div className="md:hidden bg-black text-white flex flex-col items-center space-y-2 py-4 border-t border-gray-800 animate-fadeIn">
          <button
            onClick={() => navigateTo("/home")}
            className="py-3 w-full text-center hover:bg-gray-800"
          >
            <FaHome className="inline mr-2 text-teal-400" />
            Home
          </button>
          <button
            onClick={() => navigateTo("/experience")}
            className="py-3 w-full text-center hover:bg-gray-800"
          >
            <FaBook className="inline mr-2 text-blue-400" />
            Experience
          </button>
          <button
            onClick={() => navigateTo("/career")}
            className="py-3 w-full text-center hover:bg-gray-800"
          >
            <FaBook className="inline mr-2 text-purple-400" />
            Career
          </button>
          <a
            href="#message"
            className="py-3 w-full text-center hover:bg-gray-800"
            onClick={() => setMenuOpen(false)}
          >
            <FaEnvelope className="inline mr-2 text-pink-400" />
            Message
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
