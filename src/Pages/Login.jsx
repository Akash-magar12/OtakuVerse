import React, { useState } from "react";
import { Cherry, Mail, Eye, EyeOff, Star, Lock } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/anime-night-sky-illustration_23-2151684333.jpg?ga=GA1.1.632074292.1744693575&semt=ais_hybrid&w=740')",
          filter: "grayscale(100%)",
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      </div>

      {/* Login Box */}
      <div className="max-w-lg w-full bg-black/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-500/30 relative z-10">
        {/* Borders */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-white/70 rounded-tl-xl pointer-events-none z-20" />
        <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-white/70 rounded-tr-xl pointer-events-none z-20" />
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-white/70 rounded-bl-xl pointer-events-none z-20" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-white/70 rounded-br-xl pointer-events-none z-20" />

        {/* Logo + Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4 relative">
            <div className="absolute -top-1 -left-1 w-12 h-12 bg-gray-500/20 rounded-full blur-md animate-pulse" />
            <Cherry className="h-10 w-10 text-white relative z-10" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            <span className="text-xl font-extrabold tracking-tight text-white">
              Anime{" "}
              <span className="text-indigo-300 group-hover:text-indigo-400">
                Sanctuary
              </span>
            </span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-400 italic">
            Welcome back, fellow otaku
          </p>
        </div>

        {/* Form UI */}
        <form className="space-y-6">
          <div className="bg-black/90 p-5 sm:p-6 rounded-lg border border-gray-500/30 shadow-lg shadow-gray-900/20 space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-200 mb-1"
              >
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-white mr-2" />
                  <span>Contact Spell</span>
                </div>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                placeholder="your@email.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-200 mb-1"
              >
                <div className="flex items-center">
                  <Lock className="h-4 w-4 text-white mr-2" />
                  <span>Secret Jutsu</span>
                </div>
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-gray-300 hover:text-white relative group"
              >
                Forgot your power?
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-md bg-gray-900/80 border border-gray-600/50 text-white font-medium shadow-lg shadow-black/50 transition duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center">
                <Star className="h-5 w-5 mr-2 group-hover:animate-spin" />
                <span>Enter the Anime World</span>
              </span>
              <span className="absolute inset-0 h-full w-0 bg-gray-600 transition-all duration-300 group-hover:w-full" />
            </button>
          </div>
        </form>

        {/* Switch to Signup */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm sm:text-base">
            New to our anime world?{" "}
            <button className="font-medium cursor-pointer text-gray-300 hover:text-white relative group">
              Join the adventure
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
