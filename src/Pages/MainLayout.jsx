import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import ScrollToTop from "../Components/ScrollToTop";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div className="pt-1 min-h-screen w-full bg-black text-white  ">
      <Toaster position="top-right" />
      <ScrollToTop />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
