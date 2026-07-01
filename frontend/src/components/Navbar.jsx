import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-slate-900 text-white px-10 py-5 flex justify-between items-center shadow-lg">
      
      <h1 className="text-2xl font-bold text-green-400">
        SmartMess AI
      </h1>

      <div className="flex items-center gap-8">
        <a href="#">Home</a>
        <a href="#">Features</a>
        <a href="#">About</a>

        <Link
        to="/login"
          className="bg-green-500 px-5 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Login
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;