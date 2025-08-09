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
import AllCharacters from "./Pages/AllCharacters.JSX";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />, // Handles Login/Signup
    },

    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/anime/details/:id",
          element: <AnimeDetails />,
        },
        {
          path: "/character/:id",
          element: <CharacterDetail />,
        },
        {
          path: "/genre",
          element: <Genre />,
        },
        {
          path: "/genre/:id",
          element: <GenreDetails />,
        },
        {
          path: "/search",
          element: <Searched />,
        },
        {
          path: "/allCharacters",
          element: <AllCharacters />,
        },
        { path: "/allAnime", element: <AllAnime /> },
        { path: "/topAiring", element: <AllAnime /> },
        { path: "/upcoming", element: <AllAnime /> },
        { path: "/popular", element: <AllAnime /> },
        { path: "/mostFavorited", element: <AllAnime /> },
        { path: "/movies", element: <AllAnime /> },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
