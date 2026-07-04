import gymThemeConfig from "../data/gymThemeConfig";

const Footer = () => {
  const { gymName } = gymThemeConfig;

  return (
    <footer className="w-full bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-slate-300 font-medium">© 2026 {gymName}. All rights reserved.</p>

        <div className="flex items-center gap-4">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-slate-950 p-3 text-slate-100 transition-all duration-200 hover:bg-red-600"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
              <path d="M7.75 2h8.5C19.55 2 22 4.44 22 7.75v8.5C22 19.55 19.55 22 16.25 22h-8.5C4.45 22 2 19.55 2 16.25v-8.5C2 4.45 4.45 2 7.75 2Zm0 1.5C5.68 3.5 4 5.18 4 7.25v8.5C4 18.32 5.68 20 7.75 20h8.5c2.07 0 3.75-1.68 3.75-3.75v-8.5C20 5.68 18.32 3.5 16.25 3.5h-8.5Zm4.25 3.1a5.65 5.65 0 1 1 0 11.3 5.65 5.65 0 0 1 0-11.3Zm0 1.5a4.15 4.15 0 1 0 0 8.3 4.15 4.15 0 0 0 0-8.3Zm5.7-.8a1.05 1.05 0 1 1-2.1 0 1.05 1.05 0 0 1 2.1 0Z" />
            </svg>
          </a>

          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-slate-950 p-3 text-slate-100 transition-all duration-200 hover:bg-emerald-600"
            aria-label="WhatsApp"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
              <path d="M12.01 2.01C6.48 2.01 2 6.5 2 12.01c0 2.12.7 4.09 1.88 5.72L2 22l4.4-1.16A9.96 9.96 0 0 0 12.01 22c5.52 0 10.01-4.49 10.01-9.99S17.53 2.01 12.01 2.01Zm5.23 13.63c-.24.7-1.4 1.34-1.96 1.42-.5.08-1.09.13-2.12-.26-1.76-.62-3.24-2.22-3.74-2.8-.5-.58-.86-.95-.57-1.57.27-.56 1.05-1.83 1.44-2.46.15-.25.08-.44-.04-.62-.12-.17-1.08-2.6-1.48-3.6-.39-.95-.79-.82-1.08-.83-.28-.01-.61-.01-.94-.01-.32 0-.84.12-1.28.6-.44.49-1.68 1.64-1.68 4.01 0 2.38 1.72 4.68 1.96 5 .24.33 3.39 5.26 8.24 7.38 4.85 2.12 4.85 1.41 5.72 1.33.88-.09 2.75-1.12 3.14-2.21.39-1.1.39-2.05.28-2.24-.12-.2-.48-.32-1-.56Z" />
            </svg>
          </a>

          <a
            href="tel:+1234567890"
            className="inline-flex items-center justify-center rounded-full bg-slate-950 p-3 text-slate-100 transition-all duration-200 hover:bg-slate-700"
            aria-label="Call us"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
              <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1v3.5a1 1 0 0 1-1 1C9.83 21.5 2.5 14.17 2.5 5.5a1 1 0 0 1 1-1H7a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.24 1.01l-2.71 2.71Z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
