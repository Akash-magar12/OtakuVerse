import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p className="mb-6 text-gray-400">Oops! This page doesn't exist.</p>
      <Link
        to="/home"
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
