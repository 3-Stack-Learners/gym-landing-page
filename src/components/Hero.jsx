import heroFallback from "../assets/mf2.jpg";

const Hero = ({ setActivePricingTab }) => {
  const handlePlansClick = (e) => {
    if (e) e.preventDefault();
    if (setActivePricingTab) {
      setActivePricingTab("plans");
    }
    const plansBtn = document.querySelector('button[data-tab="plans"]');
    if (plansBtn) {
      plansBtn.click();
    }
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    if (targetId === "#pricing") {
      handlePlansClick(e);
      return;
    }
    const id = targetId.startsWith("#") ? targetId.slice(1) : targetId;
    const element = document.getElementById(id) || document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-[90vh] scroll-mt-24 flex flex-col justify-between pt-28 pb-6 px-4 sm:px-6 lg:px-8 bg-zinc-950 overflow-hidden"
    >
      {/* 1. Visible Gym Background Image Container */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter brightness-75 contrast-110 z-0 transition-opacity duration-700"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1920&auto=format&fit=crop'), url('${heroFallback}')`,
        }}
      />

      {/* Balanced Lightened Vignette Overlay for High Environment Visibility & Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-zinc-950/70 z-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/70 via-transparent to-zinc-950/70 z-0" />
      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_35%,#09090b_95%] z-0 pointer-events-none" />

      {/* Subtle Radial Athletic Lime Ambient Glow behind Headline */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[320px] bg-[#D4FF00]/15 blur-[140px] pointer-events-none z-0" />

      {/* 2. Main Punchy Centered Content (relative z-10) */}
      <div className="relative z-10 max-w-5xl mx-auto my-auto text-center flex flex-col items-center">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border border-[#D4FF00]/30 bg-[#D4FF00]/10 text-[#D4FF00] mb-4 shadow-sm backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-pulse" />
          <span>PREMIUM FITNESS & PERFORMANCE</span>
        </div>

        {/* Massive Crisp Headline */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-none mb-4 drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
          BUILD YOUR <span className="text-[#D4FF00]">LEGACY</span>
        </h1>

        {/* 2-Line Punchy Subtitle */}
        <p className="text-base sm:text-xl text-zinc-100 font-medium max-w-xl mb-8 tracking-wide leading-relaxed drop-shadow-md">
          Jaipur&apos;s elite equipment, expert coaching, and 24/7 access.
          <span className="block text-zinc-300 text-sm sm:text-base mt-1 font-normal">
            Train without limits in an unapologetic iron atmosphere.
          </span>
        </p>

        {/* Dual High-Contrast CTA Action Buttons */}
        <div className="flex flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
          {/* Main High-Contrast Athletic Lime Button */}
          <a
            href="#free-pass"
            onClick={(e) => handleSmoothScroll(e, "#free-pass")}
            className="min-h-[48px] py-3.5 px-7 rounded-xl bg-[#D4FF00] hover:bg-[#bce600] text-black font-extrabold tracking-wide uppercase text-sm shadow-lg shadow-[#D4FF00]/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Claim Free Pass</span>
            <span>→</span>
          </a>

          {/* Secondary Sleek Frosted Glass Button */}
          <a
            href="#pricing"
            onClick={handlePlansClick}
            className="min-h-[48px] py-3.5 px-7 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 text-white border border-white/10 text-sm font-semibold tracking-wider transition-all flex items-center justify-center cursor-pointer backdrop-blur-md"
          >
            <span>Plans</span>
          </a>
        </div>
      </div>

      {/* 3. Compact Bottom Bar: 3 Quick Stats in Single Row */}
      <div className="relative z-10 w-full max-w-4xl mx-auto pt-5 border-t border-white/10">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="flex flex-col items-center">
            <span className="font-display font-black text-xl sm:text-2xl text-white tracking-tight">
              5k+ Sq Ft
            </span>
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#D4FF00] mt-0.5">
              Floor Space
            </span>
          </div>

          <div className="flex flex-col items-center border-x border-white/10">
            <span className="font-display font-black text-xl sm:text-2xl text-white tracking-tight">
              30+ Machines
            </span>
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#D4FF00] mt-0.5">
              Heavy Iron
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-display font-black text-xl sm:text-2xl text-white tracking-tight">
              15+ Coaches
            </span>
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#D4FF00] mt-0.5">
              Certified Pros
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
