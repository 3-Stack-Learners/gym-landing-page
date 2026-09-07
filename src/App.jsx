import { useState, useEffect } from "react";
import gymThemeConfig from "./data/gymThemeConfig";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProgramsWhyUs from "./components/ProgramsWhyUs";
import Trainers from "./components/Trainers";
import InstaSlider from "./components/InstaSlider";
import PricingCalculator from "./components/PricingCalculator";
import LeadCapture from "./components/LeadCapture";
import Footer from "./components/Footer";

function App() {
  const [activeFormMode, setActiveFormMode] = useState("trial");
  const [selectedPlanName, setSelectedPlanName] = useState("");
  const [selectedPlanPrice, setSelectedPlanPrice] = useState("");

  const [pricingTab, setPricingTab] = useState("plans"); // "plans" | "calculator"

  // Listen to hash changes in URL (e.g., #calculator vs #pricing)
  useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash;
      if (hash === "#calculator") {
        setPricingTab("calculator");
      } else if (hash === "#pricing") {
        setPricingTab("plans");
      }
    };

    handleHashSync();
    window.addEventListener("hashchange", handleHashSync);
    return () => window.removeEventListener("hashchange", handleHashSync);
  }, []);

  return (
    <div className={`w-full min-h-screen ${gymThemeConfig.design.colors.bgMain} flex flex-col p-0 m-0 overflow-x-hidden scroll-pt-24`}>
      {/* BLOCK 1: Navbar + Minimalist Full-Bleed Hero */}
      <Navbar activePricingTab={pricingTab} setActivePricingTab={setPricingTab} />
      <Hero setActivePricingTab={setPricingTab} />

      {/* BLOCK 2: Programs & Why Us (Consolidated 4-Card Grid) */}
      <ProgramsWhyUs />

      {/* BLOCK 3: Elite Coaching Staff */}
      <Trainers />

      {/* BLOCK 4: Instagram Facility Showcase Carousel (Interactive Touch/Drag) */}
      <InstaSlider />

      {/* BLOCK 5: Pricing & Calculator (Interactive Tabbed Switcher) */}
      <PricingCalculator
        activeTab={pricingTab}
        setActiveTab={setPricingTab}
        setActiveFormMode={setActiveFormMode}
        setSelectedPlanName={setSelectedPlanName}
        setSelectedPlanPrice={setSelectedPlanPrice}
      />

      {/* BLOCK 6: Lead Capture VIP Pass & Integrated Footer */}
      <LeadCapture
        activeFormMode={activeFormMode}
        setActiveFormMode={setActiveFormMode}
        selectedPlanName={selectedPlanName}
        selectedPlanPrice={selectedPlanPrice}
      />
      <Footer />
    </div>
  );
}

export default App;
