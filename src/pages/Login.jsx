import { useContext, useState } from "react";
import { LoginUser } from "../api/api.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { auth, dispatch } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) return alert("All fields are required!");

    try {
      const payload = {
        email,
        password,
      };

      const response = await LoginUser(payload);

      const token = response.data.token;

      localStorage.setItem("token", token);

      dispatch({ type: "LOGIN", payload: response.data.user });
      navigate("/home-page");
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={!email || !password}
          className={`w-full text-white py-2 rounded-md transition ${
            !email || !password
              ? "bg-gray-400 hover:bg-gray-700 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
      <p className="mt-4 text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <span
          onClick={() => navigate("/register")}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Register
        </span>
      </p>
    </div>
  );
};

export default LoginForm;
