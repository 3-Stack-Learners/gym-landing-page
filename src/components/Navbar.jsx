import { useEffect, useState, useRef } from "react";
import gymThemeConfig from "../data/gymThemeConfig";

const Navbar = ({ setActivePricingTab }) => {
  const { basicInfo } = gymThemeConfig;
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  // Scroll Direction & Position Tracking
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Elevation background styling (glassmorphism when not at the top)
      setIsScrolled(currentScrollY > 10);

      // 2. Safeguard: If mobile navigation drawer is open, keep navbar visible
      if (isOpen) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // 3. Scroll Detection Rule:
      if (currentScrollY <= 10) {
        // At the very top of page: always show and un-elevate
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        // Scrolling DOWN & past 80px -> slide navbar up and out of view
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling UP (even slightly) -> slide navbar down back into view
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    // Initial check on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  // Clean body scroll-lock when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close mobile menu on ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 1. Navigation Links Array: All 7 Sections
  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Programs", href: "#programs" },
    { label: "Trainers", href: "#trainers" },
    { label: "Gallery", href: "#gallery" },
    { label: "Pricing", href: "#pricing" },
    { label: "Calculator", href: "#calculator" },
    { label: "Contact", href: "#contact" },
  ];

  // 2. Smooth Scroll & Anchor Offsets with Tab Switching:
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);

    if (href === "#calculator") {
      if (setActivePricingTab) setActivePricingTab("calculator");
      const element = document.querySelector("#pricing");
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      return;
    }

    if (href === "#pricing") {
      if (setActivePricingTab) setActivePricingTab("plans");
      const element = document.querySelector("#pricing");
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      return;
    }

    if (href === "#hero" || href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      if (element) {
        const yOffset = -80; // 80px fixed navbar height offset
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  // Safeguard: Ensure navbar never hides if mobile drawer is active
  const shouldShowNavbar = isVisible || isOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        shouldShowNavbar ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800/80 shadow-lg shadow-black/20"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex items-center gap-3 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4FF00] rounded-lg p-1"
          >
            {/* Minimal Modern IronForge Badge Icon */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-[#D4FF00]/70 group-hover:shadow-[0_0_20px_rgba(212,255,0,0.25)] flex items-center justify-center transition-all duration-300 shrink-0">
              <svg className="w-5 h-5 text-[#D4FF00] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 5v14M18 5v14M2 9v6M22 9v6M6 12h12" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black tracking-tight text-base sm:text-lg text-white uppercase group-hover:text-[#D4FF00] transition-colors">
                IRONFORGE
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase -mt-0.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] inline-block animate-pulse" />
                Fitness Club
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (All 7 Sections - Fitted Spacing) */}
          <nav className="hidden md:flex items-center gap-3 lg:gap-5 xl:gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative py-2 text-xs lg:text-sm font-semibold tracking-wider text-zinc-300 uppercase transition-colors duration-200 hover:text-[#D4FF00] group cursor-pointer min-h-[44px] flex items-center whitespace-nowrap"
              >
                {link.label}
                <span className="absolute bottom-1.5 left-0 w-0 h-0.5 bg-[#D4FF00] transition-all duration-300 ease-out group-hover:w-full rounded-full" />
              </a>
            ))}
          </nav>

          {/* Desktop Right CTA Action */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a
              href="#free-pass"
              onClick={(e) => handleNavClick(e, "#free-pass")}
              className="min-h-[44px] bg-[#D4FF00] hover:bg-[#bce600] active:scale-95 text-black font-extrabold tracking-wide uppercase text-xs py-2.5 px-4 lg:px-5 rounded-lg shadow-md shadow-[#D4FF00]/10 transition-all flex items-center gap-2 cursor-pointer shrink-0 whitespace-nowrap"
            >
              <span>Claim Free Pass</span>
              <span>→</span>
            </a>
          </div>

          {/* Mobile Hamburger Button (Strict min 44x44px target) */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-zinc-900 border border-white/10 text-white hover:text-[#D4FF00] hover:border-[#D4FF00]/40 transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4FF00] cursor-pointer"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="6" y2="18" />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay & Slide-out Panel */}
      <div
        className={`fixed inset-0 top-20 z-50 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop Tint */}
        <div
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Slide-out Drawer Panel (Fully scrollable with touch-pan-y) */}
        <div
          className={`relative ml-auto w-full max-w-sm h-[calc(100vh-5rem)] bg-zinc-950 border-l border-zinc-800 flex flex-col justify-between p-6 overflow-y-auto overscroll-contain touch-pan-y transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Navigation Links */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-bold tracking-[0.2em] text-zinc-500 uppercase px-3 mb-2">
              Menu Navigation
            </span>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="min-h-[48px] px-4 py-3 rounded-xl flex items-center justify-between text-base font-medium tracking-wide text-zinc-300 hover:bg-zinc-900 hover:text-[#D4FF00] border border-transparent hover:border-zinc-800 transition-all cursor-pointer"
              >
                <span>{link.label}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4 text-zinc-600 group-hover:text-[#D4FF00]"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            ))}

            <div className="pt-4">
              <a
                href="#free-pass"
                onClick={(e) => handleNavClick(e, "#free-pass")}
                className="w-full min-h-[48px] bg-[#D4FF00] hover:bg-[#bce600] active:scale-95 text-black font-extrabold tracking-wide uppercase text-sm py-3.5 px-6 rounded-xl shadow-lg shadow-[#D4FF00]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Claim Free Pass</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Quick Contact & Timings */}
          <div className="pt-6 border-t border-zinc-800 flex flex-col gap-4">
            <a
              href={`tel:+${basicInfo.phone}`}
              className="min-h-[44px] flex items-center gap-3 text-sm text-zinc-300 hover:text-[#D4FF00] transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center border border-zinc-800 text-[#D4FF00]">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <span className="font-medium">+91 {basicInfo.phone.replace(/^91/, "")}</span>
            </a>

            <div className="flex items-center gap-3 text-sm text-zinc-400">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center border border-zinc-800 text-[#D4FF00]">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <span>{basicInfo.timings} • All Days</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
