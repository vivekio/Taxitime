import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = () => {
  const token = Cookies.get("providerToken"); // Get token from cookies
  console.log(token);

  return token ? <Outlet /> : <Navigate to="/partner/login" replace />;
};

export default PrivateRoute;