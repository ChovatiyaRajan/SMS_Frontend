import { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

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

  return (
    <>
      <div className="bg-blue-600 text-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1
            className="text-xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            MyApp
          </h1>

          <div>
            {auth?.user?.role === "ADMIN" && (
              <NavLink
                to={"/users-data"}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition mr-10"
              >
                Users Data
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
