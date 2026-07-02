import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import AIInsights from "../components/AIInsights";
import DashboardCard from "../components/DashboardCard";
import SkeletonCard from "../components/SkeletonCard";
import WasteChart from "../components/WasteChart";
import API from "../config";
function AdminDashboard() {

  const navigate = useNavigate();
  const menuFormRef = useRef(null);

  // Live Time
  const [time, setTime] = useState(new Date());

useEffect(() => {
  const interval = setInterval(() => {
    setTime(new Date());
  }, 1000);

  return () => {
    clearInterval(interval);
  };
}, []);

  // Menu States
  const [breakfast, setBreakfast] = useState("");
  const [lunch, setLunch] = useState("");
  const [dinner, setDinner] = useState("");
  const [date, setDate] = useState("");

  // Prediction
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPrediction, setShowPrediction] = useState(false);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [alert, setAlert] = useState({
  color: "green",
  title: "No Prediction Yet",
  message: "Run AI Prediction to view insights.",
});
  const [studentCount, setStudentCount] = useState(0);
  const [menuCount, setMenuCount] = useState(0);
  const [historyCount, setHistoryCount] = useState(0);
  const [aiAlert, setAiAlert] = useState({
  message: "Waiting for AI Prediction...",
  color: "text-yellow-400",
  bg: "bg-yellow-500/10",
});
  // Logout
  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");

    navigate("/login");

  };

  // Scroll Menu Form
  const scrollToMenuForm = () => {

    menuFormRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

  };

  // Add Menu
  const handleAddMenu = async () => {

    try {

      const res = await axios.post(
        `${API}/api/menu`,
        {
          breakfast,
          lunch,
          dinner,
          date,
        }
      );

      toast.success("✅ Today's Menu Saved Successfully");

      setBreakfast("");
      setLunch("");
      setDinner("");
      setDate("");

    } catch (error) {

      console.log(error);
      toast.error("❌ Failed to Save Menu");

    }

  };

  // AI Prediction
  const handlePredict = async () => {

    try {

      setLoading(true);

      const today = new Date().toISOString().split("T")[0];

      const menuRes = await axios.get(
        `${API}/api/menu`,
      );

      const todayMenu = menuRes.data.find(
        (menu) => menu.date === today
      );

      if (!todayMenu) {

        toast.error("🍛 Today's Menu Not Found");
        setLoading(false);
        return;

      }

      const res = await axios.post(
        `${API}/api/predict`,
        {
          menu_type: "Regular",
          breakfast: todayMenu.breakfast,
          lunch: todayMenu.lunch,
          dinner: todayMenu.dinner,
          students_present: 580,
          day_of_week: new Date().toLocaleDateString(
            "en-US",
            {
              weekday: "long",
            }
          ),
          holiday: "No",
          rain: "No",
          exam_day: "No",
          festival: "No",
        }
      );

      await axios.post(
        `${API}/api/prediction`,
        {
          date: today,
          breakfast: todayMenu.breakfast,
          lunch: todayMenu.lunch,
          dinner: todayMenu.dinner,
          predictedWaste: Number(
            res.data.predictedWaste
          ),
        }
      );

      const waste = Number(res.data.predictedWaste);

setPrediction(waste);

// AI Alert Logic
if (waste < 8) {
  setAlert({
    color: "green",
    title: "🟢 Excellent",
    message: "Food wastage is under control today.",
  });
} else if (waste <= 15) {
  setAlert({
    color: "yellow",
    title: "🟡 Moderate",
    message: "Waste is acceptable. Keep monitoring.",
  });
} else {
  setAlert({
    color: "red",
    title: "🔴 High Waste Alert",
    message: "Today's predicted waste is unusually high.",
  });
}
toast.success("🤖 AI Prediction Generated Successfully");
setShowPrediction(true);
setLoading(false);

if (waste < 8) {
  setAiAlert({
    message: "🟢 Excellent! Very Low Food Waste Expected.",
    color: "text-green-400",
    bg: "bg-green-500/10",
  });
} else if (waste < 15) {
  setAiAlert({
    message: "🟡 Moderate Waste Expected. Monitor Serving Quantity.",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  });
} else {
  setAiAlert({
    message: "🔴 High Food Waste Expected. Reduce Food Preparation.",
    color: "text-red-400",
    bg: "bg-red-500/10",
  });
}
      setShowPrediction(true);
      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

      toast.error("❌ AI Prediction Failed");

    }

  };
    const loadDashboard = async () => {
  try {
    const [studentRes, menuRes, historyRes] = await Promise.all([
      axios.get(`${API}/api/dashboard/students`),
      axios.get(`${API}/api/menu`),
      axios.get(`${API}/api/prediction`),
    ]);
     console.log("Student API:", studentRes.data);
     console.log("Menu API:", menuRes.data);
     console.log("Prediction API:", historyRes.data);

    // Backend count or studentCount edhu return pannalum handle pannum
     setStudentCount(
    studentRes.data.studentCount ?? studentRes.data.count ?? 0
  );

    const today = new Date().toISOString().split("T")[0];

    const todayMenu = menuRes.data.find(
      (m) => m.date === today
    );

    if (todayMenu) {
      let meals = 0;

      if (todayMenu.breakfast) meals++;
      if (todayMenu.lunch) meals++;
      if (todayMenu.dinner) meals++;

      setMenuCount(meals);
    }

    setHistoryCount(historyRes.data.length);
     if (historyRes.data.length > 0) {
  setPrediction(historyRes.data[0].predictedWaste);
}
  } catch (err) {
    console.log(err);
  }
};
     useEffect(() => {
  loadDashboard();
}, []);

