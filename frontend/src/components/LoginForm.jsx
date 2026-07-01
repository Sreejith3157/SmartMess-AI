import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm({ role }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        email,
        password,
      }
    );

    // Check correct login page
    if (res.data.role !== role) {
      alert(`❌ Please login using the ${res.data.role} login page.`);
      return;
    }

    // Save JWT token
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);
    localStorage.setItem("name", res.data.name);

    alert(res.data.message);

    if (role === "student") {
      navigate("/student");
    } else {
      navigate("/admin");
    }

  } catch (error) {
    alert(error.response?.data?.message || "Login Failed");
  }
};

  return (
    <div className="w-full max-w-md bg-slate-900 p-8 rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-bold text-white text-center mb-6">
        Welcome Back 👋
      </h2>

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block text-gray-300 mb-2">Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-green-400"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-green-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-lg text-white font-semibold transition"
        >
          Login
        </button>
      </form>

      <p className="text-center text-gray-400 mt-6">
        Don't have an account?{" "}
        <Link to="/register" className="text-green-400 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;