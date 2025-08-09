import { Github, Twitter, Instagram, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-400 pt-10 mt-16 lg:px-16 pb-6 border-none">
      <div className="max-w-8xl mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Logo & About */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-4">Otaku Verse</h3>
            <p className="text-sm mb-4 text-gray-400">
              Your ultimate destination for anime discovery. Find, track, and
              enjoy your favorite anime series.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href="/allAnime"
                  className="hover:text-blue-500 transition-colors"
                >
                  All Anime
                </a>
              </li>
              <li>
                <a
                  href="/topAiring"
                  className="hover:text-blue-500 transition-colors"
                >
                  Top Airing
                </a>
              </li>
              <li>
                <a
                  href="/upcoming"
                  className="hover:text-blue-500 transition-colors"
                >
                  Upcoming
                </a>
              </li>
              <li>
                <a
                  href="/popular"
                  className="hover:text-blue-500 transition-colors"
                >
                  Popular
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Categories
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href="/genre"
                  className="hover:text-blue-500 transition-colors"
                >
                  Genre
                </a>
              </li>
              <li>
                <a
                  href="/allCharacters"
                  className="hover:text-blue-500 transition-colors"
                >
                  Characters
                </a>
              </li>
              <li>
                <a
                  href="/mostFavorited"
                  className="hover:text-blue-500 transition-colors"
                >
                  Most Favorite
                </a>
              </li>
              <li>
                <a
                  href="/movies"
                  className="hover:text-blue-500 transition-colors"
                >
                  Movies
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-400">
            &copy; {currentYear} Anime Sanctuary. All rights reserved.
          </p>

          <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0">
            <div className="flex items-center space-x-2 mb-2 md:mb-0 md:mr-6">
              <Heart size={14} className="text-red-500" />
              <span className="text-gray-400">Made for anime lovers</span>
            </div>

            <div className="flex space-x-4">
              <a
                href="/privacy"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                Privacy
              </a>
              <a
                href="/terms"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                Terms
              </a>
              <a
                href="/contact"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