useEffect(() => {
  const timer = setTimeout(() => {
    setDashboardLoading(false);
  }, 1500);

  return () => clearTimeout(timer);
}, []);

    return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="bg-slate-900 px-8 py-4 flex justify-between items-center shadow-lg">

        <h1 className="text-2xl font-bold text-green-400">
          SmartMess AI - Admin
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg transition"
        >
          Logout
        </button>

      </nav>

      <div className="p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-5xl font-bold text-white">
              👨‍💼 Welcome Admin
            </h1>

            <p className="text-slate-400 mt-2">
              Manage your mess efficiently using AI.
            </p>

          </div>

          <div className="text-right">

            <p className="text-green-400 font-bold text-xl">
              🟢 LIVE
            </p>

            <p className="text-white font-semibold">
              {time.toLocaleDateString("en-GB")}
            </p>

            <p className="text-slate-400 text-lg">
              {time.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              })}
            </p>

          </div>

        </div>

        {/* Dashboard Cards */}

       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7 mt-8">

  {dashboardLoading ? (

    <>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </>

  ) : (

    <>
      <DashboardCard
  title="👨‍🎓 Students"
  value={studentCount}
  subtitle="Registered Students"
/>

          <DashboardCard
            title="🍛 Today's Menu"
            value={menuCount}
            subtitle="Breakfast • Lunch • Dinner"
          />

          <DashboardCard
            title="🤖 AI Prediction"
            value={prediction ? prediction : "--"}
subtitle="Expected Food Waste (KG)"
          />

          <DashboardCard
            title="📊 Estimated Tomorrow"
            value={
              prediction
                ? `${(Number(prediction) * 1.04).toFixed(2)} KG`
                : "--"
            }
            subtitle="Based on today's prediction"
          />

          <DashboardCard
  title="📈 Total Predictions"
  value={historyCount}
  subtitle="Stored in MongoDB"
/>

       
    </>

  )}

</div>

        {/* Waste Trend */}

        <div className="mt-8 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 shadow-xl flex justify-between items-center">

          <div>

            <h2 className="text-2xl font-bold">
              📈 Waste Trend
            </h2>

            <p className="text-slate-400 mt-1">
              Compared with previous AI prediction
            </p>

          </div>

          <div className="text-right">

            <h1 className="text-3xl font-bold text-green-400">
              ⬇ Improving
            </h1>

            <p className="text-slate-400">
              Waste reduced by 8%
            </p>

          </div>

        </div>

        {/* Chart */}

        <div className="mt-10">

          {/* Today's AI Status */}

<div className="mt-8 bg-slate-900 rounded-2xl p-6 border border-slate-800">

  <h2 className="text-2xl font-bold text-green-400 mb-6">
    🤖 Today's AI Status
  </h2>

  <div className="grid md:grid-cols-4 gap-6">

    <div className="bg-slate-800 rounded-xl p-5">

      <p className="text-slate-400">
        Prediction
      </p>

      <h2 className="text-green-400 text-2xl font-bold mt-2">
        {prediction ? "Generated ✅" : "Pending ⏳"}
      </h2>

    </div>

    <div className="bg-slate-800 rounded-xl p-5">

      <p className="text-slate-400">
        Date
      </p>

      <h2 className="text-white text-2xl font-bold mt-2">
        {new Date().toLocaleDateString("en-GB")}
      </h2>

    </div>

    <div className="bg-slate-800 rounded-xl p-5">

      <p className="text-slate-400">
        Menu Status
      </p>

      <h2 className="text-blue-400 text-2xl font-bold mt-2">
        {breakfast && lunch && dinner ? "Completed 🍛" : "Waiting..."}
      </h2>

    </div>

    <div className="bg-slate-800 rounded-xl p-5">

      <p className="text-slate-400">
        AI Status
      </p>

      <h2 className="text-purple-400 text-2xl font-bold mt-2">
        {prediction ? "Ready ✔" : "Idle"}
      </h2>

    </div>

  </div>

