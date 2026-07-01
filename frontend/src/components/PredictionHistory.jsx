import { useEffect, useState } from "react";
import axios from "axios";
import exportPDF from "../utils/exportPDF";
function PredictionHistory() {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/prediction");
      setHistory(res.data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  // Search Filter
  const filteredHistory = history.filter((item) =>
    item.date.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-slate-900 rounded-2xl p-6 mt-10 shadow-xl">

      <div className="flex justify-between items-center mb-6">

  <div>

    <h2 className="text-2xl font-bold text-white">
      📋 Prediction History
    </h2>

    <p className="text-slate-400">
      Previous AI Predictions
    </p>

  </div>

  <button
    onClick={() => exportPDF(filteredHistory)}
    className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-lg font-semibold transition"
  >
    📄 Download PDF
  </button>

</div>

      {/* Search */}

      <input
        type="text"
        placeholder="🔍 Search by Date (YYYY-MM-DD)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full md:w-80 bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
      />

      <div className="overflow-x-auto">

        <table className="w-full text-left">

          <thead>

            <tr className="border-b border-slate-700 text-green-400">

              <th className="py-3">Date</th>
              <th>Breakfast</th>
              <th>Lunch</th>
              <th>Dinner</th>
              <th className="text-center">Waste</th>

            </tr>

          </thead>

          <tbody>

            {filteredHistory.length === 0 ? (

              <tr>
                <td
                  colSpan="5"
                  className="text-center py-8 text-slate-500"
                >
                  No Predictions Found
                </td>
              </tr>

            ) : (

              filteredHistory.map((item) => (

                <tr
                  key={item._id}
                  className="border-b border-slate-800 hover:bg-slate-800 transition"
                >

                  <td className="py-4">
                    {new Date(item.date).toLocaleDateString()}
                  </td>

                  <td>{item.breakfast}</td>

                  <td>{item.lunch}</td>

                  <td>{item.dinner}</td>

                  <td className="text-center">

                    <div className="flex flex-col items-center gap-2">

                      <span className="font-bold text-green-400">
                        {item.predictedWaste} KG
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          item.predictedWaste < 10
                            ? "bg-green-500 text-white"
                            : item.predictedWaste < 15
                            ? "bg-yellow-400 text-black"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {item.predictedWaste < 10
                          ? "🟢 Low"
                          : item.predictedWaste < 15
                          ? "🟡 Medium"
                          : "🔴 High"}
                      </span>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default PredictionHistory;