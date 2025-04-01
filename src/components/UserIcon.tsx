"use client";
import { useState } from "react";

const UserIcon = ({ iconUrl }: { iconUrl: string }) => {
  const defaultIcon = "/images/background.png"; // デフォルトアイコン
  const [currentIcon, setCurrentIcon] = useState(iconUrl || defaultIcon); // 現在のアイコンURL

  const handleImageError = () => {
    setCurrentIcon(defaultIcon); // エラー時にデフォルトアイコンに切り替え
  };

  return (
    <div className="my-4 flex justify-center items-center">
      <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300">
        <img
          src={currentIcon}
          alt="User Icon"
          className="w-full h-full object-cover" // アイコンを丸枠内に収める
          onError={handleImageError} // 画像読み込みエラー時にハンドラーを実行
        />
      </div>
    </div>
  );
};

export default UserIcon;
