import { useState } from "react";
import { MapPin, Clock, MessageSquare, CheckCircle2, ArrowRight, Loader2, Sparkles } from "lucide-react";
import gymThemeConfig from "../data/gymThemeConfig";

const LeadCapture = ({ activeFormMode, setActiveFormMode, selectedPlanName, selectedPlanPrice }) => {
  const { basicInfo } = gymThemeConfig;

  // Dynamic plan detection: Free vs Paid
  const isPaidPlan = activeFormMode === "membership" && Boolean(selectedPlanName);
  const isAnnual = isPaidPlan && selectedPlanName.toLowerCase().includes("annual");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredSlot, setPreferredSlot] = useState("Morning"); // "Morning" | "Evening" | "Flexible (Anytime)"
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [passId, setPassId] = useState("");
  const [issuedAt, setIssuedAt] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    const trimmedName = fullName.trim();
    if (!trimmedName) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    // Sanitize and validate 10-digit Indian mobile number
    const rawDigits = phone.replace(/\D/g, "");
    const sanitizedPhone =
      rawDigits.length === 12 && rawDigits.startsWith("91")
        ? rawDigits.slice(2)
        : rawDigits.length === 11 && rawDigits.startsWith("0")
        ? rawDigits.slice(1)
        : rawDigits;

    if (sanitizedPhone.length !== 10 || !/^[6-9]\d{9}$/.test(sanitizedPhone)) {
      setErrorMessage("Please enter a valid 10-digit mobile number (e.g. 98765 43210).");
      return;
    }

    setPhone(sanitizedPhone);
    setIsSubmitting(true);

    // 1. Generate real-time timestamps and Pass ID / Booking Ref
    const now = new Date();
    const formatOptions = {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const issuedTimeStr = now.toLocaleString("en-IN", formatOptions);
    const expiresTimeStr = new Date(now.getTime() + 24 * 60 * 60 * 1000).toLocaleString("en-IN", formatOptions);

    setTimeout(() => {
      const generatedId = `MF-${Math.floor(100000 + Math.random() * 900000)}`;
      setPassId(generatedId);
      setIssuedAt(issuedTimeStr);
      setExpiresAt(expiresTimeStr);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 400);
  };

  const getWhatsAppMessage = () => {
    const trimmedName = fullName.trim();
    const rawDigits = phone.replace(/\D/g, "");
    const sanitizedPhone =
      rawDigits.length === 12 && rawDigits.startsWith("91")
        ? rawDigits.slice(2)
        : rawDigits.length === 11 && rawDigits.startsWith("0")
        ? rawDigits.slice(1)
        : rawDigits;

    if (isPaidPlan) {
      return `Hello The Muscle Factory, I have reserved my ${selectedPlanName} membership (${selectedPlanPrice || "Special Rate"}). Details: Name: ${trimmedName}, Phone: ${sanitizedPhone}, Slot: ${preferredSlot}, Booking Ref: ${passId} | Issued: ${issuedAt}. Please guide me with payment and activation.`;
    }

    return `Hello The Muscle Factory, I have generated my Free 1-Day Pass. Details: Name: ${trimmedName}, Phone: ${sanitizedPhone}, Slot: ${preferredSlot}, Pass ID: ${passId} | Issued: ${issuedAt}. Please confirm my slot.`;
  };

  const getWhatsAppUrl = () => {
    return `https://api.whatsapp.com/send?phone=${basicInfo.phone}&text=${encodeURIComponent(getWhatsAppMessage())}`;
  };

  const handleReset = () => {
    setFullName("");
    setPhone("");
    setPreferredSlot("Morning");
    setPassId("");
    setIssuedAt("");
    setExpiresAt("");
    setIsSubmitted(false);
    setErrorMessage("");
    if (setActiveFormMode) setActiveFormMode("trial");
  };

  return (
    <section id="free-pass" className="relative w-full scroll-mt-24 pt-6 sm:pt-8 pb-14 sm:pb-16 bg-zinc-950 overflow-hidden">
      {/* Ambient Athletic Lime Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[26rem] bg-[#D4FF00]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Centered Hero Header with Tight Spacing */}
        <div className="text-center max-w-2xl sm:max-w-3xl mx-auto mb-6 sm:mb-8">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border border-[#D4FF00]/30 bg-[#D4FF00]/10 text-[#D4FF00] mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LIMITED VIP SLOTS</span>
          </div>

          {/* Headline */}
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-[1.15] mb-2.5">
            {activeFormMode === "membership" && selectedPlanName ? (
              <>
                CONFIRM YOUR <span className="text-[#D4FF00]">{selectedPlanName}</span>
              </>
            ) : (
              <>
                CLAIM YOUR FREE <span className="text-[#D4FF00]">1-DAY VIP PASS</span>
              </>
            )}
          </h2>

          {/* Subtext */}
          <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed max-w-lg mx-auto">
            {activeFormMode === "membership" && selectedPlanName ? (
              <>
                Lock in {selectedPlanPrice ? `${selectedPlanPrice}` : "special"} rate. Zero enrollment fees. Instant activation.
              </>
            ) : (
              <>
                Experience Jaipur&apos;s premier iron facility. Test modern machines with zero commitments.
              </>
            )}
          </p>
        </div>

        {/* 2. Optimized Wide Conversion Form Card (max-w-3xl) */}
        <div className="max-w-3xl mx-auto bg-zinc-900/80 border border-zinc-800 p-6 sm:p-8 rounded-2xl shadow-2xl relative overflow-hidden">
          {isSubmitted ? (
            <div className="py-4 sm:py-6 flex flex-col items-center text-center animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-[#D4FF00]/10 border border-[#D4FF00]/30 flex items-center justify-center text-[#D4FF00] mb-3 shadow-lg shadow-[#D4FF00]/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h4 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight font-display mb-1">
                {isPaidPlan ? "MEMBERSHIP RESERVED!" : "PASS GENERATED!"}
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-md mb-5 leading-relaxed">
                {isPaidPlan
                  ? "Your special rate is locked! Connect on WhatsApp to complete activation & payment."
                  : "Show this digital pass or send via WhatsApp to activate your 1-day trial."}
              </p>

              {/* Digital Pass / Reservation Summary Card */}
              <div className="w-full max-w-md p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800 mb-3 text-left text-xs space-y-2 shadow-inner">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
                  <span className="font-display font-black text-sm uppercase text-white tracking-wider">The Muscle Factory</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D4FF00]/10 text-[#D4FF00] border border-[#D4FF00]/30">
                    {isPaidPlan ? "Membership Lock" : "VIP Pass"}
                  </span>
                </div>
                <div className="pt-1 space-y-1.5">
                  <div className="text-zinc-400 flex items-center justify-between">
                    <span>Member:</span>
                    <strong className="text-white font-semibold">{fullName}</strong>
                  </div>
                  <div className="text-zinc-400 flex items-center justify-between">
                    <span>Phone:</span>
                    <strong className="text-white font-semibold">{phone}</strong>
                  </div>
                  <div className="text-zinc-400 flex items-center justify-between">
                    <span>Plan:</span>
                    <strong className="text-white font-semibold text-right">
                      {isPaidPlan ? (
                        <>
                          <span>{selectedPlanName}</span>
                          {selectedPlanPrice && (
                            <span className="text-[#D4FF00] ml-1.5 font-bold">({selectedPlanPrice})</span>
                          )}
                        </>
                      ) : (
                        "Free 1-Day VIP Pass"
                      )}
                    </strong>
                  </div>
                  <div className="text-zinc-400 flex items-center justify-between">
                    <span>Preferred Slot:</span>
                    <strong className="text-white font-semibold">{preferredSlot}</strong>
                  </div>

                  <div className="text-zinc-400 flex items-center justify-between pt-1.5 border-t border-zinc-900">
                    <span>{isPaidPlan ? "Membership Duration:" : "Valid For:"}</span>
                    <span className="text-zinc-300 text-xs font-mono font-medium">
                      {isPaidPlan ? (isAnnual ? "365 Days" : "30 Days") : "24 Hours (Trial Entry)"}
                    </span>
                  </div>
                  <div className="text-zinc-400 flex items-center justify-between">
                    <span>{isPaidPlan ? "Rate Lock Valid:" : "Expires:"}</span>
                    <span className="text-amber-400/80 text-xs font-mono font-medium">
                      {isPaidPlan ? "48 Hours" : expiresAt}
                    </span>
                  </div>
                  <div className="text-zinc-400 flex items-center justify-between pt-1.5 border-t border-zinc-900">
                    <span>{isPaidPlan ? "Booking Ref:" : "Pass ID:"}</span>
                    <strong className="text-[#D4FF00] font-mono tracking-widest text-sm font-black">{passId}</strong>
                  </div>
                </div>
              </div>

              {/* Validity Notice */}
              <div className="w-full max-w-md mb-5 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-left">
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  {isPaidPlan ? (
                    <>
                      🔒 <strong className="text-zinc-300">Price locked for 48 hrs.</strong> Visit front desk or pay online via WhatsApp to activate.
                    </>
                  ) : (
                    <>
                      ⚠️ <strong className="text-zinc-300">Pass is valid for 24 hours.</strong> Valid for 1 workout session only.
                    </>
                  )}
                </p>
              </div>

              {/* Primary Action Button */}
              <div className="w-full max-w-md mb-4">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[50px] bg-[#D4FF00] hover:bg-[#bce600] active:scale-95 text-black font-extrabold tracking-wider uppercase text-xs sm:text-sm py-3.5 px-4 rounded-xl shadow-lg shadow-[#D4FF00]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span>{isPaidPlan ? "Complete Booking on WhatsApp →" : "Activate Pass via WhatsApp →"}</span>
                </a>
              </div>

              {/* Reset / Register Another Pass Link */}
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
              >
                ← Register Another Pass
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Error Notification */}
              {errorMessage && (
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                  {errorMessage}
                </div>
              )}

              {/* Desktop 2-Column Grid (Name & Phone side-by-side on md:) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name Field */}
                <div>
                  <label htmlFor="lead-name" className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input
                    id="lead-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Kunal Sharma"
                    className="w-full min-h-[48px] bg-zinc-950 border border-zinc-800 text-white text-base rounded-xl focus:border-[#D4FF00] focus:ring-1 focus:ring-[#D4FF00] outline-none px-4 transition-colors"
                  />
                </div>

                {/* Phone Number Field */}
                <div>
                  <label htmlFor="lead-phone" className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                    WhatsApp / Mobile Number
                  </label>
                  <input
                    id="lead-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765-43210"
                    className="w-full min-h-[48px] bg-zinc-950 border border-zinc-800 text-white text-base rounded-xl focus:border-[#D4FF00] focus:ring-1 focus:ring-[#D4FF00] outline-none px-4 transition-colors"
                  />
                </div>
              </div>

              {/* Preferred Slot Selector Pills (Athletic Lime active border & indicator) */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Preferred Workout Slot
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      title: "MORNING",
                      subtitle: "6 AM – 12 PM",
                      value: "Morning",
                    },
                    {
                      title: "EVENING",
                      subtitle: "4 PM – 10 PM",
                      value: "Evening",
                    },
                    {
                      title: "FLEXIBLE",
                      subtitle: "Anytime Access",
                      value: "Flexible (Anytime)",
                    },
                  ].map((slot) => {
                    const isSelected = preferredSlot === slot.value;
                    return (
                      <button
                        key={slot.value}
                        type="button"
                        onClick={() => setPreferredSlot(slot.value)}
                        className={`p-3.5 rounded-xl text-left cursor-pointer transition-all flex flex-col justify-center ${
                          isSelected
                            ? "bg-[#D4FF00]/10 border-2 border-[#D4FF00] text-white shadow-sm"
                            : "bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:border-zinc-700"
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                            {slot.title}
                          </span>
                          {isSelected ? (
                            <span className="w-2 h-2 rounded-full bg-[#D4FF00] shrink-0 shadow-[0_0_8px_rgba(212,255,0,0.9)]" />
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-zinc-700 shrink-0" />
                          )}
                        </div>
                        <span
                          className={`block text-[10px] mt-0.5 ${
                            isSelected ? "text-zinc-200 font-medium" : "text-zinc-500 font-normal"
                          }`}
                        >
                          {slot.subtitle}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Primary Submit CTA (Athletic Lime with mt-6 breathing room) */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-[52px] bg-[#D4FF00] hover:bg-[#bce600] active:scale-95 text-black font-extrabold tracking-wider uppercase text-xs sm:text-sm py-3.5 rounded-xl shadow-lg shadow-[#D4FF00]/20 hover:shadow-[#D4FF00]/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Generating Pass...</span>
                    </>
                  ) : (
                    <>
                      <span>Get My Free Pass</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Micro-Trust Badge */}
              <div className="pt-1 text-center">
                <p className="text-[10px] sm:text-[11px] text-zinc-400 flex items-center justify-center gap-1.5 font-medium">
                  <span>🔒</span>
                  <span>No spam. We will only send your digital access pass.</span>
                </p>
              </div>

            </form>
          )}
        </div>

        {/* 3. Bottom Info Strip (Location, Hours, WhatsApp with gap-8 lg:gap-12) */}
        <div id="contact" className="max-w-4xl mx-auto mt-10 sm:mt-12 pt-8 border-t border-zinc-800 scroll-mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-start md:items-center justify-between">
            
            {/* Column 1: Location */}
            <div className="flex items-start gap-3 text-left">
              <div className="w-8 h-8 rounded-lg bg-[#D4FF00]/10 border border-[#D4FF00]/25 flex items-center justify-center text-[#D4FF00] shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-white uppercase tracking-wider">
                  Gym Location
                </div>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  {basicInfo.address}
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=The+Muscle+Factory+Gym+Jhotwara+Jaipur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#D4FF00] hover:text-[#bce600] mt-1.5 uppercase tracking-wider transition-colors"
                >
                  <span>Open in Maps</span>
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* Column 2: Timings */}
            <div className="flex items-start gap-3 text-left">
              <div className="w-8 h-8 rounded-lg bg-[#D4FF00]/10 border border-[#D4FF00]/25 flex items-center justify-center text-[#D4FF00] shrink-0 mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-white uppercase tracking-wider">
                  Training Hours
                </div>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Mon–Sat: 5:30 AM – 11:00 PM<br />Sun: 7:00 AM – 8:00 PM
                </p>
                <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-[#D4FF00]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-pulse shrink-0" />
                  <span>24/7 Access for VIP Members</span>
                </div>
              </div>
            </div>

            {/* Column 3: WhatsApp Action Button */}
            <div className="flex items-center justify-start md:justify-end w-full pt-1 md:pt-0">
              <a
                href={`https://api.whatsapp.com/send?phone=${basicInfo.phone}&text=${encodeURIComponent(
                  "Hi The Muscle Factory, I have a quick question about gym memberships and facilities."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-500/30 hover:border-emerald-500/50 text-emerald-400 text-xs sm:text-sm font-bold tracking-wide transition-all shadow-sm w-full md:w-auto shrink-0 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default LeadCapture;
