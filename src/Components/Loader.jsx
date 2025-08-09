import { Sparkles } from "lucide-react";

// components/Loader.jsx
const Loader = () => {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden">
      <div className="relative z-10">
        <div className="animate-spin">
          <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-white/70"></div>
        </div>
        <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-gray-300" />
      </div>
      <p className="mt-4 text-gray-200 text-lg font-medium">
        Summoning anime...
      </p>
    </div>
  );
};

export default Loader;
