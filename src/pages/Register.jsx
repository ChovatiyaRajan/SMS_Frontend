import { useMemo, useState } from "react";
import { RegisterUser } from "../api/api";
import { useNavigate } from "react-router";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const navigate = useNavigate();

  const isBtnDisabled = useMemo(() => {
    return (
      !name || !email || !password || !conPassword || password !== conPassword
    );
  }, [name, email, password, conPassword]);
  console.log(isBtnDisabled);

  const handleSubmit = async () => {
    console.log("first");
    if (password !== conPassword) return alert("password is not match !");

    const newUser = {
      name,
      email,
      gender,
      DOB: dob,
      password,
    };

    try {
      await RegisterUser(newUser);
    } catch (error) {
      return console.log(error.message);
    }

    setName("");
    setEmail("");
    setGender("");
    setDob("");
    setPassword("");
    setConPassword("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 ">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md ">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

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

        <div className="mb-4">
          <label className="block text-gray-700">Gender</label>
          <select
            name="gender"
            required
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="mt-1 w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="DOB"
            required
            value={dob}
            onChange={(e) => setDob(e.target.value)}
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

        <div className="mb-6">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            required
            value={conPassword}
            onChange={(e) => setConPassword(e.target.value)}
            className="mt-1 w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className={`w-full  text-white py-2 rounded-md  transition ${
            isBtnDisabled
              ? "bg-gray-400 hover:bg-gray-700 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } bg-blue-600 hover:bg-blue-700`}
          disabled={isBtnDisabled}
          onClick={handleSubmit}
        >
          Register
        </button>
      </div>
      <p className="mt-4 text-center text-sm text-gray-600 mb-10">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/")}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Sign In
        </span>
      </p>
    </div>
  );
};

export default RegisterForm;
