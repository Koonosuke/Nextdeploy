"use client";

import { fetchUser, updateUserIcon } from "@/utils/apiUtils";
import { useState } from "react";

const UpdateIconForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [userIconUrl, setUserIconUrl] = useState<string>("");

  // 初期アイコンの取得
  const initializeUserIcon = async () => {
    try {
      const userData = await fetchUser();
      setUserIconUrl(userData.userIcon);
    } catch (error) {
      console.error("ユーザー情報の取得に失敗しました:", error);
    }
  };

  // コンポーネントの初期化
  useState(() => {
    initializeUserIcon();
  });

  // ファイル選択時の処理
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // アイコンのアップロード
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("ファイルを選択してください");
      return;
    }

    try {
      const iconUrl = await updateUserIcon(selectedFile);
      setUserIconUrl(iconUrl);
      alert("アイコンがアップロードされました！");
    } catch (error) {
      console.error("アップロードエラー:", error);
      alert("アップロードに失敗しました");
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* プロフィール画像 */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-black to-gray-800 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition duration-500"></div>
        <img
          src={userIconUrl || "/images/default.png"}
          alt="User Icon"
          className="relative w-36 h-36 rounded-full border-4 border-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-2xl transform transition hover:scale-105"
        />
        <label
          htmlFor="file-upload"
          className="absolute bottom-0 right-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white rounded-full p-3 cursor-pointer shadow-lg hover:shadow-2xl hover:scale-110 transition transform"
        >
          ✎
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* ファイル選択および更新ボタン */}
      <div className="mt-6">
        {selectedFile && (
          <p className="text-gray-400 text-sm mb-3 italic">
            Selected File: {selectedFile.name}
          </p>
        )}
        <button
          onClick={handleUpload}
          className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out rounded-full shadow-xl group hover:ring-2 hover:ring-offset-2 hover:ring-gray-600"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-700 via-gray-900 to-black group-hover:from-black group-hover:to-gray-700"></span>
          <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black group-hover:opacity-100"></span>
          <span className="relative">Upload Icon</span>
        </button>
      </div>
    </div>
  );
};

export default UpdateIconForm;
