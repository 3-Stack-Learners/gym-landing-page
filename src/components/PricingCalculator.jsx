import { useState } from "react";
import { Dumbbell, Calculator } from "lucide-react";
import Pricing from "./Pricing";
import FitnessCalculator from "./FitnessCalculator";

const PricingCalculator = ({
  activeTab: controlledTab,
  setActiveTab: setControlledTab,
  setActiveFormMode,
  setSelectedPlanName,
  setSelectedPlanPrice,
}) => {
  const [internalTab, setInternalTab] = useState("plans");
  const activeTab = controlledTab !== undefined ? controlledTab : internalTab;
  const setActiveTab = setControlledTab || setInternalTab;

  return (
    <section id="pricing" className="relative w-full scroll-mt-24 pt-12 sm:pt-16 pb-6 sm:pb-8 bg-zinc-950 overflow-hidden border-t border-zinc-800/80">
      {/* Anchor for direct #calculator navigation */}
      <div id="calculator" className="absolute top-0 left-0 -mt-24 pointer-events-none" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Tab Switcher Bar */}
        <div className="flex flex-col items-center justify-center mb-6 sm:mb-8">
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 shadow-xl">
            <button
              type="button"
              data-tab="plans"
              onClick={() => setActiveTab("plans")}
              className={`min-h-[46px] px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeTab === "plans"
                  ? "bg-[#D4FF00] text-black shadow-lg shadow-[#D4FF00]/20"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              <Dumbbell className="w-4 h-4" />
              <span>Membership Plans</span>
            </button>

            <button
              type="button"
              data-tab="calculator"
              onClick={() => setActiveTab("calculator")}
              className={`min-h-[46px] px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeTab === "calculator"
                  ? "bg-[#D4FF00] text-black shadow-lg shadow-[#D4FF00]/20"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>BMI & Calorie Tool</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="w-full">
          {activeTab === "plans" ? (
            <div className="animate-fade-in">
              <Pricing
                setActiveFormMode={setActiveFormMode}
                setSelectedPlanName={setSelectedPlanName}
                setSelectedPlanPrice={setSelectedPlanPrice}
              />
            </div>
          ) : (
            <div className="animate-fade-in">
              <FitnessCalculator />
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default PricingCalculator;
