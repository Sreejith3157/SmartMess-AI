import { Link } from "react-router-dom";

function LoginSelection() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="bg-slate-900 p-10 rounded-2xl shadow-2xl w-full max-w-md text-center">

        <h1 className="text-4xl font-bold text-white mb-3">
          Choose Login
        </h1>

        <p className="text-gray-400 mb-8">
          Select how you want to access SmartMess AI
        </p>

        <div className="space-y-5">

          <Link
            to="/student-login"
            className="block w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition"
          >
            👨‍🎓 Student Login
          </Link>

          <Link
            to="/admin-login"
            className="block w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition"
          >
            👨‍💼 Admin Login
          </Link>

          <Link
            to="/"
            className="block mt-4 text-gray-400 hover:text-white"
          >
            ← Back to Home
          </Link>

        </div>

      </div>
    </div>
  );
}

export default LoginSelection;