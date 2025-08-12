import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./Pages/AuthLayout";
import MainLayout from "./Pages/MainLayout";
import Home from "./Pages/Home";
import AnimeDetails from "./Pages/AnimeDetails";
import CharacterDetail from "./Pages/CharacterDetail";
import Genre from "./Pages/Genre";
import GenreDetails from "./Pages/GenreDetails";
import AllAnime from "./Pages/AllAnime";
import Searched from "./Pages/Search";
import NotFound from "./Pages/NotFound";
import Profile from "./Pages/Profile";
import Favourite from "./Pages/Favourite";
import AllCharacters from "./Pages/AllCharacters";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: AuthLayout, // Handles Login/Signup
    },
    {
      path: "/",
      Component: MainLayout,
      children: [
        { path: "/home", Component: Home },
        { path: "/anime/details/:id", Component: AnimeDetails },
        { path: "/character/:id", Component: CharacterDetail },
        { path: "/genre", Component: Genre },
        { path: "/genre/:id", Component: GenreDetails },
        { path: "/search", Component: Searched },
        { path: "/allCharacters", Component: AllCharacters },
        { path: "/profile", Component: Profile },
        { path: "/favourite", Component: Favourite },
        { path: "/allAnime", Component: AllAnime },
        { path: "/topAiring", Component: AllAnime },
        { path: "/upcoming", Component: AllAnime },
        { path: "/popular", Component: AllAnime },
        { path: "/mostFavorited", Component: AllAnime },
        { path: "/movies", Component: AllAnime },
        { path: "*", Component: NotFound },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
