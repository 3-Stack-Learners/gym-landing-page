import { Dumbbell, Flame, Users, Trophy } from "lucide-react";

const ProgramsWhyUs = () => {
  const cards = [
    {
      icon: Dumbbell,
      title: "Heavy Iron & Weights",
      highlight: "50kg Dumbbells",
      badge: "Olympic Racks",
    },
    {
      icon: Flame,
      title: "HIIT & Conditioning",
      highlight: "HIIT Turf & Sleds",
      badge: "Assault Bikes",
    },
    {
      icon: Users,
      title: "Certified Coaching",
      highlight: "Custom Splits",
      badge: "1-on-1 Guidance",
    },
    {
      icon: Trophy,
      title: "4+ Years Legacy",
      highlight: "1.2k+ Members",
      badge: "Rated 4.9/5",
    },
  ];

  return (
    <section id="programs" className="relative w-full scroll-mt-24 py-8 sm:py-12 md:py-16 bg-zinc-950 overflow-hidden">
      
      {/* Subtle Background Glow Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4FF00]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Compact Punchy Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10">
          <span className="text-[#D4FF00] text-xs font-bold tracking-[0.25em] uppercase block mb-1">
            FACILITY HIGHLIGHTS
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
            BUILT FOR <span className="text-[#D4FF00]">RESULTS.</span>
          </h2>
        </div>

        {/* 2x2 Bento Grid on Mobile (< md), 4-Column Row on Desktop (md+) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bg-zinc-900/70 border border-zinc-800/80 rounded-2xl p-4 sm:p-5 flex flex-col justify-between aspect-square md:aspect-auto md:min-h-[200px] hover:border-[#D4FF00]/40 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group shadow-lg"
              >
                {/* Subtle Hover Radial Gradient Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4FF00]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Top: Glowing Lime Icon Container */}
                <div className="relative z-10 w-10 h-10 rounded-xl bg-[#D4FF00]/10 border border-[#D4FF00]/20 flex items-center justify-center text-[#D4FF00] mb-2 group-hover:scale-105 group-hover:bg-[#D4FF00] group-hover:text-black transition-all duration-300">
                  <Icon className="w-5 h-5" strokeWidth={2.2} />
                </div>

                {/* Middle: Bold Title */}
                <div className="relative z-10 my-auto py-1">
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-tight leading-tight font-display group-hover:text-white transition-colors">
                    {card.title}
                  </h3>
                </div>

                {/* Bottom: Clean 1-Line Highlight Chip */}
                <div className="relative z-10 pt-2">
                  <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs text-zinc-400 font-medium group-hover:text-zinc-200 transition-colors bg-zinc-950/80 border border-white/5 rounded-lg px-2.5 py-1 w-fit shadow-inner">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] shrink-0 shadow-[0_0_6px_rgba(212,255,0,0.8)]" />
                    <span className="truncate">{card.highlight}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ProgramsWhyUs;
