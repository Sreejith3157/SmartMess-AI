import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardCard from "../components/DashboardCard";

function StudentDashboard() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(null);

useEffect(() => {
  fetchMenu();
}, []);

const fetchMenu = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/menu");

    if (res.data.length > 0) {
      setMenu(res.data[0]);
    }
  } catch (error) {
    console.error(error);
  }
};

  const handleLogout = () => {
    // Clear Local Storage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");

    // Redirect to Login Selection Page
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="bg-slate-900 px-8 py-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold text-green-400">
          SmartMess AI
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg transition duration-300"
        >
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <div className="p-8">

        <h2 className="text-4xl font-bold">
          👋 Welcome Student
        </h2>

        <p className="text-gray-400 mt-2 mb-8">
          Here's today's mess information.
        </p>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

         <div className="bg-slate-900 p-6 rounded-2xl shadow-xl hover:shadow-green-500/20 hover:-translate-y-2 transition-all duration-300">

  <h3 className="text-xl font-semibold mb-5">
    🍛 Today's Menu
  </h3>

  {menu ? (
    <div className="space-y-4">

      <div className="flex justify-between items-center border-b border-slate-700 pb-2">
        <span className="text-gray-400">🥣 Breakfast</span>
        <span className="font-semibold text-green-400">
          {menu.breakfast}
        </span>
      </div>

      <div className="flex justify-between items-center border-b border-slate-700 pb-2">
        <span className="text-gray-400">🍱 Lunch</span>
        <span className="font-semibold text-green-400">
          {menu.lunch}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-gray-400">🍽 Dinner</span>
        <span className="font-semibold text-green-400">
          {menu.dinner}
        </span>
      </div>

      <p className="text-xs text-gray-500 pt-4">
        📅 {new Date(menu.date).toDateString()}
      </p>

    </div>
  ) : (
    <p className="text-gray-400">Loading...</p>
  )}

</div>

          <DashboardCard
            title="🤖 AI Prediction"
            value="12 kg"
            subtitle="Expected Food Waste"
          />

          <DashboardCard
            title="📅 Attendance"
            value="92%"
            subtitle="This Month"
          />

          <DashboardCard
            title="⭐ Feedback"
            value="4.8 / 5"
            subtitle="Average Student Rating"
          />

        </div>

      </div>

    </div>
  );
}

export default StudentDashboard;