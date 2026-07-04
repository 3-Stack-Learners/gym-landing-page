import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.jpeg";
import gymThemeConfig from "../data/gymThemeConfig";

const Navbar = () => {
  const { gymName } = gymThemeConfig;
  const [visible, setVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ];

  const handleBrandClick = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ease-in-out bg-slate-950/80 backdrop-blur-md border-b border-slate-900 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <a
          href="#"
          onClick={handleBrandClick}
          className="flex items-center cursor-pointer text-xl font-extrabold tracking-wider text-white uppercase hover:text-red-500 transition-colors duration-200"
        >
          <img
            src={logo}
            alt="The Muscle Factory logo"
            className="h-8 w-8 md:h-10 md:w-10 object-contain rounded-md mr-3"
          />
          <span>{gymName}</span>
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-slate-200 hover:text-red-500 font-medium tracking-wider text-sm transition-colors cursor-pointer uppercase"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="block md:hidden text-slate-200"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>
      {isOpen && (
        <div className="w-full absolute top-full left-0 py-4 px-6 flex flex-col gap-4 border-t border-slate-800 bg-slate-900/95 backdrop-blur-md shadow-xl z-50">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-slate-200 hover:text-red-500 font-medium tracking-wider text-sm transition-colors cursor-pointer uppercase"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
