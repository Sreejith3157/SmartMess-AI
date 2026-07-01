import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="min-h-[85vh] flex flex-col justify-center items-center text-center px-6">

      <h1 className="text-6xl font-extrabold text-white leading-tight">
        AI-Powered
        <br />
        Food Waste Prediction
      </h1>

      <p className="mt-6 text-gray-400 text-xl max-w-3xl">
        Predict tomorrow's food requirements using Artificial Intelligence,
        reduce wastage, save money and manage your college mess efficiently.
      </p>

      <div className="mt-10 flex gap-5">

        <Link
          to="/login"
          className="bg-green-500 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-600 transition"
        >
          Get Started
        </Link>

        <button className="border border-gray-600 px-8 py-4 rounded-xl text-white hover:bg-slate-800 transition">
          Learn More
        </button>

      </div>

    </section>
  );
}

export default Hero;