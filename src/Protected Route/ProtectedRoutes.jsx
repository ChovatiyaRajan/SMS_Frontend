import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router";

const ProtectedRoutes = ({ allowedRoles = [] }) => {
  const token = localStorage.getItem("token");

  const { auth,loading } = useContext(AuthContext);

  const role = auth.user?.role;

  const hasAccess = allowedRoles?.includes(role);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }
  return hasAccess && token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
