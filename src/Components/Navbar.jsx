import React, { useEffect, useState } from "react";
import {
  Search,
  Menu,
  Cherry,
  X,
  LogOut,
  Home,
  Film,
  Award,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser, setUser } from "../reducers/userSlice";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  // Toggle mobile menu open/close
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  // Get initials for user without photo
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    return parts.length === 1
      ? parts[0][0].toUpperCase()
      : (parts[0][0] + parts[1][0]).toUpperCase();
  };

  // Listen for auth state change to set or clear user info in redux
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sign out and redirect home
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };
  const handleSearchClick = () => {
    navigate("/search");
    setMenuOpen(false); // also close dropdown on mobile
  };
  // User avatar component for reuse
  const UserAvatar = () => {
    if (user?.photoUrl) {
      return (
        <img
          src={user.photoUrl}
          alt={user.username || "User"}
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
        <Link
          to="/home"
          className="flex items-center gap-2 group select-none"
          aria-label="Go to homepage"
        >
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
          {/* Search button */}
          <button
            onClick={handleSearchClick}
            className="hidden md:block p-2 bg-gray-900/80 rounded-full border border-gray-700/50 text-gray-300 hover:text-white transition duration-200 hover:border-gray-500"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* User avatar desktop */}
          <div className="hidden md:flex items-center">
            {user && <UserAvatar />}
          </div>

          {/* Logout desktop */}
          <button
            onClick={handleLogout}
            className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-md bg-gray-900/80 border border-gray-600/50 text-white text-sm transition duration-300 hover:bg-gray-800"
            aria-label="Logout"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
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
            <button
              onClick={() => {
                handleLogout();
                closeMenu();
              }}
              className="w-full text-left px-3 py-2 flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800/70 rounded-md"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>

            {/* Mobile user info */}
            {user && (
              <li className="mt-3 px-3 flex items-center gap-3">
                <UserAvatar />
                <span className="text-sm capitalize text-gray-200">
                  {user.username}
                </span>
              </li>
            )}
          </ul>
        </nav>
      )}

      {/* Decorative bottom border */}
      <div className="absolute top-full left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-300/30 to-transparent"></div>
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
