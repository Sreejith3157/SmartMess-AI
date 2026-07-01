import { useEffect, useState } from "react";
import axios from "axios";

function AnalyticsCards() {
  const [stats, setStats] = useState({
    average: 0,
    highest: 0,
    lowest: 0,
    total: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/prediction");

      const data = res.data;

      if (data.length === 0) return;

      const wastes = data.map((item) => item.predictedWaste);

      const average =
        wastes.reduce((a, b) => a + b, 0) / wastes.length;

      const highest = Math.max(...wastes);

      const lowest = Math.min(...wastes);

      setStats({
        average: average.toFixed(2),
        highest,
        lowest,
        total: data.length,
      });

    } catch (error) {
      console.log(error);
    }
  };

  const Card = ({ title, value, color }) => (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-800">
      <p className="text-slate-400">{title}</p>

      <h2 className={`text-3xl font-bold mt-2 ${color}`}>
        {value}
      </h2>
    </div>
  );

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

      <Card
        title="📊 Average Waste"
        value={`${stats.average} KG`}
        color="text-green-400"
      />

      <Card
        title="📈 Highest Waste"
        value={`${stats.highest} KG`}
        color="text-red-400"
      />

      <Card
        title="📉 Lowest Waste"
        value={`${stats.lowest} KG`}
        color="text-blue-400"
      />

      <Card
        title="📋 Total Predictions"
        value={stats.total}
        color="text-yellow-400"
      />

    </div>
  );
}

export default AnalyticsCards;