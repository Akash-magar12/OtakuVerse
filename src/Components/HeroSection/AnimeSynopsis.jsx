import { Award } from "lucide-react";
import React from "react";

const AnimeSynopsis = ({ anime }) => {
  return (
    <div className="mb-6 ">
      <h2 className="text-lg font-medium mb-2 flex items-center gap-2 text-white">
        <Award className="h-5 w-5 text-gray-300" />
        Synopsis
      </h2>
      <p className="text-gray-300 text-sm md:text-base leading-relaxed">
        {anime?.synopsis?.length > 0
          ? `${anime?.synopsis.slice(0, 300)}...`
          : "No description available."}
      </p>
    </div>
  );
};

export default AnimeSynopsis;
