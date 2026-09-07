import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles, ShieldCheck, Award } from "lucide-react";

const trainers = [
  {
    name: "Vikram Rathore",
    role: "Head Strength Coach",
    experience: "Ex-National Powerlifter",
    specialty: "Hypertrophy & Strength",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Ananya Sharma",
    role: "Mobility Specialist",
    experience: "CSCS Certified",
    specialty: "Fat Loss & Rehab",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Rohit Verma",
    role: "Transformation Coach",
    experience: "K11 Certified",
    specialty: "Contest Prep & Diet",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Sahil Khan",
    role: "Crossfit & Conditioning Coach",
    experience: "Crossfit L2 Coach",
    specialty: "Agility & Endurance",
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800&auto=format&fit=crop",
  },
];

// Duplicate trainer array for seamless infinite marquee wrap
const repeatedTrainers = [...trainers, ...trainers];

const Trainers = () => {
  const sliderRef = useRef(null);
  const isPaused = useRef(false);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const hasDragged = useRef(false);
  const pauseTimeoutRef = useRef(null);
  const animationFrameId = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isTouchActive, setIsTouchActive] = useState(false);

  // 1. Continuous hardware-accelerated auto-scroll via requestAnimationFrame
  useEffect(() => {
    const container = sliderRef.current;
    if (!container) return;

    let lastTime = performance.now();

    const step = (time) => {
      // Calculate delta time for smooth 60fps/120fps consistency
      const delta = Math.min(time - lastTime, 50);
      lastTime = time;

      if (!isPaused.current && !isDown.current && sliderRef.current) {
        // Continuous smooth auto-scroll: ~1.15px per frame normalized to 60fps
        const move = 1.15 * (delta / 16.67);
        sliderRef.current.scrollLeft += move;

        // Seamless infinite wrap check
        const halfWidth = sliderRef.current.scrollWidth / 2;
        if (halfWidth > 0 && sliderRef.current.scrollLeft >= halfWidth) {
          sliderRef.current.scrollLeft -= halfWidth;
        }
      }

      animationFrameId.current = requestAnimationFrame(step);
    };

    animationFrameId.current = requestAnimationFrame(step);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  // 2. Wrap check on native scroll (e.g. touch gestures or trackpad)
  const handleScroll = () => {
    const container = sliderRef.current;
    if (!container) return;
    const halfWidth = container.scrollWidth / 2;
    if (halfWidth <= 0) return;

    if (container.scrollLeft >= halfWidth) {
      container.scrollLeft -= halfWidth;
    } else if (container.scrollLeft < 0) {
      container.scrollLeft += halfWidth;
    }
  };

  // 3. Desktop Prev / Next Smooth Click Scrolling
  const scroll = (direction) => {
    const container = sliderRef.current;
    if (!container) return;

    isPaused.current = true;
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);

    const halfWidth = container.scrollWidth / 2;
    const amount = 320;

    if (direction === "left") {
      if (container.scrollLeft - amount < 0 && halfWidth > 0) {
        container.scrollLeft += halfWidth;
      }
      container.scrollBy({ left: -amount, behavior: "smooth" });
    } else {
      if (container.scrollLeft + amount >= halfWidth && halfWidth > 0) {
        container.scrollLeft -= halfWidth;
      }
      container.scrollBy({ left: amount, behavior: "smooth" });
    }

    // Resume continuous ticker after smooth transition completes
    pauseTimeoutRef.current = setTimeout(() => {
      isPaused.current = false;
    }, 1200);
  };

  // 4. Mouse Drag-To-Scroll Handlers
  const handleMouseDown = (e) => {
    if (!sliderRef.current) return;
    isDown.current = true;
    hasDragged.current = false;
    setIsDragging(true);
    isPaused.current = true;
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);

    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeftStart.current = sliderRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
    setIsDragging(false);
    isPaused.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;
    setIsDragging(false);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      isPaused.current = false;
    }, 1500);
  };

  const handleMouseMove = (e) => {
    if (!isDown.current || !sliderRef.current) return;
    e.preventDefault();

    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    if (Math.abs(walk) > 5) {
      hasDragged.current = true;
    }

    let newScrollLeft = scrollLeftStart.current - walk;
    const halfWidth = sliderRef.current.scrollWidth / 2;

    if (halfWidth > 0) {
      if (newScrollLeft >= halfWidth) {
        newScrollLeft -= halfWidth;
        scrollLeftStart.current -= halfWidth;
      } else if (newScrollLeft < 0) {
        newScrollLeft += halfWidth;
        scrollLeftStart.current += halfWidth;
      }
    }

    sliderRef.current.scrollLeft = newScrollLeft;
  };

  // 5. Touch Handlers for Mobile Swipe
  const handleTouchStart = () => {
    isPaused.current = true;
    setIsTouchActive(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
  };

  const handleTouchEnd = () => {
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsTouchActive(false);
      isPaused.current = false;
    }, 1800);
  };

  return (
    <section id="trainers" className="relative w-full scroll-mt-24 py-10 sm:py-14 lg:py-18 bg-zinc-950 overflow-hidden border-t border-zinc-800/80">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[20rem] bg-[#D4FF00]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border border-[#D4FF00]/30 bg-[#D4FF00]/10 text-[#D4FF00] mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ELITE COACHING STAFF</span>
          </div>

          {/* Main Title */}
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-[1.15] mb-2">
            TRAIN WITH THE <span className="text-[#D4FF00]">BEST</span>
          </h2>

          {/* Snappy Subtitle (under 10 words) */}
          <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
            Certified biomechanics, strength, and transformation experts.
          </p>
        </div>

        {/* Carousel Outer Wrapper with Edge Vignettes & Controls */}
        <div
          className="relative w-full"
          onMouseEnter={() => { isPaused.current = true; }}
          onMouseLeave={handleMouseLeave}
        >
          {/* Left Floating Arrow Button (Desktop Only) */}
          <button
            type="button"
            onClick={() => scroll("left")}
            className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900/80 border border-zinc-700 text-white hover:border-[#D4FF00] hover:text-[#D4FF00] hover:scale-105 active:scale-95 transition-all shadow-xl backdrop-blur-md absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20 cursor-pointer"
            aria-label="Previous coach"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Floating Arrow Button (Desktop Only) */}
          <button
            type="button"
            onClick={() => scroll("right")}
            className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900/80 border border-zinc-700 text-white hover:border-[#D4FF00] hover:text-[#D4FF00] hover:scale-105 active:scale-95 transition-all shadow-xl backdrop-blur-md absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 cursor-pointer"
            aria-label="Next coach"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Seamless Edge Vignette Fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-zinc-950 to-transparent z-10" />

          {/* Continuous Fluid Track (Touch + Drag + rAF) */}
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className={`w-full flex overflow-x-auto ${
              isTouchActive ? "snap-x snap-mandatory scroll-smooth" : ""
            } no-scrollbar gap-4 sm:gap-6 px-4 sm:px-8 py-3 select-none ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
          >
            {repeatedTrainers.map((trainer, idx) => (
              <div
                key={`${idx}-${trainer.name}`}
                className="w-[88vw] sm:w-[320px] shrink-0 snap-center snap-always aspect-[4/5] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-xl group relative select-none cursor-pointer"
              >
                {/* Athletic Fitness Portrait Photo */}
                <img
                  src={trainer.image}
                  alt={`${trainer.name} - ${trainer.role}`}
                  width={600}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-90 pointer-events-none"
                />

                {/* Gradient Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent pointer-events-none" />

                {/* Floating Specialty Pill (Top Right) */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-[#D4FF00]/30 text-[#D4FF00] text-xs font-semibold px-2.5 py-1 rounded-full shadow-md pointer-events-none">
                  {trainer.specialty}
                </div>

                {/* Bottom Overlay Info Box */}
                <div className="absolute bottom-0 inset-x-0 p-5 pointer-events-none">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest block mb-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4FF00]" />
                    {trainer.role}
                  </span>

                  <h3 className="text-xl font-black text-white group-hover:text-[#D4FF00] transition-colors font-display tracking-tight mb-2">
                    {trainer.name}
                  </h3>

                  <div className="inline-flex items-center gap-1.5 text-xs text-zinc-300 font-medium bg-zinc-950/80 border border-white/10 rounded-lg px-2.5 py-1 backdrop-blur-sm shadow-sm">
                    <Award className="w-3.5 h-3.5 text-[#D4FF00] shrink-0" />
                    <span>{trainer.experience}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Trainers;
