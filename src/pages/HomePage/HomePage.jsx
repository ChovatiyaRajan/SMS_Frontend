import React, { useContext } from "react";
import AppLayout from "../../layout/AppLayout";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { auth } = useContext(AuthContext);
  const userDetails = auth?.user;

  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center bg-gradient-to-b from-gray-50 to-white mt-10">
        {/* Welcome Text */}
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Welcome, {userDetails?.name || "User"} 👋
        </h1>
        <p className="text-gray-600 mb-8 max-w-md">
          Glad to have you back! Explore new courses, enhance your skills, and
          continue your learning journey with us.
        </p>

        {/* Action Button */}
        <Link
          to="/find-courses"
          className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-all duration-300"
        >
          Browse Courses
        </Link>

        {/* Small User Info Section */}
        <div className="mt-10 bg-white p-5 rounded-2xl shadow-md border border-gray-100 w-full max-w-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
            Your Info
          </h2>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <span className="font-medium">Email:</span> {userDetails?.email}
            </p>
            <p>
              <span className="font-medium">Gender:</span>{" "}
              {userDetails?.gender?.toUpperCase()}
            </p>
            <p>
              <span className="font-medium">DOB:</span>{" "}
              {new Date(userDetails?.DOB).toLocaleDateString("en-GB")}
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-gray-400 text-xs mt-10">
          © {new Date().getFullYear()} My Course Portal • Keep Learning 🌱
        </p>
      </div>
    </AppLayout>
  );
};

export default HomePage;
