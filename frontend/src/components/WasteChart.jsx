import { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function WasteChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/history"
      );

      // Latest 7 predictions
      const latestHistory = res.data
  .slice(0, 7)
  .reverse();

setHistory(latestHistory);

      const labels = latestHistory.map((item) =>
        new Date(item.date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
        })
      );

      const waste = latestHistory.map(
        (item) => item.predictedWaste
      );

      setChartData({
        labels,
        datasets: [
          {
            maxBarThickness: 70,
            label: "Predicted Food Waste (KG)",
            data: waste,
            backgroundColor: [
              "#22c55e",
              "#3b82f6",
              "#f59e0b",
              "#ef4444",
              "#8b5cf6",
              "#06b6d4",
              "#10b981",
            ],
            borderRadius: 10,
          },
        ],
      });

      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
     const averageWaste =
  history.length > 0
    ? history.reduce(
        (sum, item) => sum + item.predictedWaste,
        0
      ) / history.length
    : 0;

const highestWaste =
  history.length > 0
    ? Math.max(
        ...history.map((item) => item.predictedWaste)
      )
    : 0;

const lowestWaste =
  history.length > 0
    ? Math.min(
        ...history.map((item) => item.predictedWaste)
      )
    : 0;

  const options = {
    responsive: true,

    plugins: {
      legend: {
        labels: {
          color: "white",
          font: {
            size: 14,
          },
        },
      },

      title: {
        display: true,
        text: "📊 AI Food Waste Analytics",
        color: "white",
        font: {
          size: 22,
          weight: "bold",
        },
      },

      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.raw} KG`;
          },
        },
      },
    },

    scales: {
      x: {
        ticks: {
          color: "#cbd5e1",
        },

        grid: {
          color: "#334155",
        },
      },

      y: {
        beginAtZero: true,

        ticks: {
          color: "#cbd5e1",
        },

        grid: {
          color: "#334155",
        },
      },
    },
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 mt-10 shadow-xl border border-slate-800">

      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-2xl font-bold text-white">
            📊 AI Waste Analytics
          </h2>

          <p className="text-slate-400">
            Last 7 Days Prediction Trends
          </p>
        </div>

        <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-xl font-semibold">
          Live Data
        </div>

      </div>

      {loading ? (

        <div className="text-center py-20">

          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto"></div>

          <p className="mt-4 text-slate-400">
            Loading Analytics...
          </p>

        </div>

      ) : (

  <>
    <div className="h-[420px]">
      <Bar
        data={chartData}
        options={options}
      />
    </div>

    {/* Analytics Summary */}

<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

  {/* Last Prediction */}

  <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-green-400 transition">

    <p className="text-slate-400 text-sm">
      📈 Last Prediction
    </p>

    <h2 className="text-4xl font-bold text-green-400 mt-3">
      {history.length > 0
        ? history[history.length - 1].predictedWaste.toFixed(2)
        : "--"}
    </h2>

    <p className="text-slate-500 mt-2">
      KG Waste
    </p>

  </div>

  {/* Average */}

  <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-blue-400 transition">

    <p className="text-slate-400 text-sm">
      📊 Weekly Average
    </p>

    <h2 className="text-4xl font-bold text-blue-400 mt-3">
      {averageWaste.toFixed(2)}
    </h2>

    <p className="text-slate-500 mt-2">
      KG Average
    </p>

  </div>

  {/* Highest */}

  <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-red-400 transition">

    <p className="text-slate-400 text-sm">
      🔥 Highest Waste
    </p>

    <h2 className="text-4xl font-bold text-red-400 mt-3">
      {highestWaste.toFixed(2)}
    </h2>

    <p className="text-slate-500 mt-2">
      KG Peak
    </p>

  </div>

  {/* Lowest */}

  <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-yellow-400 transition">

    <p className="text-slate-400 text-sm">
      📉 Lowest Waste
    </p>

    <h2 className="text-4xl font-bold text-yellow-400 mt-3">
      {lowestWaste.toFixed(2)}
    </h2>

    <p className="text-slate-500 mt-2">
      KG Minimum
    </p>

  </div>

</div>

{/* Recent Predictions */}

<div className="mt-10 bg-slate-800 rounded-2xl p-6">

  <h2 className="text-2xl font-bold text-white mb-5">
    📋 Recent Predictions
  </h2>

  <div className="overflow-x-auto">

    <table className="w-full text-left">

      <thead>

        <tr className="border-b border-slate-700 text-slate-400">

          <th className="py-3">Date</th>

          <th>Breakfast</th>

          <th>Lunch</th>

          <th>Dinner</th>

          <th>Waste</th>

          <th>Status</th>

        </tr>

      </thead>

      <tbody>

        {history.map((item, index) => (

          <tr
            key={index}
            className="border-b border-slate-700 hover:bg-slate-700/30 transition"
          >

            <td className="py-3">
              {new Date(item.date).toLocaleDateString("en-IN")}
            </td>

            <td>{item.breakfast}</td>

            <td>{item.lunch}</td>

            <td>{item.dinner}</td>

            <td className="font-bold text-green-400">
              {item.predictedWaste.toFixed(2)} KG
            </td>

            <td>
              {item.predictedWaste < 8 ? (
                <span className="text-green-400">🟢 Good</span>
              ) : item.predictedWaste <= 15 ? (
                <span className="text-yellow-400">🟡 Moderate</span>
              ) : (
                <span className="text-red-400">🔴 High</span>
              )}
            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>

  </>

)}

    </div>
  );
}

export default WasteChart;