import React, { useState } from "react";
import { Cherry, Mail, Eye, EyeOff, Star, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { showSignup } from "../reducers/toggleSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = credential.user;

      console.log(user);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-6 px-4 sm:px-6 md:px-8 lg:px-12">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/anime-night-sky-illustration_23-2151684333.jpg')",
          filter: "grayscale(100%)",
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      </div>

      <div className="w-full max-w-md sm:max-w-lg bg-black/80 backdrop-blur-md p-5 sm:p-6 md:p-8 rounded-2xl shadow-2xl border border-gray-500/30 relative z-10">
        {/* Corners */}
        <div className="absolute top-0 left-0 w-10 h-10 sm:w-12 sm:h-12 border-t-2 border-l-2 border-white/70 rounded-tl-xl"></div>
        <div className="absolute top-0 right-0 w-10 h-10 sm:w-12 sm:h-12 border-t-2 border-r-2 border-white/70 rounded-tr-xl"></div>
        <div className="absolute bottom-0 left-0 w-10 h-10 sm:w-12 sm:h-12 border-b-2 border-l-2 border-white/70 rounded-bl-xl"></div>
        <div className="absolute bottom-0 right-0 w-10 h-10 sm:w-12 sm:h-12 border-b-2 border-r-2 border-white/70 rounded-br-xl"></div>

        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="flex justify-center mb-2 relative">
            <div className="absolute -top-1 -left-1 w-10 h-10 bg-gray-500/20 rounded-full blur-md animate-pulse"></div>
            <Cherry className="h-8 w-8 text-white relative z-10" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Otaku <span className="text-indigo-300">Verse</span>
          </h2>
          <p className="mt-1 text-sm sm:text-base text-gray-300 italic">
            Welcome back, fellow otaku
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="bg-black/90 p-4 sm:p-5 rounded-lg border border-gray-500/30 shadow-md">
            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm text-gray-200 mb-1">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-white mr-2" />
                  Contact Spell
                </div>
              </label>
              <input
                onChange={handleChange}
                value={data.email}
                name="email"
                type="email"
                className="w-full px-3 py-2 sm:py-2.5 bg-gray-900/80 border border-gray-600/50 rounded-md text-white placeholder-gray-500 text-sm sm:text-base"
                placeholder="your@email.com"
              />
            </div>

            {/* Password */}
            <div className="mb-2 sm:mb-4">
              <label className="block text-sm text-gray-200 mb-1">
                <div className="flex items-center">
                  <Lock className="h-4 w-4 text-white mr-2" />
                  Secret Jutsu
                </div>
              </label>
              <div className="relative">
                <input
                  onChange={handleChange}
                  value={data.password}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full px-3 py-2 sm:py-2.5 bg-gray-900/80 border border-gray-600/50 rounded-md text-white placeholder-gray-500 text-sm sm:text-base"
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

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="w-full py-2 sm:py-2.5 px-4 rounded-md bg-gray-900/80 border border-gray-600/50 text-white font-medium shadow-md relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center text-sm sm:text-base">
                <Star className="h-4 w-4 mr-2 group-hover:animate-spin" />
                Enter the Anime World
              </span>
              <span className="absolute inset-0 h-full w-0 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
            </button>
          </div>
        </form>

        {/* Divider + Google */}
        <div className="my-5 sm:my-6">
          <div className="relative text-center text-sm text-gray-400 mb-4">
            <div className="flex items-center justify-center gap-2">
              <div className="flex-grow border-t border-gray-600"></div>
              <span className="text-xs sm:text-sm uppercase">or</span>
              <div className="flex-grow border-t border-gray-600"></div>
            </div>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-2 px-4 rounded-md bg-white text-black font-medium shadow-md hover:shadow-lg transition-all text-sm sm:text-base"
          >
            <FcGoogle className="text-xl" />
            Continue with Google
          </button>
        </div>

        {/* Footer */}
        <div className="mt-5 text-center text-sm sm:text-base text-gray-400">
          New to our anime world?{" "}
          <span
            onClick={() => dispatch(showSignup())}
            className="cursor-pointer text-gray-300 hover:underline font-medium"
          >
            Join the adventure
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
