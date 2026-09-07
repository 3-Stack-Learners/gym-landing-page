import { Dumbbell, Flame, Zap, Activity, ArrowRight } from "lucide-react";

const Programs = () => {
  const programs = [
    {
      id: "hypertrophy",
      title: "Hypertrophy & Bodybuilding",
      description:
        "Targeted resistance training protocols designed to stimulate maximal muscle growth, symmetry, and aesthetic definition.",
      icon: Dumbbell,
      tag: "Muscle Building",
    },
    {
      id: "cross-training",
      title: "High-Intensity Cross-Training",
      description:
        "Dynamic circuit workouts combining cardiovascular endurance, metabolic conditioning, and high-energy explosive power.",
      icon: Flame,
      tag: "Conditioning",
    },
    {
      id: "powerlifting",
      title: "Strength & Powerlifting",
      description:
        "Focus on compound lifts—squat, bench press, and deadlift—engineered to build raw functional power and core stability.",
      icon: Zap,
      tag: "Raw Power",
    },
    {
      id: "mobility",
      title: "Functional & Mobility",
      description:
        "Enhance joint flexibility, posture, and athletic longevity to prevent injury and unlock fluid movement patterns.",
      icon: Activity,
      tag: "Recovery & Agility",
    },
  ];

  const handleProgramClick = (e) => {
    e.preventDefault();
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      const yOffset = -80;
      const y = contactSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="relative w-full py-20 sm:py-24 lg:py-28 bg-zinc-950 overflow-hidden">
      {/* Subtle Background Glow Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[30rem] bg-[#D4FF00]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="text-[#D4FF00] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase inline-block mb-2">
            WHAT WE OFFER
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            TRAIN WITHOUT <span className="text-[#D4FF00]">LIMITS.</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3 max-w-xl mx-auto leading-relaxed">
            Engineered workout disciplines tailored for all experience levels—from novice lifters to competitive strength athletes.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <div
                key={program.id}
                className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-6 transition-all duration-300 hover:border-[#D4FF00]/50 hover:bg-zinc-900/90 group flex flex-col justify-between"
              >
                <div>
                  {/* Icon Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="bg-[#D4FF00]/10 text-[#D4FF00] p-3 rounded-lg w-fit group-hover:bg-[#D4FF00] group-hover:text-black transition-all duration-300">
                      <Icon className="w-6 h-6" strokeWidth={2.2} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 bg-zinc-800/60 px-2.5 py-1 rounded-md border border-white/5">
                      {program.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 font-display group-hover:text-white transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {program.description}
                  </p>
                </div>

                {/* Bottom Action Link */}
                <a
                  href="#contact"
                  onClick={handleProgramClick}
                  className="pt-4 border-t border-zinc-800/60 text-xs font-bold uppercase tracking-wider text-zinc-300 group-hover:text-[#D4FF00] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Explore Program</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Programs;
