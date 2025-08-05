import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./Pages/AuthLayout";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />, // Handles Login/Signup
    },

    // {
    //   path: "/",
    //   element: <MainLayout />,
    //   children: [
    //     {
    //       path: "/home",
    //       element: (
    //         <ProtectedRoute>
    //           <Home />
    //         </ProtectedRoute>
    //       ),
    //     },
    //     {
    //       path: "/search",
    //       element: <Search />,
    //     },
    //     {
    //       path: "/details/:id",
    //       element: <Details />,
    //     },
    //     {
    //       path: "/character/:id",
    //       element: <CharacterDetail />,
    //     },

    //     {
    //       path: "/genre",
    //       element: <Genre />,
    //     },
    //     {
    //       path: "/genre/:id",
    //       element: <GenreDetails />,
    //     },
    //     {
    //       path: "/allCharacters",
    //       element: <AllCharacters />,
    //     },
    //     { path: "/allAnime", element: <AllAnime /> },
    //     { path: "/topAiring", element: <AllAnime /> },
    //     { path: "/upcoming", element: <AllAnime /> },
    //     { path: "/popular", element: <AllAnime /> },
    //     { path: "/mostFavorited", element: <AllAnime /> },
    //     { path: "/movies", element: <AllAnime /> },
    //     {
    //       path: "*",
    //       element: <NotFound />,
    //     },
    //   ],
    // },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
