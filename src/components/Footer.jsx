import { Phone, MessageSquare } from "lucide-react";
import gymThemeConfig from "../data/gymThemeConfig";

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Footer = () => {
  const { gymName, basicInfo } = gymThemeConfig;

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-zinc-950 border-t border-zinc-900 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Brand Logo, Name & 1-line Bio */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
          <a
            href="#hero"
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            {/* Minimal Modern IronForge Badge Icon */}
            <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 group-hover:border-[#D4FF00]/70 group-hover:shadow-[0_0_14px_rgba(212,255,0,0.25)] flex items-center justify-center transition-all duration-300 shrink-0">
              <svg className="w-4.5 h-4.5 text-[#D4FF00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 5v14M18 5v14M2 9v6M22 9v6M6 12h12" />
              </svg>
            </div>
            <span className="font-display font-black text-base tracking-tight text-white uppercase group-hover:text-[#D4FF00] transition-colors">
              IRONFORGE
            </span>
          </a>
          <span className="hidden sm:inline-block text-zinc-700">•</span>
          <p className="text-xs text-zinc-400">
            Jaipur&apos;s premier iron gym. 24/7 access.
          </p>
        </div>

        {/* Center / Social Icon Buttons */}
        <div className="flex items-center gap-3">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-[#D4FF00] hover:border-[#D4FF00] flex items-center justify-center transition-all cursor-pointer shadow-sm"
            aria-label="Instagram"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>
          <a
            href={`https://api.whatsapp.com/send?phone=${basicInfo.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-emerald-600 hover:border-emerald-600 flex items-center justify-center transition-all cursor-pointer shadow-sm"
            aria-label="WhatsApp"
          >
            <MessageSquare className="w-4 h-4" />
          </a>
          <a
            href={`tel:+${basicInfo.phone}`}
            className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-black hover:bg-[#D4FF00] hover:border-[#D4FF00] flex items-center justify-center transition-all cursor-pointer shadow-sm"
            aria-label="Call Gym"
          >
            <Phone className="w-4 h-4" />
          </a>
        </div>

        {/* Far Right: Copyright & Legal */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs text-zinc-500 text-center md:text-right">
          <p>© {new Date().getFullYear()} {gymName}. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">Privacy Policy</span>
            <span>&bull;</span>
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">Terms</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
