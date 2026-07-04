import React, { useEffect, useRef, useState } from "react";
import gymThemeConfig from "../data/gymThemeConfig";
import InstaSlider from "./InstaSlider";

const GymDetails = () => {
  const {
    design: { colors },
    amenities,
  } = gymThemeConfig;

  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const updateProgress = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const value = max > 0 ? Math.round((el.scrollLeft / max) * 100) : 0;
    setProgress(value);
  };

  useEffect(() => {
    updateProgress();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      el.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [amenities.length]);

  return (
    <section id="services" className={`w-full ${colors.bgMain} ${colors.textPrimary}`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 ">
        <div className="space-y-6">
          <div className={`text-sm uppercase tracking-[0.35em] ${colors.brandPrimaryText}`}>Gym Amenities</div>
          <h2 className="text-4xl font-black tracking-tight">Built for every athlete, every goal.</h2>
          <p className={`max-w-3xl text-lg leading-relaxed ${colors.textSecondary}`}>
            Explore premium zones, strength systems, and purposeful recovery spaces designed to keep every workout efficient and energizing.
          </p>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-slate-950 to-transparent z-10 md:hidden" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-slate-950 to-transparent z-10 md:hidden" />
          <div
            ref={trackRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 pb-4 px-4 -mx-4"
          >
            {amenities.map((item) => (
              <div
                key={item.id}
                className={`w-[80vw] shrink-0 snap-center md:w-full group relative rounded-3xl border ${colors.borderColor} ${colors.bgCard} p-6 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl hover:border-red-600`}
              >
                <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                <p className={`text-sm leading-relaxed ${colors.textSecondary}`}>{item.description}</p>
              </div>
            ))}
          </div>
          <div className="md:hidden px-4 -mx-4">
            <div className="h-1 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-red-600 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className={`text-sm uppercase tracking-[0.35em] ${colors.brandPrimaryText}`}>Instagram Gallery</div>
          <h2 className="text-4xl font-black tracking-tight">Real gym moments in every frame.</h2>
        </div>

        <InstaSlider />
      </div>
    </section>
  );
};

export default GymDetails;
