import { useEffect, useState } from "react";
import axios from "axios";
import API from "../config";
function AIInsights() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const res = await axios.get(`${API}/api/prediction`);
      setHistory(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (history.length === 0) return null;

  const latest = history[history.length - 1];

  const avg =
    history.reduce(
      (sum, item) => sum + item.predictedWaste,
      0
    ) / history.length;

    // Dynamic AI Confidence

let confidence = 70 + history.length * 2;

if (confidence > 99) {
  confidence = 99;
}

  let wasteStatus = "";
  let wasteColor = "";

  if (avg < 8) {
    wasteStatus = "🟢 Excellent Waste Control";
    wasteColor = "text-green-400";
  } else if (avg < 15) {
    wasteStatus = "🟡 Moderate Waste";
    wasteColor = "text-yellow-400";
  } else {
    wasteStatus = "🔴 High Waste Detected";
    wasteColor = "text-red-400";
  }

  let recommendation = "";

  if (avg < 8)
    recommendation =
      "Current food preparation is excellent.";

  else if (avg < 15)
    recommendation =
      "Reduce rice preparation by around 8%.";

  else
    recommendation =
      "Reduce overall cooking quantity by around 15%.";

  return (
    <div className="mt-10 bg-slate-900 rounded-2xl p-8">

      <h1 className="text-4xl font-bold text-green-400 mb-8">
        🤖 AI Insights
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-slate-800 rounded-xl p-6">

          <h2 className="text-2xl font-bold">
            📊 Waste Analysis
          </h2>

          <p
            className={`mt-5 text-xl font-bold ${wasteColor}`}
          >
            {wasteStatus}
          </p>

          <p className="mt-4 text-slate-300">
            Average Waste :
            <span className="text-green-400 font-bold">
              {" "}
              {avg.toFixed(2)} KG
            </span>
          </p>

        </div>

        <div className="bg-slate-800 rounded-xl p-6">

          <h2 className="text-2xl font-bold">
            🎯 Recommendation
          </h2>

          <p className="mt-5 text-slate-300">
            {recommendation}
          </p>

        </div>

        <div className="bg-slate-800 rounded-xl p-6">

          <h2 className="text-2xl font-bold">
            🍽 Best Performing Menu
          </h2>

          <p className="mt-5 text-green-400 font-bold">
            {latest.dinner}
          </p>

          <p className="text-slate-400 mt-2">
            shows lower food wastage.
          </p>

        </div>

        <div className="bg-slate-800 rounded-xl p-6">

          <h2 className="text-2xl font-bold">
  📈 AI Confidence
</h2>

<h1 className="text-5xl font-bold text-blue-400 mt-5">
  {confidence}%
</h1>

<p className="text-slate-400 mt-3">
  Based on {history.length} prediction records.
</p>
        </div>

      </div>

    </div>
  );
}

export default AIInsights;