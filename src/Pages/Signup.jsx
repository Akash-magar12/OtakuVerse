import React, { useState } from "react";
import { Cherry, Shield, Mail, Eye, EyeOff, Heart, Star } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { showLogin } from "../reducers/toggleSlice";
import { useDispatch } from "react-redux";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, db, provider } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Controlled form state
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Handle input changes for all fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // ========================
  // 📌 Email/Password Signup
  // ========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Basic validation
      if (!data.email || !data.password || !data.username) {
        return toast.error("All fields required");
      }

      // Create Firebase Auth account
      const credential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = credential.user;
      //update dsplay name
      await updateProfile(user, {
        displayName: data.username,
      });
      // Prepare Firestore data
      const userDetail = {
        name: data.username,
        email: data.email,
        createdAt: serverTimestamp(),
      };

      // Use UID as doc ID to avoid duplicate docs for same user
      await setDoc(doc(db, "users", user.uid), userDetail);

      toast.success("Welcome to OtakuVerse!");
      setData({ user: "", email: "", password: "" });
      navigate("/home");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ========================
  // 📌 Google Signup/Login
  // ========================
  const handleGoogle = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const credential = await signInWithPopup(auth, provider);
      const user = credential.user;

      // ⚠ In Google signup, data.username and data.email will be empty
      // Better to use user.displayName & user.email from Google profile
      const userDetail = {
        name: user.displayName,
        email: user.email,
        createdAt: serverTimestamp(),
        photoUrl: user.photoURL,
      };

      // This will overwrite existing doc if user already exists (safe)
      await setDoc(doc(db, "users", user.uid), userDetail, { merge: true });

      toast.success("Welcome to OtakuVerse!");
      navigate("/home");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ========================
  // 📌 UI Section
  // ========================
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-12 overflow-y-auto relative">
      {/* Background Image */}
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

      {/* Signup Card */}
      <div className="w-full max-w-lg bg-black/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-500/30 relative z-10">
        {/* Decorative Corners */}
        <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-white/70 rounded-tl-xl"></div>
        <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-white/70 rounded-tr-xl"></div>
        <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-white/70 rounded-bl-xl"></div>
        <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-white/70 rounded-br-xl"></div>

        {/* Title */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2 relative">
            <div className="absolute -top-1 -left-1 w-10 h-10 bg-gray-500/20 rounded-full blur-md animate-pulse"></div>
            <Cherry className="h-8 w-8 text-white relative z-10" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Otaku <span className="text-indigo-300">Verse</span>
          </h2>
          <p className="mt-1 text-sm sm:text-base text-gray-300 italic">
            Where otaku dreams come true
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-black/90 p-4 sm:p-5 rounded-lg border border-gray-500/30 shadow-md shadow-gray-900/20">
            {/* Username */}
            <div className="mb-4">
              <label className="block text-sm text-gray-200 mb-1">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-white" />
                  Hero Name
                </div>
              </label>
              <input
                onChange={handleChange}
                value={data.username}
                name="username"
                type="text"
                className="w-full px-3 py-2 bg-gray-900/80 border border-gray-600/50 rounded-md text-white placeholder-gray-500 text-sm"
                placeholder="Your anime persona"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm text-gray-200 mb-1">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-white" />
                  Contact Spell
                </div>
              </label>
              <input
                onChange={handleChange}
                value={data.email}
                name="email"
                type="email"
                className="w-full px-3 py-2 bg-gray-900/80 border border-gray-600/50 rounded-md text-white placeholder-gray-500 text-sm"
                placeholder="your@email.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-200 mb-1">
                <div className="flex items-center">
                  <Heart className="h-4 w-4 mr-2 text-white" />
                  Secret Jutsu (Password)
                </div>
              </label>
              <div className="relative">
                <input
                  onChange={handleChange}
                  value={data.password}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full px-3 py-2 bg-gray-900/80 border border-gray-600/50 rounded-md text-white placeholder-gray-500 text-sm"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
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

          {/* Submit Button */}
          <button
            disabled={loading}
            type="submit"
            className="w-full py-2 px-4 rounded-md bg-gray-900/80 border border-gray-600/50 text-white font-medium shadow-md shadow-black/50 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center text-sm sm:text-base">
              <Star className="h-4 w-4 mr-2 group-hover:animate-spin" />
              {loading ? "Summoning Your Account..." : "Join the Adventure"}
            </span>
            <span className="absolute inset-0 h-full w-0 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
          </button>
        </form>

        {/* Divider */}
        <div className="my-6">
          <div className="relative text-center text-sm text-gray-400 mb-4">
            <div className="flex items-center justify-center gap-2">
              <div className="flex-grow border-t border-gray-600"></div>
              <span className="text-xs uppercase tracking-wide">or</span>
              <div className="flex-grow border-t border-gray-600"></div>
            </div>
          </div>

          {/* Google Auth Button */}
          <button
            onClick={handleGoogle}
            type="button"
            className="w-full flex items-center justify-center gap-3 py-2 px-4 rounded-md bg-white text-black font-medium shadow-md hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
          >
            <FcGoogle className="text-2xl" />
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-400">
          Already part of our anime world?{" "}
          <span
            onClick={() => dispatch(showLogin())}
            className="cursor-pointer text-gray-300 hover:underline font-medium"
          >
            Sign in now
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
