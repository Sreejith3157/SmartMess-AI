function SkeletonCard() {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 animate-pulse shadow-xl">

      <div className="h-5 w-28 bg-slate-700 rounded mb-5"></div>

      <div className="h-10 w-20 bg-slate-700 rounded mb-4"></div>

      <div className="h-4 w-40 bg-slate-700 rounded"></div>

    </div>
  );
}

export default SkeletonCard;