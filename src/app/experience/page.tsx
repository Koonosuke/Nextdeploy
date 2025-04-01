"use client";

import ConfirmationModal from "@/components/ConfirmationModal";
import CreateExperienceModal from "@/components/CreateExperienceModal";
import Header from "@/components/Header";
import { useUserContext } from "@/context/UserContext";
import { Experience } from "@/types/index";
import {
  createExperience,
  deleteExperience,
  fetchExperiences,
} from "@/utils/apiUtils";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

const ExperiencesPage = () => {
  const { user, isLoggedIn } = useUserContext();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [title, setTitle] = useState("");
  const [techStack, setTechStack] = useState("");
  const [content, setContent] = useState("");
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedExperienceId, setSelectedExperienceId] = useState<
    number | null
  >(null);

  useEffect(() => {
    if (isLoggedIn) {
      fetchExperiences()
        .then(setExperiences)
        .catch((err) => console.error("Failed to fetch experience data:", err));
    }
  }, [isLoggedIn]);

  const handleCreateExperience = async () => {
    if (!title || !techStack || !content || !iconFile) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const newExperienceResponse = await createExperience(
        title,
        techStack,
        content,
        iconFile
      );
      const newExperience: Experience = {
        ...newExperienceResponse,
        user_id: user?.id || 0,
      };
      setExperiences([...experiences, newExperience]);
      setTitle("");
      setTechStack("");
      setContent("");
      setIconFile(null);
      setIsCreateModalOpen(false);
    } catch (err) {
      console.error("Failed to create experience:", err);
    }
  };

  const openDeleteModal = (id: number) => {
    setSelectedExperienceId(id);
    setIsModalOpen(true);
  };

  const confirmDeleteExperience = async () => {
    if (selectedExperienceId !== null) {
      try {
        await deleteExperience(selectedExperienceId);
        setExperiences(
          experiences.filter((exp) => exp.id !== selectedExperienceId)
        );
        setIsModalOpen(false);
      } catch (err) {
        console.error("Failed to delete experience:", err);
      }
    }
  };

  return (
    <>
      <Header />
      <div
        className="p-6 pt-24 max-w-7xl mx-auto bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white min-h-screen"
        style={{
          backgroundAttachment: "fixed",
        }}
      >
        <h1 className="text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-400">
          Projects
        </h1>

        {/* + Button */}
        <div className="flex justify-center">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-4 px-10 rounded-full shadow-2xl text-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            ＋ Add New Experience
          </button>
        </div>

        {/* Experience List */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="bg-white shadow-xl rounded-lg overflow-hidden transform transition-all hover:shadow-2xl hover:-translate-y-2 max-h-auto"
            >
              <div className="relative">
                <img
                  src={experience.icon}
                  alt="Experience Icon"
                  className="w-full h-60 object-cover"
                />
                <button
                  onClick={() => openDeleteModal(experience.id)}
                  className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md transition-all duration-300"
                >
                  <FaTrash className="text-xl" />
                </button>
              </div>
              <div className="p-6 relative">
                <h3 className="text-2xl font-bold text-gray-800">
                  {experience.title}
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Tech Stack: {experience.tech_stack}
                </p>
                <p className="text-gray-600 mt-4">{experience.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDeleteExperience}
        message="本当にこの経験を削除しますか？"
      />

      {/* Create Experience Modal */}
      <CreateExperienceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateExperience}
        title={title}
        setTitle={setTitle}
        techStack={techStack}
        setTechStack={setTechStack}
        content={content}
        setContent={setContent}
        setIconFile={setIconFile}
      />
    </>
  );
};

export default ExperiencesPage;
