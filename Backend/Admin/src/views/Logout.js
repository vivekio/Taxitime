import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    toast.success("Logout successful!");

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return handleLogout;
};

export default useLogout;
