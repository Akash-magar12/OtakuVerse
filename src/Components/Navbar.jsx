import React, { useEffect, useState, useRef } from "react";
import {
  Search,
  Menu,
  Cherry,
  X,
  LogOut,
  Home,
  Film,
  Award,
  User,
  Heart,
  Edit,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser, setUser } from "../reducers/userSlice";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const avatarRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const toggleAvatarMenu = () => setAvatarMenuOpen((prev) => !prev);
  const closeAvatarMenu = () => setAvatarMenuOpen(false);

  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    return parts.length === 1
      ? parts[0][0].toUpperCase()
      : (parts[0][0] + parts[1][0]).toUpperCase();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(
          setUser({
            uid: firebaseUser.uid,
            username: firebaseUser.displayName,
            email: firebaseUser.email,
            photoUrl: firebaseUser.photoURL,
          })
        );
      } else {
        dispatch(logOutUser());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  // Close avatar dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        closeAvatarMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const handleSearchClick = () => {
    navigate("/search");
    setMenuOpen(false);
  };
  console.log(user?.photoUrl);
  const UserAvatar = () => {
    if (user?.photoUrl) {
      return (
        <img
          src={user?.photoUrl}
          alt={user?.username || "User"}
          className="w-9 h-9 rounded-full object-cover border border-gray-700 shadow-md"
        />
      );
    }
    return (
      <div className="w-9 h-9 flex items-center justify-center rounded-full bg-indigo-400 text-white font-bold shadow-md">
        {getInitials(user?.username)}
      </div>
    );
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/80 text-white shadow-md">
      <nav className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2 group select-none">
          <div className="relative">
            <div className="absolute -top-1 -left-1 w-8 h-8 bg-indigo-500/30 rounded-full blur-md animate-pulse" />
            <Cherry className="h-6 w-6 text-indigo-400 relative z-10 group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-xl font-extrabold tracking-tight">
            Otaku{" "}
            <span className="text-indigo-300 group-hover:text-indigo-400">
              Verse
            </span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <NavLink
            to="/home"
            icon={<Home className="h-4 w-4" />}
            label="Home"
          />
          <NavLink
            to="/genre"
            icon={<Award className="h-4 w-4" />}
            label="Genre"
          />
          <NavLink
            to="/allAnime"
            icon={<Film className="h-4 w-4" />}
            label="All Anime"
          />
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <button
            onClick={handleSearchClick}
            className="hidden md:block p-2 bg-gray-900/80 rounded-full border border-gray-700/50 text-gray-300 hover:text-white hover:border-gray-500"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Avatar dropdown */}
          {user && (
            <div className="hidden md:flex relative" ref={avatarRef}>
              <div
                onClick={toggleAvatarMenu}
                className="cursor-pointer flex items-center"
              >
                <UserAvatar />
              </div>

              {avatarMenuOpen && (
                <div className="absolute right-0 mt-12 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg py-2 z-50">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white"
                    onClick={closeAvatarMenu}
                  >
                    <Edit className="h-4 w-4" /> Profile
                  </Link>
                  <Link
                    to="/favourite"
                    className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white"
                    onClick={closeAvatarMenu}
                  >
                    <Heart className="h-4 w-4" /> Favourite
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      closeAvatarMenu();
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white w-full text-left"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-300 hover:text-white"
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden bg-black/90 border-t border-gray-700/50 shadow-lg">
          <ul className="px-2 pt-3 pb-4 space-y-1">
            <MobileNavLink
              to="/home"
              icon={<Home className="h-5 w-5" />}
              label="Home"
              close={closeMenu}
            />
            <MobileNavLink
              to="/genre"
              icon={<Award className="h-5 w-5" />}
              label="Genre"
              close={closeMenu}
            />
            <MobileNavLink
              to="/all-anime"
              icon={<Film className="h-5 w-5" />}
              label="All Anime"
              close={closeMenu}
            />
            <MobileNavLink
              to="/search"
              icon={<Search className="h-5 w-5" />}
              label="Search"
              close={closeMenu}
            />
            <MobileNavLink
              to="/profile"
              icon={<Edit className="h-5 w-5" />}
              label="Edit Profile"
              close={closeMenu}
            />
            <MobileNavLink
              to="/favourite"
              icon={<Heart className="h-5 w-5" />}
              label="Favourite"
              close={closeMenu}
            />
            <button
              onClick={() => {
                handleLogout();
                closeMenu();
              }}
              className="w-full text-left px-3 py-2 flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800/70 rounded-md"
            >
              <LogOut className="h-5 w-5" /> Logout
            </button>
          </ul>
        </nav>
      )}
    </header>
  );
};

const NavLink = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center gap-1 py-2 text-gray-300 hover:text-white relative group"
  >
    {icon}
    <span>{label}</span>
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
  </Link>
);

const MobileNavLink = ({ to, icon, label, close }) => (
  <li>
    <Link
      to={to}
      onClick={close}
      className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/70 rounded-md"
    >
      {icon}
      <span>{label}</span>
    </Link>
  </li>
);

export default Navbar;
