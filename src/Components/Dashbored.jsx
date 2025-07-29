import { useEffect, useState } from "react";
import { getUser } from "../api/api";
import { useNavigate } from "react-router";

const Dashbored = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getUserData = async () => {
    try {
      const response = await getUser();

      const data = response.data;

      setUser(data.user);
    } catch (error) {
      console.log(error.message);
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return navigate("/");

    getUserData();
  }, []);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
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
            <span className="font-semibold">Role:</span> {user.role}
          </div>
          <div>
            <span className="font-semibold">User ID:</span> {user._id}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashbored;
