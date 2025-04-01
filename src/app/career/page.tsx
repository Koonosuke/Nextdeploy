"use client";

import ConfirmationModal from "@/components/ConfirmationModal";
import Header from "@/components/Header";
import { Career } from "@/types/index";
import { createCareer, deleteCareer, fetchCareers } from "@/utils/apiUtils";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const CareerPage = () => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [title, setTitle] = useState("");
  const [period, setPeriod] = useState("");
  const [content, setContent] = useState("");
  const [selectedCareerId, setSelectedCareerId] = useState<number | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  useEffect(() => {
    const loadCareers = async () => {
      try {
        const careerData = await fetchCareers();
        setCareers(careerData.sort((a, b) => (a.period > b.period ? -1 : 1)));
      } catch (error) {
        console.error("経歴の取得に失敗しました:", error);
      }
    };
    loadCareers();
  }, []);

  const handleCreateCareer = async () => {
    if (!title || !period || !content) {
      alert("すべてのフィールドを入力してください。");
      return;
    }

    try {
      await createCareer(title, period, content);
      alert("新しい経歴が追加されました。");
      setTitle("");
      setPeriod("");
      setContent("");
      const updatedCareers = await fetchCareers();
      setCareers(updatedCareers.sort((a, b) => (a.period > b.period ? -1 : 1)));
    } catch (error) {
      console.error("経歴の追加に失敗しました:", error);
    }
  };

  const handleDeleteCareer = async (id: number) => {
    try {
      await deleteCareer(id);
      setCareers((prev) => prev.filter((career) => career.id !== id));
      alert("経歴が削除されました。");
    } catch (error) {
      console.error("経歴の削除に失敗しました:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* ヘッダー */}
      <Header />

      <div className="p-6 sm:p-10 max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
          Career Timeline
        </h1>

        {/* 新しい経歴の追加 */}
        <div className="mb-12 p-6 bg-gray-800 rounded-lg shadow-2xl border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-gray-300">
            Add New Career
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Period (e.g., 2023 February - June)"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Description of what you did"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
              rows={4}
            ></textarea>
            <button
              onClick={handleCreateCareer}
              className="w-full py-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold rounded-lg shadow-lg transform transition hover:scale-105"
            >
              Add Career
            </button>
          </div>
        </div>

        {/* キャリアリスト */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 border-l-4 border-blue-500 pl-6">
          {careers.map((career, index) => (
            <div
              key={career.id}
              className="relative p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700 transform transition hover:scale-105"
            >
              {/* タイムライン丸印 */}
              <div
                className={`absolute -left-7 top-6 w-6 h-6 rounded-full border-4 ${
                  index % 2 === 0
                    ? "border-blue-400 bg-blue-500"
                    : "border-green-400 bg-green-500"
                }`}
              ></div>

              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold">{career.title}</h3>
                <button
                  onClick={() => {
                    setSelectedCareerId(career.id);
                    setIsConfirmOpen(true);
                  }}
                  className="text-red-500 hover:text-red-700 transition p-2 rounded-full hover:bg-gray-700"
                >
                  <FaTrashAlt size={18} />
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-1">{career.period}</p>
              <p className="mt-3 text-gray-300">{career.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ⬇ 削除確認モーダル（コンポーネント化） */}
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={async () => {
          if (selectedCareerId !== null) {
            await handleDeleteCareer(selectedCareerId);
            setIsConfirmOpen(false);
            setSelectedCareerId(null);
          }
        }}
        message="本当にこのキャリア削除しますか？"
      />
    </div>
  );
};

export default CareerPage;
