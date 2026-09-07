import { useState } from "react";
import { Check, X, Sparkles } from "lucide-react";

const Pricing = ({ setActiveFormMode, setSelectedPlanName, setSelectedPlanPrice }) => {
  const [billingCycle, setBillingCycle] = useState("monthly"); // "monthly" | "annual"

  const plans = [
    {
      id: "standard",
      name: "Standard",
      tagline: "Essential access for consistent lifters.",
      priceMonthly: "₹1,499",
      priceAnnual: "₹1,199",
      periodText: "/mo",
      billedAnnualNote: "Billed annually (₹14,388/yr)",
      isPopular: false,
      features: [
        { text: "Full iron floor & weights", included: true },
        { text: "Locker & private showers", included: true },
        { text: "Mobile workout tracking", included: true },
        { text: "1 Initial fitness review", included: true },
        { text: "Unlimited HIIT classes", included: false },
        { text: "Sauna & steam bath", included: false },
      ],
    },
    {
      id: "pro",
      name: "Pro Performance",
      tagline: "Most popular for rapid transformation.",
      priceMonthly: "₹2,499",
      priceAnnual: "₹1,999",
      periodText: "/mo",
      billedAnnualNote: "Billed annually (₹23,988/yr)",
      isPopular: true,
      features: [
        { text: "Full gym & heavy iron", included: true },
        { text: "Unlimited HIIT & cardio classes", included: true },
        { text: "Steam bath & sauna suite", included: true },
        { text: "Monthly trainer consult", included: true },
        { text: "Body composition analysis", included: true },
        { text: "1-on-1 personal coach", included: false },
      ],
    },
    {
      id: "elite",
      name: "Elite Athlete",
      tagline: "Total personalization and recovery.",
      priceMonthly: "₹4,499",
      priceAnnual: "₹3,599",
      periodText: "/mo",
      billedAnnualNote: "Billed annually (₹43,188/yr)",
      isPopular: false,
      features: [
        { text: "24/7 priority access", included: true },
        { text: "Dedicated personal trainer", included: true },
        { text: "Customized nutrition guide", included: true },
        { text: "Unlimited sauna & steam", included: true },
        { text: "VIP locker & recovery suite", included: true },
        { text: "2 Guest passes monthly", included: true },
      ],
    },
  ];

  const handleSelectPlan = (plan) => {
    const currentPrice = billingCycle === "annual" ? plan.priceAnnual : plan.priceMonthly;
    const planNameWithCycle = `${plan.name} (${billingCycle === "annual" ? "Annual" : "Monthly"})`;

    if (setSelectedPlanName) setSelectedPlanName(planNameWithCycle);
    if (setSelectedPlanPrice) setSelectedPlanPrice(currentPrice);
    if (setActiveFormMode) setActiveFormMode("membership");

    const bookingElement = document.getElementById("free-pass") || document.getElementById("contact");
    if (bookingElement) {
      const yOffset = -80;
      const y = bookingElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full py-4 sm:py-6 bg-transparent">
      {/* Subtle Ambient Athletic Lime Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[30rem] bg-[#D4FF00]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-[#D4FF00] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase inline-block mb-1.5">
            MEMBERSHIP PLANS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            NO HIDDEN FEES. <span className="text-[#D4FF00]">CANCEL ANYTIME.</span>
          </h2>

          {/* Billing Cycle Toggle */}
          <div className="mt-6 inline-flex items-center p-1.5 rounded-full bg-zinc-900 border border-zinc-800 shadow-inner">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`min-h-[44px] px-5 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer flex items-center justify-center ${
                billingCycle === "monthly"
                  ? "bg-zinc-800 text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Monthly Billing
            </button>

            <button
              type="button"
              onClick={() => setBillingCycle("annual")}
              className={`min-h-[44px] px-5 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer ${
                billingCycle === "annual"
                  ? "bg-zinc-800 text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <span>Annual Commitment</span>
              <span className="bg-[#D4FF00]/15 border border-[#D4FF00]/30 text-[#D4FF00] text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3-Tier Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-stretch pt-4">
          {plans.map((plan) => {
            const price = billingCycle === "annual" ? plan.priceAnnual : plan.priceMonthly;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-2xl p-7 sm:p-8 transition-all duration-300 ${
                  plan.isPopular
                    ? "bg-zinc-900/95 border-2 border-[#D4FF00] shadow-2xl shadow-[#D4FF00]/10 scale-100 lg:-translate-y-2 z-10"
                    : "bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700"
                }`}
              >
                {/* Floating "Most Popular" Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#D4FF00] text-black text-[11px] font-extrabold uppercase tracking-widest px-4 py-1 rounded-full shadow-lg shadow-[#D4FF00]/30 flex items-center gap-1.5 whitespace-nowrap">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>MOST POPULAR</span>
                  </div>
                )}

                <div>
                  {/* Tier Title & Description */}
                  <div className="mb-6">
                    <h3 className="text-xl sm:text-2xl font-black text-white font-display tracking-tight">
                      {plan.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-2 min-h-[40px] leading-relaxed">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Pricing Output */}
                  <div className="pb-6 mb-6 border-b border-zinc-800/80">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight">
                        {price}
                      </span>
                      <span className="text-sm font-semibold text-zinc-400">
                        {plan.periodText}
                      </span>
                    </div>
                    {billingCycle === "annual" && (
                      <p className="text-[11px] text-[#D4FF00] font-medium mt-1">
                        {plan.billedAnnualNote}
                      </p>
                    )}
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3.5 mb-8">
                    <span className="text-[11px] font-bold tracking-[0.2em] text-zinc-500 uppercase block mb-3">
                      Plan Inclusions
                    </span>
                    {plan.features.map((feature) => (
                      <div key={`${plan.id}-${feature.text}`} className="flex items-start gap-3 text-sm">
                        {feature.included ? (
                          <div className="w-5 h-5 rounded-full bg-[#D4FF00]/10 border border-[#D4FF00]/25 flex items-center justify-center text-[#D4FF00] shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-zinc-800/50 flex items-center justify-center text-zinc-600 shrink-0 mt-0.5">
                            <X className="w-3.5 h-3.5 stroke-[2]" />
                          </div>
                        )}
                        <span
                          className={
                            feature.included
                              ? "text-zinc-200 font-normal leading-snug"
                              : "text-zinc-600 line-through leading-snug"
                          }
                        >
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => handleSelectPlan(plan)}
                    className={`w-full min-h-[48px] py-3.5 px-6 rounded-xl text-sm font-extrabold tracking-wide uppercase transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-2 ${
                      plan.isPopular
                        ? "bg-[#D4FF00] hover:bg-[#bce600] text-black shadow-lg shadow-[#D4FF00]/20 hover:shadow-[#D4FF00]/30"
                        : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-zinc-700/60"
                    }`}
                    aria-label={`Select ${plan.name} plan`}
                  >
                    <span>Choose {plan.name}</span>
                    <span>→</span>
                  </button>
                  <p className="text-[11px] text-center text-zinc-500 mt-2.5">
                    Cancel anytime • No hidden registration fees
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-10 p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 max-w-xl mx-auto text-center">
          <p className="text-xs text-zinc-400">
            <span className="font-bold text-white uppercase mr-1">⚡ 7-Day Guarantee:</span>
            Full refund within 7 days. Zero questions asked.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Pricing;
