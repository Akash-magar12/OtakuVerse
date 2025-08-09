import { Loader2 } from "lucide-react";

const Load = ({ value }) => {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <Loader2 className="h-14 w-14 text-blue-500 animate-spin" />
          <div className="absolute inset-0 rounded-full blur-lg bg-blue-500 opacity-20"></div>
        </div>
        <p className="text-gray-400 font-medium">Loading {value}...</p>
      </div>
    </div>
  );
};

export default Load;
