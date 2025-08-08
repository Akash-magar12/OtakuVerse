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
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  useEffect(() => {
    const loggedUser = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);
  console.log(user);
  return (
    <div className="relative z-20">
      <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-black/80 text-white shadow-md z-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute -top-1 -left-1 w-8 h-8 bg-indigo-500/30 rounded-full blur-md animate-pulse" />
                <Cherry className="h-6 w-6 text-indigo-400 relative z-10 group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Otaku{" "}
                <span className="text-indigo-300 group-hover:text-indigo-400">
                  Verse
                </span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <NavLink icon={<Home className="h-4 w-4" />} label="Home" />
              <NavLink icon={<Award className="h-4 w-4" />} label="Genre" />
              <NavLink icon={<Film className="h-4 w-4" />} label="All Anime" />
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-4">
              <button className="hidden md:block p-2 bg-gray-900/80 rounded-full border border-gray-700/50 text-gray-300 hover:text-white transition-all duration-200 hover:border-gray-500">
                <Search className="h-4 w-4" />
              </button>

              <div className="hidden md:flex items-center gap-1 px-3 py-1 bg-gray-700/50 text-sm text-gray-200 rounded-full">
                <User className="h-4 w-4" />
                <span>{user?.displayName}</span>
              </div>

              <button className="hidden md:flex px-3 py-1.5 rounded-md bg-gray-900/80 border border-gray-600/50 text-white text-sm transition duration-300 group items-center gap-1">
                <LogOut className="h-4 w-4 mr-1" />
                <span>Logout</span>
              </button>

              {/* Hamburger Icon */}
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
          </div>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-black/90 border-t border-gray-700/50 shadow-lg">
            <div className="px-2 pt-3 pb-4 space-y-1 sm:px-3">
              <MobileNavLink
                icon={<Home className="h-5 w-5" />}
                label="Home"
                close={closeMenu}
              />
              <MobileNavLink
                icon={<Film className="h-5 w-5" />}
                label="Genre"
                close={closeMenu}
              />
              <MobileNavLink
                icon={<Award className="h-5 w-5" />}
                label="All Anime"
                close={closeMenu}
              />
              <MobileNavLink
                icon={<Search className="h-5 w-5" />}
                label="Search"
                close={closeMenu}
              />
              <MobileNavLink
                icon={<LogOut className="h-5 w-5" />}
                label="Logout"
                close={closeMenu}
              />

              {/* Mobile user */}
              <div className="mt-3 px-3 py-2 flex items-center gap-2 bg-gray-700/40 text-sm text-gray-200 rounded-md">
                <User className="h-4 w-4" />
                <span>User</span>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Decorative border */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-300/30 to-transparent"></div>
    </div>
  );
};

const NavLink = ({ icon, label }) => (
  <Link
    to="/"
    className="flex items-center gap-1 py-2 text-gray-300 hover:text-white relative group"
  >
    {icon}
    <span>{label}</span>
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
  </Link>
);

const MobileNavLink = ({ icon, label, close }) => (
  <button
    onClick={close}
    className="w-full text-left px-3 py-2 flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800/70 rounded-md"
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default Navbar;
