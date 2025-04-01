"use client";

interface CreateExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  setTitle: (value: string) => void;
  techStack: string;
  setTechStack: (value: string) => void;
  content: string;
  setContent: (value: string) => void;
  setIconFile: (file: File | null) => void;
}

const CreateExperienceModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  setTitle,
  techStack,
  setTechStack,
  content,
  setContent,
  setIconFile,
}: CreateExperienceModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl p-8 max-w-lg w-full text-white">
        <h2 className="text-3xl font-extrabold text-center mb-6">
          新しい経験を作成
        </h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトル"
          className="block w-full p-3 mt-4 bg-gray-700 text-white border-0 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400"
        />
        <input
          type="text"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
          placeholder="技術スタック (カンマ区切り)"
          className="block w-full p-3 mt-4 bg-gray-700 text-white border-0 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="内容"
          className="block w-full p-3 mt-4 bg-gray-700 text-white border-0 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400"
        />
        <input
          type="file"
          onChange={(e) =>
            setIconFile(e.target.files ? e.target.files[0] : null)
          }
          className="block w-full p-3 mt-4 bg-gray-700 text-white border-0 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-2 font-bold text-gray-300 bg-gradient-to-r from-gray-600 to-gray-500 rounded-lg shadow-md hover:from-gray-700 hover:to-gray-600 hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            キャンセル
          </button>
          <button
            onClick={onSubmit}
            className="px-6 py-2 font-bold text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-300 transform hover:scale-105"
          >
            作成
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateExperienceModal;