</div>

{/* AI Alert Banner */}

<div
  className={`mt-8 rounded-2xl p-5 border border-slate-700 ${aiAlert.bg}`}
>

  <div className="flex items-center gap-3">

    <div className="text-3xl">
      🤖
    </div>

    <div>

      <h2 className="text-xl font-bold text-white">
        AI Alert
      </h2>

      <p className={`${aiAlert.color} font-semibold mt-1`}>
        {aiAlert.message}
      </p>

    </div>

  </div>

</div>
          <WasteChart />

          <div
  className={`mt-8 rounded-2xl p-6 border ${
    alert.color === "green"
      ? "bg-green-500/10 border-green-500"
      : alert.color === "yellow"
      ? "bg-yellow-500/10 border-yellow-500"
      : "bg-red-500/10 border-red-500"
  }`}
>
  <h2
    className={`text-2xl font-bold ${
      alert.color === "green"
        ? "text-green-400"
        : alert.color === "yellow"
        ? "text-yellow-400"
        : "text-red-400"
    }`}
  >
    🤖 AI Health Status
  </h2>

  <h3 className="text-xl font-semibold mt-4">
    {alert.title}
  </h3>

  <p className="text-slate-300 mt-2">
    {alert.message}
  </p>
</div>

          <AIInsights />

        </div>

        {/* Quick Actions */}

        <div className="mt-10 bg-slate-900 rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            ⚡ Quick Actions
          </h2>

          <div className="grid md:grid-cols-3 gap-4">

            <button
              onClick={scrollToMenuForm}
              className="bg-green-500 hover:bg-green-600 py-3 rounded-lg"
            >
              ➕ Add Today's Menu
            </button>

            <button
              onClick={handlePredict}
              disabled={loading}
              className={`py-3 rounded-lg transition ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {loading
                ? "⏳ Predicting..."
                : "📈 Run AI Prediction"}
            </button>

            <button
              onClick={() => navigate("/reports")}
              className="bg-yellow-500 hover:bg-yellow-600 py-3 rounded-lg text-black font-semibold"
            >
              📄 View Reports
            </button>

          </div>

        </div>

        {/* Menu Form */}

        <div
          ref={menuFormRef}
          className="mt-10 bg-slate-900 rounded-2xl p-6"
        >

          <h2 className="text-2xl font-bold text-green-400 mb-6">
            🍛 Add Today's Menu
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
                      <input
              type="text"
              placeholder="Breakfast"
              value={breakfast}
              onChange={(e) => setBreakfast(e.target.value)}
              className="p-3 rounded-lg bg-slate-800 border border-slate-700 outline-none"
            />

            <input
              type="text"
              placeholder="Lunch"
              value={lunch}
              onChange={(e) => setLunch(e.target.value)}
              className="p-3 rounded-lg bg-slate-800 border border-slate-700 outline-none"
            />

            <input
              type="text"
              placeholder="Dinner"
              value={dinner}
              onChange={(e) => setDinner(e.target.value)}
              className="p-3 rounded-lg bg-slate-800 border border-slate-700 outline-none"
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-3 rounded-lg bg-slate-800 border border-slate-700 outline-none"
            />

          </div>

          <button
            onClick={handleAddMenu}
            className="mt-6 w-full bg-green-500 hover:bg-green-600 py-3 rounded-lg font-semibold transition"
          >
            💾 Save Menu
          </button>

        </div>

      </div>

      {/* Prediction Popup */}

      {showPrediction && (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-slate-900 rounded-2xl p-8 w-96 text-center shadow-2xl border border-slate-700">

            <h2 className="text-3xl font-bold text-green-400">
              🤖 AI Prediction
            </h2>

            <p className="text-slate-400 mt-4">
              Expected Food Waste
            </p>

            <h1 className="text-6xl font-bold text-white mt-5">
              {prediction} KG
            </h1>

            <p className="text-green-400 mt-5">
              ✔ Prediction Generated Successfully
            </p>

            <button
              onClick={() => setShowPrediction(false)}
              className="mt-8 bg-green-500 hover:bg-green-600 px-8 py-3 rounded-lg font-semibold transition"
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminDashboard;