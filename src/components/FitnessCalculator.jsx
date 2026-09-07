import { useState, useMemo } from "react";
import { Flame, Droplets, Scale, RotateCcw, Dumbbell, ShieldCheck, ArrowRight } from "lucide-react";

const FitnessCalculator = () => {
  const initialValues = {
    gender: "male",
    age: "25",
    weight: "75",
    height: "175",
    goal: "muscle_gain",
  };

  const [formData, setFormData] = useState(initialValues);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleReset = () => {
    setFormData(initialValues);
  };

  // Real-time calculation logic with robust validation
  const results = useMemo(() => {
    const weightNum = parseFloat(formData.weight);
    const heightNum = parseFloat(formData.height);
    const ageNum = parseInt(formData.age, 10);

    const isValid =
      !isNaN(weightNum) &&
      weightNum >= 30 &&
      weightNum <= 300 &&
      !isNaN(heightNum) &&
      heightNum >= 100 &&
      heightNum <= 250 &&
      !isNaN(ageNum) &&
      ageNum >= 14 &&
      ageNum <= 99;

    if (!isValid) {
      return {
        isValid: false,
        bmi: null,
        bmiStatus: "Awaiting Input",
        bmiBadgeColor: "bg-zinc-800 text-zinc-400 border-zinc-700",
        targetCalories: "---",
        maintenanceCalories: "---",
        waterIntake: "---",
        dailyProtein: "---",
      };
    }

    // BMI Calculation
    const heightInMeters = heightNum / 100;
    const bmiValue = (weightNum / (heightInMeters * heightInMeters)).toFixed(1);

    let bmiStatus = "Normal Weight";
    let bmiBadgeColor = "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";

    if (bmiValue < 18.5) {
      bmiStatus = "Underweight";
      bmiBadgeColor = "bg-blue-500/10 text-blue-400 border-blue-500/30";
    } else if (bmiValue >= 25.0 && bmiValue < 30.0) {
      bmiStatus = "Overweight";
      bmiBadgeColor = "bg-amber-500/10 text-amber-400 border-amber-500/30";
    } else if (bmiValue >= 30.0) {
      bmiStatus = "High BMI";
      bmiBadgeColor = "bg-[#D4FF00]/10 text-[#D4FF00] border-[#D4FF00]/30";
    }

    // Mifflin-St Jeor BMR Equation
    let bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum;
    bmr += formData.gender === "male" ? 5 : -161;

    // TDEE with moderate fitness active multiplier (gym 3-5 days/week)
    const tdee = bmr * 1.45;
    let target = tdee;

    if (formData.goal === "fat_loss") {
      target = Math.max(1200, tdee - 500);
    } else if (formData.goal === "muscle_gain") {
      target = tdee + 350;
    }

    // Water intake: ~35ml per kg + 500ml gym hydration bonus
    const water = ((weightNum * 0.035) + 0.5).toFixed(1);

    // Recommended Protein intake based on athletic goal
    const proteinFactor = formData.goal === "muscle_gain" ? 2.0 : formData.goal === "fat_loss" ? 2.2 : 1.8;
    const protein = Math.round(weightNum * proteinFactor);

    return {
      isValid: true,
      bmi: bmiValue,
      bmiStatus,
      bmiBadgeColor,
      targetCalories: Math.round(target).toLocaleString(),
      maintenanceCalories: Math.round(tdee).toLocaleString(),
      waterIntake: `${water} L`,
      dailyProtein: `${protein}g`,
    };
  }, [formData]);

  const handleConsultClick = (e) => {
    e.preventDefault();
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      const yOffset = -80;
      const y = contactSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full py-4 sm:py-6 bg-transparent">
      {/* Subtle Ambient Athletic Lime Glow Accent */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[40rem] h-[30rem] bg-[#D4FF00]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-[#D4FF00] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase inline-block mb-1.5">
            PRECISION METRICS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            CALCULATE YOUR <span className="text-[#D4FF00]">POTENTIAL.</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-md mx-auto">
            Instant Mifflin-St Jeor metabolic & hydration estimates.
          </p>
        </div>

        {/* 2-Column Calculator Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-7 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
              <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-[#D4FF00]" />
                Physical Parameters
              </span>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Reset to standard defaults"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            <div className="space-y-5">
              {/* Gender Toggle Pills */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                  Biological Gender
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleInputChange("gender", "male")}
                    className={`min-h-[48px] py-3 px-4 rounded-xl text-sm font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                      formData.gender === "male"
                        ? "bg-[#D4FF00] text-black shadow-lg shadow-[#D4FF00]/20"
                        : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInputChange("gender", "female")}
                    className={`min-h-[48px] py-3 px-4 rounded-xl text-sm font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                      formData.gender === "female"
                        ? "bg-[#D4FF00] text-black shadow-lg shadow-[#D4FF00]/20"
                        : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              {/* Age, Weight, Height 3-Field Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="calc-age" className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                    Age (Years)
                  </label>
                  <input
                    id="calc-age"
                    type="number"
                    min="14"
                    max="99"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    placeholder="25"
                    className="w-full min-h-[48px] bg-zinc-950 border border-zinc-800 text-white rounded-xl focus:border-[#D4FF00] focus:ring-1 focus:ring-[#D4FF00] outline-none px-4 text-base font-semibold transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="calc-weight" className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                    Weight (kg)
                  </label>
                  <input
                    id="calc-weight"
                    type="number"
                    min="30"
                    max="300"
                    value={formData.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                    placeholder="75"
                    className="w-full min-h-[48px] bg-zinc-950 border border-zinc-800 text-white rounded-xl focus:border-[#D4FF00] focus:ring-1 focus:ring-[#D4FF00] outline-none px-4 text-base font-semibold transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="calc-height" className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                    Height (cm)
                  </label>
                  <input
                    id="calc-height"
                    type="number"
                    min="100"
                    max="250"
                    value={formData.height}
                    onChange={(e) => handleInputChange("height", e.target.value)}
                    placeholder="175"
                    className="w-full min-h-[48px] bg-zinc-950 border border-zinc-800 text-white rounded-xl focus:border-[#D4FF00] focus:ring-1 focus:ring-[#D4FF00] outline-none px-4 text-base font-semibold transition-colors"
                  />
                </div>
              </div>

              {/* Goal Selection Pills */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                  Primary Fitness Goal
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "fat_loss", label: "Lose Fat", sub: "Deficit" },
                    { id: "maintenance", label: "Maintain", sub: "Equilibrium" },
                    { id: "muscle_gain", label: "Build Muscle", sub: "Surplus" },
                  ].map((goalItem) => (
                    <button
                      key={goalItem.id}
                      type="button"
                      onClick={() => handleInputChange("goal", goalItem.id)}
                      className={`min-h-[48px] p-3 rounded-xl text-left transition-all cursor-pointer ${
                        formData.goal === goalItem.id
                          ? "bg-[#D4FF00] text-black border-[#D4FF00] shadow-md shadow-[#D4FF00]/20"
                          : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700"
                      }`}
                    >
                      <div className="text-sm font-bold">{goalItem.label}</div>
                      <div
                        className={`text-[10px] uppercase font-semibold mt-0.5 ${
                          formData.goal === goalItem.id ? "text-black/80 font-bold" : "text-zinc-500"
                        }`}
                      >
                        {goalItem.sub}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: High-Tech Output Dashboard */}
          <div className="lg:col-span-5 bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between shadow-2xl">
            
            {/* Ambient Athletic Lime Accent */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#D4FF00]/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#D4FF00]" />
                  Your Daily Target
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#D4FF00]/10 text-[#D4FF00] border border-[#D4FF00]/20">
                  Live Estimate
                </span>
              </div>

              {/* Main Target Calories Output */}
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-black text-5xl sm:text-6xl text-white tracking-tight drop-shadow-[0_0_20px_rgba(212,255,0,0.25)]">
                    {results.targetCalories}
                  </span>
                  <span className="text-sm font-bold text-[#D4FF00] uppercase tracking-wider">
                    kcal / day
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  Maintenance baseline: <span className="text-zinc-200 font-semibold">{results.maintenanceCalories} kcal</span>
                </p>
              </div>

              {/* Secondary Metric Cards */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                
                {/* BMI Score */}
                <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-3.5 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                    <span className="flex items-center gap-1">
                      <Scale className="w-3.5 h-3.5 text-zinc-500" />
                      BMI Score
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-white font-display">
                      {results.bmi || "--"}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${results.bmiBadgeColor}`}>
                      {results.bmiStatus}
                    </span>
                  </div>
                </div>

                {/* Daily Water Intake */}
                <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-3.5 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                    <span className="flex items-center gap-1">
                      <Droplets className="w-3.5 h-3.5 text-blue-400" />
                      Hydration
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-black text-white font-display">
                      {results.waterIntake}
                    </span>
                    <span className="text-[10px] font-medium text-zinc-500 uppercase">
                      Recommended
                    </span>
                  </div>
                </div>

                {/* Protein Target Snippet */}
                <div className="col-span-2 bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#D4FF00]/10 border border-[#D4FF00]/20 flex items-center justify-center text-[#D4FF00]">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white uppercase">
                        Optimal Daily Protein
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        Based on {formData.weight || "0"}kg bodyweight
                      </div>
                    </div>
                  </div>
                  <span className="text-lg font-black text-white font-display">
                    {results.dailyProtein}
                  </span>
                </div>

              </div>
            </div>

            {/* Bottom Consultation CTA */}
            <div>
              <a
                href="#contact"
                onClick={handleConsultClick}
                className="w-full bg-[#D4FF00] hover:bg-[#bce600] active:scale-95 text-black font-extrabold tracking-wide uppercase text-xs py-3.5 px-4 rounded-xl shadow-lg shadow-[#D4FF00]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Get Customized Meal Plan</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <p className="text-[10px] text-zinc-500 text-center mt-3 leading-relaxed">
                *Estimates based on standard metabolic formulas. Consult our certified coaches for customized meal plans.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default FitnessCalculator;
