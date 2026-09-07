const StatsBar = () => {
  const stats = [
    {
      value: "5,000+",
      unit: "sq.ft",
      label: "Elite Floor Space",
    },
    {
      value: "30+",
      unit: "Heavy",
      label: "Modern Machines",
    },
    {
      value: "15+",
      unit: "Pro",
      label: "Certified Coaches",
    },
    {
      value: "24/7",
      unit: "Open",
      label: "Member Access",
    },
  ];

  return (
    <section className="w-full border-y border-zinc-800/80 bg-zinc-900/40 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-9">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 md:gap-0">
          {stats.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center text-center px-4 ${
                index !== stats.length - 1 ? "md:border-r md:border-zinc-800/70" : ""
              }`}
            >
              {/* Bold Value with Unit */}
              <div className="flex items-baseline justify-center gap-1.5">
                <span className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                  {item.value}
                </span>
                {item.unit && (
                  <span className="text-xs sm:text-sm font-bold text-zinc-400 uppercase">
                    {item.unit}
                  </span>
                )}
              </div>

              {/* Athletic Lime Label */}
              <span className="text-[11px] sm:text-xs font-bold tracking-wider text-[#D4FF00] uppercase mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
