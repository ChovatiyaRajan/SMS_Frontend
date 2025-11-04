import { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Dashbored from "./../pages/Dashbored";

const Header = () => {
  const navigate = useNavigate();

  const { auth } = useContext(AuthContext);

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "You have been logged out successfully!"
    );

    if (confirmLogout) {
      localStorage.removeItem("token");
      return navigate("/");
    } else {
      return;
    }
  };

  const allowedRoles = ["ADMIN", "SUPER_ADMIN"];

  return (
    <>
      <div className="bg-gray-800 text-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1
            className="text-xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            MyApp
          </h1>

          <div>
            {allowedRoles.includes(auth?.user?.role) && (
              <NavLink
                to={"/admin/users-data"}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition mr-10"
              >
                Admin Panel
              </NavLink>
            )}

            {auth?.user?.role === "USER" &&
              window.location.pathname !== "/find-courses" && (
                <NavLink
                  to={"/find-courses"}
                  className="bg-green-700  hover:bg-green-800 text-white px-4 py-2 rounded-md transition mr-10"
                >
                  Available Courses
                </NavLink>
              )}

            {auth?.user?.role === "USER" &&
              window.location.pathname === "/find-courses" && (
                <NavLink
                  to={"/dashboard"}
                  className="bg-green-700  hover:bg-green-800 text-white px-4 py-2 rounded-md transition mr-10"
                >
                  Back to Dashboard
                </NavLink>
              )}  
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
