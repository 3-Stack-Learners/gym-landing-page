import React, { useEffect, useRef, useState } from "react";
import gymThemeConfig from "../data/gymThemeConfig";

const WhyChooseUs = () => {
  const {
    design: { colors },
    whyChooseUs,
  } = gymThemeConfig;

  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const updateProgress = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const pct = max > 0 ? Math.round((el.scrollLeft / max) * 100) : 0;
    setProgress(pct);
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
  }, []);

  return (
    <section id="about" className={`w-full ${colors.bgMain} ${colors.textPrimary}`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-4">
          <p className={`text-sm uppercase tracking-[0.35em] ${colors.brandPrimaryText}`}>Why Choose Us</p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight">Why THE MUSCLE FACTORY stands out</h2>
          <p className={`mt-4 max-w-3xl text-lg leading-relaxed ${colors.textSecondary}`}>
            Discover the premium mix of expert coaching, elite facilities, and flexible training options built to keep you motivated and moving.
          </p>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-slate-950 to-transparent z-10 md:hidden" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-slate-950 to-transparent z-10 md:hidden" />
          <div
            ref={trackRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none md:grid md:grid-cols-3 gap-6 pt-6 pb-4 px-4 -mx-4"
          >
            {whyChooseUs.map((item) => (
              <div
                key={item.id}
                className="w-[85vw] shrink-0 snap-center md:w-full group relative rounded-3xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:border-red-600 hover:scale-105"
              >
                <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                <p className={`text-sm leading-relaxed ${colors.textSecondary}`}>{item.description}</p>
              </div>
            ))}

            <div className="w-[85vw] shrink-0 snap-center md:w-full group relative rounded-3xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-red-600 hover:scale-105">
              <h3 className="text-2xl font-semibold mb-3">4+ Years of Legacy</h3>
              <p className={`text-sm leading-relaxed ${colors.textSecondary}`}>
                Proudly transforming bodies and minds since 2022. Join a community built on proven results and hardcore fitness dedication.
              </p>
            </div>
          </div>
          <div className="md:hidden px-4 -mx-4 mt-3">
            <div className="h-1 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-red-600 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
