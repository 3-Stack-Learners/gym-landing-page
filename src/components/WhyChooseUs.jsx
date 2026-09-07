import { Award, Cpu, Clock, Trophy } from "lucide-react";
import gymThemeConfig from "../data/gymThemeConfig";

const WhyChooseUs = () => {
  const { whyChooseUs } = gymThemeConfig;

  // Icon mapping for existing items
  const iconMap = {
    "why-1": Award,
    "why-2": Cpu,
    "why-3": Clock,
  };

  return (
    <section id="about" className="relative w-full py-20 sm:py-24 lg:py-28 bg-zinc-950 overflow-hidden">
      {/* Subtle Background Glow Accent */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#D4FF00]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="text-[#D4FF00] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase inline-block mb-2">
            WHY CHOOSE US
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            WHY THE MUSCLE FACTORY <span className="text-[#D4FF00]">STANDS OUT.</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3 max-w-xl mx-auto leading-relaxed">
            Discover the premium mix of expert coaching, elite facilities, and flexible training options built to keep you motivated and moving.
          </p>
        </div>

        {/* 4-Card Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {whyChooseUs.map((item) => {
            const Icon = iconMap[item.id] || Award;
            return (
              <div
                key={item.id}
                className="bg-zinc-900/50 border border-zinc-800 hover:border-[#D4FF00]/40 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
              >
                <div>
                  <div className="text-[#D4FF00] bg-[#D4FF00]/10 p-3 rounded-lg w-fit mb-4 group-hover:bg-[#D4FF00] group-hover:text-black transition-all duration-300">
                    <Icon className="w-6 h-6" strokeWidth={2.2} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 font-display">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}

          {/* 4th Distinct Legacy Card */}
          <div className="bg-zinc-900/50 border border-zinc-800 hover:border-[#D4FF00]/40 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between">
            <div>
              <div className="text-[#D4FF00] bg-[#D4FF00]/10 p-3 rounded-lg w-fit mb-4 group-hover:bg-[#D4FF00] group-hover:text-black transition-all duration-300">
                <Trophy className="w-6 h-6" strokeWidth={2.2} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 font-display">
                4+ Years of Legacy
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Proudly transforming bodies and minds since 2022. Join a community built on proven results and hardcore dedication.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
