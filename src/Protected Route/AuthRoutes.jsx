import { Navigate, Outlet } from "react-router";

const AuthRoutes = () => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default AuthRoutes;
