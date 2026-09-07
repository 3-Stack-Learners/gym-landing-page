import { Dumbbell, HeartPulse, Activity, Users, TrendingUp, Waves, Clock } from "lucide-react";
import gymThemeConfig from "../data/gymThemeConfig";

const GymDetails = () => {
  const { amenities } = gymThemeConfig;

  // Icon mapping for amenities
  const amenityIcons = {
    "amenity-1": Dumbbell,
    "amenity-2": HeartPulse,
    "amenity-3": Activity,
    "amenity-4": Users,
    "amenity-5": TrendingUp,
    "amenity-6": Waves,
    "amenity-7": Clock,
  };

  const amenityTags = {
    "amenity-1": "Strength & Olympic Iron",
    "amenity-2": "Conditioning Zone",
    "amenity-3": "Functional Fitness",
    "amenity-4": "Certified Mentorship",
    "amenity-5": "Hypertrophy Guidance",
    "amenity-6": "Recovery & Aqua",
    "amenity-7": "24/7 VIP Access",
  };

  return (
    <section id="amenities" className="relative w-full py-20 sm:py-24 lg:py-28 bg-zinc-950 overflow-hidden">
      {/* Subtle Ambient Glow Accent */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#D4FF00]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="text-[#D4FF00] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase inline-block mb-2">
            PREMIUM AMENITIES
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            BUILT FOR EVERY ATHLETE, <span className="text-[#D4FF00]">EVERY GOAL.</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3 max-w-xl mx-auto leading-relaxed">
            Explore dedicated training systems, Olympic lifting platforms, and purposeful recovery amenities engineered for peak performance.
          </p>
        </div>

        {/* Amenities Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {amenities.map((item) => {
            const Icon = amenityIcons[item.id] || Dumbbell;
            const tag = amenityTags[item.id] || "Gym Amenity";

            return (
              <div
                key={item.id}
                className="bg-zinc-900/50 border border-zinc-800 hover:border-[#D4FF00]/40 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Icon & Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-[#D4FF00] bg-[#D4FF00]/10 p-3 rounded-lg w-fit group-hover:bg-[#D4FF00] group-hover:text-black transition-all duration-300">
                      <Icon className="w-5 h-5" strokeWidth={2.2} />
                    </div>
                    <span className="border border-[#D4FF00]/20 text-zinc-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-900">
                      {tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 font-display">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default GymDetails;
