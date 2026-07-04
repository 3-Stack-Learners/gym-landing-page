import gymThemeConfig from "../data/gymThemeConfig";

const Pricing = ({ setActiveFormMode, setSelectedPlanName, setSelectedPlanPrice }) => {
  const {
    design: { colors },
    pricingPlans,
  } = gymThemeConfig;

  const handleSelectPlan = (planName, planPrice) => {
    setSelectedPlanName(planName);
    setSelectedPlanPrice(planPrice);
    setActiveFormMode("membership");
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className={`w-full ${colors.bgMain} ${colors.textPrimary}`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <p className={`text-sm uppercase tracking-[0.35em] ${colors.brandPrimaryText}`}>Pricing</p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight">Choose the plan that fits your grind.</h2>
          <p className={`mt-4 max-w-3xl text-lg leading-relaxed ${colors.textSecondary}`}>
            Flexible memberships built for every routine, whether you're starting out, committing to growth, or training like a VIP.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => {
            const isFeatured = index === 1;
            return (
              <div
                key={plan.id}
                className={`rounded-3xl bg-slate-900 border p-8 transition-all duration-300 hover:shadow-xl ${
                  isFeatured ? "border-red-600 shadow-[0_20px_60px_rgba(220,38,38,0.25)]" : colors.borderColor
                }`}
              >
                <div className="mb-6">
                  <p className={`text-sm uppercase tracking-[0.35em] ${colors.brandPrimaryText}`}>{plan.name}</p>
                  <p className="mt-4 text-4xl font-bold text-white">{plan.price}</p>
                </div>
                <div className="space-y-4 mb-8">
                  {plan.features.split(",").map((feature) => (
                    <div key={feature.trim()} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-red-500" />
                      <p className={`text-sm leading-relaxed ${colors.textSecondary}`}>{feature.trim()}</p>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => handleSelectPlan(plan.name, plan.price)}
                  className="w-full rounded-2xl bg-red-600 px-6 py-4 text-base font-semibold text-white transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 inline-flex items-center justify-center text-center"
                  aria-label={`Select ${plan.name} plan`}
                >
                  Select Plan
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
