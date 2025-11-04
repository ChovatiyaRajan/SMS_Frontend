import { useContext, useEffect, useState } from "react";
import { getUser } from "../api/api";
import { useNavigate } from "react-router";
import AppLayout from "../layout/AppLayout";
import { AuthContext } from "../context/AuthContext";

const Dashbored = () => {
  const navigate = useNavigate();

  const { auth } = useContext(AuthContext);
  const user = auth.user;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return navigate("/");
  }, []);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <AppLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
            Welcome, {user.name}
          </h2>

          <div className="space-y-4 text-gray-800">
            <div>
              <span className="font-semibold">Email:</span> {user.email}
            </div>
            <div>
              <span className="font-semibold">Gender:</span> {user.gender}
            </div>
            <div>
              <span className="font-semibold">Date of Birth:</span>{" "}
              {new Date(user.DOB).toLocaleDateString()}
            </div>
            <div>
              <span className="font-semibold">User ID:</span> {user._id}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashbored;
