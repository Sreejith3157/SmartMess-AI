import AnalyticsCards from "../components/AnalyticsCards";
import PredictionHistory from "../components/PredictionHistory";

function Reports() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <div className="px-8 pt-8">

        <h1 className="text-4xl font-bold text-green-400">
          📊 AI Waste Analytics & Reports
        </h1>

        <p className="text-gray-400 mt-2">
          Complete Historical Analytics of Food Waste Predictions
        </p>

      </div>

      {/* Analytics Cards */}
      <div className="px-8 mt-8">
        <AnalyticsCards />
      </div>

      {/* Prediction History */}
      <div className="px-8 mt-10 mb-10">
        <PredictionHistory />
      </div>
      <div className="mt-10 bg-slate-900 rounded-2xl p-8">

  <h2 className="text-3xl font-bold text-green-400 mb-6">
    🤖 AI Insights
  </h2>

  <div className="grid md:grid-cols-2 gap-6">

    <div className="bg-slate-800 rounded-xl p-5">

      <h3 className="text-xl font-semibold mb-2">
        📊 Waste Analysis
      </h3>

      <p className="text-slate-300">
        Average food waste remains within the expected range.
      </p>

    </div>

    <div className="bg-slate-800 rounded-xl p-5">

      <h3 className="text-xl font-semibold mb-2">
        🍚 Recommendation
      </h3>

      <p className="text-slate-300">
        Reduce rice preparation by approximately 8% on high waste days.
      </p>

    </div>

    <div className="bg-slate-800 rounded-xl p-5">

      <h3 className="text-xl font-semibold mb-2">
        🥘 Menu Suggestion
      </h3>

      <p className="text-slate-300">
        Chapathi-based menus consistently produce lower food wastage.
      </p>

    </div>

    <div className="bg-slate-800 rounded-xl p-5">

      <h3 className="text-xl font-semibold mb-2">
        📈 Overall Status
      </h3>

      <p className="text-green-400 font-bold">
        Efficient Waste Management
      </p>

    </div>

  </div>

</div>
    </div>
  );
}

export default Reports;