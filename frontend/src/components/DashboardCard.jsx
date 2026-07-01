import AnimatedCounter from "./AnimatedCounter";

function DashboardCard({ title, value, subtitle }) {

  // Extract number from value
  const numericValue = parseFloat(value);

  // Extract suffix (KG, %, etc.)
  const suffix = String(value).replace(/[0-9.]/g, "");

  const isNumber = !isNaN(numericValue);

  return (
    <div className="bg-slate-900 p-6 rounded-2xl shadow-xl hover:shadow-green-500/20 hover:-translate-y-2 transition-all duration-300 cursor-pointer">

      <h3 className="text-xl font-semibold mb-4">
        {title}
      </h3>

      <h1 className="text-4xl font-bold text-green-400">

        {isNumber ? (
          <AnimatedCounter
            value={numericValue}
            suffix={suffix}
          />
        ) : (
          value
        )}

      </h1>

      <p className="text-gray-400 mt-3">
        {subtitle}
      </p>

    </div>
  );
}

export default DashboardCard;