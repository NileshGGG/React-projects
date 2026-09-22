const ShimmerCard = () => (
  <div className="bg-white rounded-2xl border border-slate-200/70 overflow-hidden shadow-sm animate-pulse">
    <div className="w-full h-44 bg-slate-200"></div>

    <div className="p-3.5 space-y-2.5">
      <div className="flex justify-between items-center gap-2">
        <div className="h-4 bg-slate-200 rounded w-3/5"></div>
        <div className="h-4 bg-slate-200 rounded w-10"></div>
      </div>
      <div className="h-3 bg-slate-100 rounded w-2/5"></div>
      <div className="h-3 bg-slate-100 rounded w-3/5"></div>
    </div>
  </div>
);

const Shimmer = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-20 pt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {Array.from({ length: 8 }).map((_, index) => (
          <ShimmerCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default Shimmer;