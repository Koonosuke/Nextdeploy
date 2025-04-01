import type { Database, Infrastructure } from "@/types/index";
import React, { useState } from "react";

interface Framework {
  name: string;
  icon: string;
  level: number;
}

interface Language {
  name: string;
  icon: string;
  level: number;
  frameworks?: Framework[];
}

const TechStack: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const learningLanguages: Language[] = [
    { name: "Java", icon: "/images/icons/java.svg", level: 5 },
    { name: "Go", icon: "/images/icons/go.svg", level: 2 },
    { name: "JavaScript", icon: "/images/icons/javascript.svg", level: 4 },
    { name: "TypeScript", icon: "/images/icons/typescript-icon.svg", level: 3 },
  ];

  const frontendFrameworks: Framework[] = [
    { name: "Next.js", icon: "/images/icons/nextjs-icon.svg", level: 3 },
    { name: "React", icon: "/images/icons/react.svg", level: 4 },
  ];

  const backendFrameworks: Framework[] = [
    { name: "Spring Boot", icon: "/images/icons/springboot.svg", level: 4 },
    { name: "Echo", icon: "/images/icons/echo.png", level: 2 },
    { name: "Node.js", icon: "/images/icons/nodejs.svg", level: 3 },
    { name: "Nest.js", icon: "/images/icons/nestjs.svg", level: 4 },
    { name: "Express.js", icon: "/images/icons/express.svg", level: 3 },
  ];

  const databases: Database[] = [
    { name: "Postgres", icon: "/images/icons/postgresql.svg", level: 5 },
    { name: "MySQL", icon: "/images/icons/mysql.svg", level: 3 },
    { name: "Firebase", icon: "/images/icons/firebase.svg", level: 4 },
    { name: "MongoDB", icon: "/images/icons/mongodb-icon.svg", level: 2 },
  ];

  const infrastructures: Infrastructure[] = [
    { name: "Linux", icon: "/images/icons/linux-tux.svg" },
    { name: "Vercel", icon: "/images/icons/vercel.svg" },
    { name: "AWS S3", icon: "/images/icons/aws-s3.svg" },
    { name: "Lambda", icon: "/images/icons/aws-lambda.svg" },
    { name: "Docker", icon: "/images/icons/docker-icon.svg" },
  ];

  const renderStars = (level: number): string =>
    "★★★★★☆☆☆☆☆".slice(5 - level, 10 - level);

  const renderFrameworkSection = (title: string, frameworks: Framework[]) => (
    <div>
      <h3 className="text-xl font-bold mt-12 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        {title}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {frameworks.map((fw) => (
          <div
            key={fw.name}
            className="flex flex-col items-center bg-gray-700 rounded-xl p-5 shadow-lg hover:scale-105 transition"
          >
            <img src={fw.icon} alt={fw.name} className="w-16 h-16 mb-3" />
            <p className="text-lg font-semibold mb-1">{fw.name}</p>
            <p className="text-yellow-300">{renderStars(fw.level)}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="py-12 bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white px-4">
      <h2 className="text-3xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400">
        Tech Stack
      </h2>

      <div className="max-w-6xl mx-auto">
        <h3 className="text-xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Learning Languages
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {learningLanguages.map((lang) => (
            <div
              key={lang.name}
              className="flex flex-col items-center bg-gray-700 rounded-xl p-5 shadow-lg hover:scale-105 transition"
            >
              <img src={lang.icon} alt={lang.name} className="w-16 h-16 mb-3" />
              <p className="text-lg font-semibold mb-1">{lang.name}</p>
              <p className="text-yellow-300">{renderStars(lang.level)}</p>
            </div>
          ))}
        </div>

        {renderFrameworkSection("Frontend Frameworks", frontendFrameworks)}
        {renderFrameworkSection("Backend Frameworks", backendFrameworks)}

        <h3 className="text-xl font-bold mt-12 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Databases
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {databases.map((db) => (
            <div
              key={db.name}
              className="flex flex-col items-center bg-gray-700 rounded-xl p-5 shadow-lg hover:scale-105 transition"
            >
              <img src={db.icon} alt={db.name} className="w-16 h-16 mb-3" />
              <p className="text-lg font-semibold mb-1">{db.name}</p>
              <p className="text-yellow-300">{renderStars(db.level)}</p>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-bold mt-12 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Infrastructure
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {infrastructures.map((infra) => (
            <div
              key={infra.name}
              className="flex flex-col items-center bg-gray-700 rounded-xl p-5 shadow-lg hover:scale-105 transition"
            >
              <img
                src={infra.icon}
                alt={infra.name}
                className="w-16 h-16 mb-3"
              />
              <p className="text-lg font-semibold">{infra.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
