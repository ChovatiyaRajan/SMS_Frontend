import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router";
import { validateToken } from "../utils/utils";

const ProtectedRoutes = ({ allowedRoles = [] }) => {
  const isTokenValid = validateToken();

  const { auth, loading } = useContext(AuthContext);

  const role = auth.user?.role;

  const hasAccess = allowedRoles?.includes(role);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }
  return hasAccess && isTokenValid ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
