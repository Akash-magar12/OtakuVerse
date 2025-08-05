import { useSelector } from "react-redux";
import Login from "./Login";
import Signup from "./Signup";
import { Toaster } from "react-hot-toast";

const AuthLayout = () => {
  const { isLogin } = useSelector((store) => store.toggle);
  console.log(isLogin);

  return (
    <div className="">
      <Toaster position="top-right" autoClose={1000} />
      {isLogin ? <Login /> : <Signup />}
    </div>
  );
};

export default AuthLayout;
