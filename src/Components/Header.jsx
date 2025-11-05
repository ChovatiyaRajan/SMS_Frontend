import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  const allowedRoles = ["ADMIN", "SUPER_ADMIN"];

  // Navigation items based on role
  const navLinks = [];

  if (allowedRoles.includes(auth?.user?.role)) {
    navLinks.push({ label: "Admin Panel", to: "/admin/users-data" });
  }

  if (auth?.user?.role === "USER") {
    if (window.location.pathname !== "/home-page")
      navLinks.push({ label: "Home", to: "/home-page" });
    if (window.location.pathname !== "/dashboard")
      navLinks.push({ label: "Profile", to: "/dashboard" });
    if (!auth?.user?.courseId && window.location.pathname !== "/find-courses") {
      navLinks.push({ label: "Coures", to: "/find-courses" });
    }
    navLinks.push({
      label: "My Course",
      to: `/my-coures/${auth.user.courseId}`,
    });
  }

  if (auth?.user?.role === "SUPER_ADMIN" || "ADMIN") {
    if (window.location.pathname !== "/home-page")
      navLinks.push({ label: "Home", to: "/home-page" });
    if (window.location.pathname !== "/dashboard")
      navLinks.push({ label: "Profile", to: "/dashboard" });
  }

  return (
    <header className="bg-gray-800 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          MyApp
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md transition ${
                  isActive
                    ? "bg-gray-900"
                    : "hover:bg-gray-700 text-gray-200 hover:text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
          >
            Logout
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-700 flex flex-col items-center py-4 space-y-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-200 hover:bg-gray-700 px-4 py-2 rounded-md w-40 text-center transition"
            >
              {link.label}
            </NavLink>
          ))}
          <button
            onClick={() => {
              setIsMenuOpen(false);
              handleLogout();
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition w-40"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
