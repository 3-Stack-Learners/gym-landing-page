import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import mf2Image from "../assets/mf2.jpg";
import mfImage from "../assets/mf.jpg";

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const images = [
  {
    url: mf2Image,
    caption: "Heavy Iron & Dumbbell Arena",
  },
  {
    url: mfImage,
    caption: "Cardio & Conditioning Hub",
  },
  {
    url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
    caption: "Functional Conditioning & Agility",
  },
  {
    url: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop",
    caption: "Olympic Lifting & Deadlift Zone",
  },
  {
    url: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=800&auto=format&fit=crop",
    caption: "Peak Endurance & Sled Turf",
  },
  {
    url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
    caption: "Barbell Squat & Power Racks",
  },
  {
    url: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop",
    caption: "Personalized 1-on-1 Coaching",
  },
  {
    url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop",
    caption: "Recovery & Core Mobility",
  },
];

// Duplicate image array 3 times for true seamless infinite loop in both directions
const repeatedImages = [...images, ...images, ...images];

const InstaSlider = () => {
  const sliderRef = useRef(null);
  const isPaused = useRef(false);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const hasDragged = useRef(false);
  const pauseTimeoutRef = useRef(null);
  const animationFrameId = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // 1. Initial mount: Position scrollLeft at the start of the middle duplicate set
  useEffect(() => {
    const container = sliderRef.current;
    if (!container) return;

    const setInitialPosition = () => {
      const singleSetWidth = container.scrollWidth / 3;
      if (singleSetWidth > 0) {
        container.scrollLeft = singleSetWidth;
      }
    };

    setInitialPosition();
    const rafId = requestAnimationFrame(setInitialPosition);
    const timer = setTimeout(setInitialPosition, 60);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
    };
  }, []);

  // 2. Continuous hardware-accelerated auto-scroll via requestAnimationFrame
  useEffect(() => {
    const container = sliderRef.current;
    if (!container) return;

    let lastTime = performance.now();

    const step = (time) => {
      // Calculate delta time for smooth 60fps/120fps consistency
      const delta = Math.min(time - lastTime, 50);
      lastTime = time;

      if (!isPaused.current && !isDown.current && sliderRef.current) {
        // Continuous smooth linear auto-scroll: ~1.15px per frame normalized to 60fps
        const move = 1.15 * (delta / 16.67);
        sliderRef.current.scrollLeft += move;

        // Seamless infinite wrap check
        const singleSetWidth = sliderRef.current.scrollWidth / 3;
        if (singleSetWidth > 0 && sliderRef.current.scrollLeft >= singleSetWidth * 2) {
          sliderRef.current.scrollLeft -= singleSetWidth;
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

  // 3. Bidirectional Infinite Wrap Check on native scroll (touch gestures or trackpad)
  const handleScroll = () => {
    const container = sliderRef.current;
    if (!container) return;
    const singleSetWidth = container.scrollWidth / 3;
    if (singleSetWidth <= 0) return;

    // Scrolled forward (right) past the middle set: wrap seamlessly back
    if (container.scrollLeft >= singleSetWidth * 2) {
      container.scrollLeft -= singleSetWidth;
    }
    // Scrolled backward (left) towards the beginning: wrap seamlessly forward
    else if (container.scrollLeft <= 10) {
      container.scrollLeft += singleSetWidth;
    }
  };

  // 4. Desktop Prev / Next Smooth Click Scrolling
  const scroll = (direction) => {
    const container = sliderRef.current;
    if (!container) return;

    isPaused.current = true;
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);

    const singleSetWidth = container.scrollWidth / 3;
    const amount = 340;

    if (direction === "left") {
      if (container.scrollLeft - amount <= 10 && singleSetWidth > 0) {
        container.scrollLeft += singleSetWidth;
      }
      container.scrollBy({ left: -amount, behavior: "smooth" });
    } else {
      if (container.scrollLeft + amount >= singleSetWidth * 2 && singleSetWidth > 0) {
        container.scrollLeft -= singleSetWidth;
      }
      container.scrollBy({ left: amount, behavior: "smooth" });
    }

    // Resume continuous ticker after smooth transition completes
    pauseTimeoutRef.current = setTimeout(() => {
      isPaused.current = false;
    }, 1800);
  };

  // 5. Mouse Drag-To-Scroll Handlers
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
    // Briefly delay resumption so click handler knows if a drag occurred
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
    const singleSetWidth = sliderRef.current.scrollWidth / 3;

    if (singleSetWidth > 0) {
      if (newScrollLeft >= singleSetWidth * 2) {
        newScrollLeft -= singleSetWidth;
        scrollLeftStart.current -= singleSetWidth;
      } else if (newScrollLeft <= 10) {
        newScrollLeft += singleSetWidth;
        scrollLeftStart.current += singleSetWidth;
      }
    }

    sliderRef.current.scrollLeft = newScrollLeft;
  };

  // 6. Touch Handlers for Mobile Swipe
  const handleTouchStart = () => {
    isPaused.current = true;
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
  };

  const handleTouchEnd = () => {
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      isPaused.current = false;
    }, 1800);
  };

  const handleCardClick = () => {
    if (hasDragged.current) return;
    window.open("https://www.instagram.com", "_blank", "noopener,noreferrer");
  };

  return (
    <section id="gallery" className="relative w-full scroll-mt-24 py-6 sm:py-8 bg-zinc-950 overflow-hidden border-y border-zinc-800/80">
      
      {/* Top Header & Instagram Handle Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-black hover:bg-[#D4FF00] hover:border-[#D4FF00] text-xs sm:text-sm font-bold uppercase tracking-wider transition-all group shadow-sm cursor-pointer"
          >
            <InstagramIcon className="w-4 h-4 text-[#D4FF00] group-hover:text-black transition-colors" />
            <span>@ironforgegym</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-black transition-colors" />
          </a>
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 hidden sm:inline-block">
            Real Gym Grind • Live Feed
          </span>
        </div>

        <span className="text-[11px] font-semibold text-zinc-500 hidden md:inline-block">
          Swipe or drag to explore facility shots →
        </span>
      </div>

      {/* Carousel Outer Wrapper */}
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
          aria-label="Previous photos"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Right Floating Arrow Button (Desktop Only) */}
        <button
          type="button"
          onClick={() => scroll("right")}
          className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900/80 border border-zinc-700 text-white hover:border-[#D4FF00] hover:text-[#D4FF00] hover:scale-105 active:scale-95 transition-all shadow-xl backdrop-blur-md absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 cursor-pointer"
          aria-label="Next photos"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Seamless Edge Vignette Fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-zinc-950 to-transparent z-10" />

        {/* Continuous Fluid Track with Linear Auto-Scroll & Touch Drag */}
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          style={{ WebkitOverflowScrolling: "touch", overscrollBehaviorX: "contain" }}
          className={`w-full flex overflow-x-auto no-scrollbar gap-4 sm:gap-6 px-4 sm:px-8 py-3 select-none overscroll-x-contain touch-pan-x ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {repeatedImages.map((item, idx) => (
            <div
              key={`${idx}-${item.caption}`}
              onClick={handleCardClick}
              className="w-[85vw] sm:w-[320px] shrink-0 aspect-[4/5] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-xl group relative select-none cursor-pointer"
            >
              {/* High-Resolution Gym Photo with Hover Zoom */}
              <img
                src={item.url}
                alt={item.caption}
                width={320}
                height={400}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
              />

              {/* Dark Gradient Overlay & Bottom Info */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/35 to-transparent opacity-75 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-4 pointer-events-none">
                <div className="transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider block drop-shadow-md truncate">
                    {item.caption}
                  </span>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10 text-[11px] text-zinc-400 group-hover:text-[#D4FF00] transition-colors">
                    <div className="flex items-center gap-1.5">
                      <InstagramIcon className="w-3.5 h-3.5 text-[#D4FF00]" />
                      <span className="font-semibold tracking-wide">@ironforgegym</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-[#D4FF00]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default InstaSlider;
