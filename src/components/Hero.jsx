import gymThemeConfig from "../data/gymThemeConfig";

const Hero = () => {
  const { gymName, heroBgImage, design } = gymThemeConfig;
  const { colors } = design;
  const navLinks = [
    { name: "Home", id: "#home" },
    { name: "About", id: "#about" },
    { name: "Services", id: "#services" },
    { name: "Pricing", id: "#pricing" },
    { name: "Contact", id: "#contact" },
  ];

  return (
    <section
      id="home"
      className="w-full relative min-h-[65vh] md:min-h-screen py-12 md:py-0 flex flex-col justify-center items-center text-center relative overflow-hidden px-6 md:px-12 bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBgImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-slate-950" />

      <div className="relative z-10 max-w-7xl mx-auto h-full w-full">
        <div className="flex flex-col items-center text-center justify-center min-h-full px-4 pt-28 sm:pt-32 pb-12">
          <div className="w-full max-w-xl md:max-w-4xl mx-auto mb-10 md:mb-12">
            <span className={`mb-4 text-sm uppercase tracking-[0.45em] ${colors.brandPrimaryText}`}>
              SHAPE YOUR BODY
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-normal md:tracking-tight leading-[1.35] md:leading-tight px-4 mb-4 max-w-4xl mx-auto text-white">
              Rise to a stronger future with <span className={colors.brandPrimaryText}>THE MUSCLE FACTORY</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-md mx-auto mt-3 mb-6">
              Train harder, recover smarter, and unlock the power of a red-hot gym experience designed for champions.
            </p>
          </div>

          <div className="flex justify-center w-full">
            <a
              href="#contact"
              className={`${colors.brandPrimary} mt-10 rounded-full px-8 py-4 text-base font-semibold text-white transition-all duration-300 ${colors.brandHover} hover:scale-[1.03] active:scale-95 inline-flex items-center justify-center`}
            >
              Book Free Trial 💪
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
