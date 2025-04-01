import React from "react";

const AboutMe: React.FC = () => {
  return (
    <div className="bg-white bg-opacity-80 shadow-lg border border-gray-300 rounded-xl p-6 w-full max-w-md mt-8 transform transition hover:shadow-xl hover:-translate-y-1">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-gray-800 mb-4">About Me</h3>

        <p className="text-gray-700 text-base mb-6 leading-relaxed">
          I am a third-year university student aspiring to become a full-stack
          engineer. I have extensive experience in team development and am
          currently working part-time as an engineer.
        </p>

        <h4 className="text-xl font-bold text-gray-700 mb-4">強み</h4>
        <ul className="list-none space-y-4">
          <li className="flex items-center space-x-4">
            <div className="bg-blue-500 text-white rounded-full p-2 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 10a8 8 0 1116 0A8 8 0 012 10z" />
                <path
                  d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                  fill="#fff"
                  className="opacity-50"
                />
              </svg>
            </div>
            <p className="text-gray-700">
              <span className="font-bold text-gray-800">協調性:</span>{" "}
              チーム内で円滑なコミュニケーション力
            </p>
          </li>
          <li className="flex items-center space-x-4">
            <div className="bg-green-500 text-white rounded-full p-2 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16z" />
                <path
                  d="M8.5 10.5a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0z"
                  fill="#fff"
                  className="opacity-50"
                />
              </svg>
            </div>
            <p className="text-gray-700">
              <span className="font-bold text-gray-800">継続:</span>{" "}
              目標を決め、学習を継続できる力
            </p>
          </li>
          <li className="flex items-center space-x-4">
            <div className="bg-purple-500 text-white rounded-full p-2 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5.05 3.05A7.978 7.978 0 0010 2v16a7.978 7.978 0 00-4.95-1.05z" />
                <path d="M10 2a7.978 7.978 0 014.95 1.05L10 18V2z" />
              </svg>
            </div>
            <p className="text-gray-700">
              <span className="font-bold text-gray-800">
                提案から実装する力:
              </span>{" "}
              課題を見つけ、解決策を提案し、実装する力
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AboutMe;
