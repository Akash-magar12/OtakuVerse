import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // Import Lucide icon

const Back = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="inline-flex cursor-pointer items-center gap-2 mb-6 text-sm sm:text-base text-white bg-white/10 hover:bg-white/20 focus:ring-2 focus:ring-white/30 px-4 py-2 rounded-lg transition-all duration-200"
    >
      <ArrowLeft size={18} className="shrink-0" />
      <span className="hidden xs:inline">Back</span>
    </button>
  );
};

export default Back;
