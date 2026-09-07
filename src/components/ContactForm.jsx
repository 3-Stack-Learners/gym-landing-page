import { useState } from "react";
import gymThemeConfig from "../data/gymThemeConfig";

const ContactForm = ({ activeFormMode, setActiveFormMode, selectedPlanName, selectedPlanPrice }) => {
  const { design, basicInfo } = gymThemeConfig;
  const { colors } = design;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [goal, setGoal] = useState("");

  const phonePattern = /^[6-9](?:\s*\d){9}$/ 

  const handleTrialSubmit = (event) => {
    event.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) {
      alert("Please enter a valid name.");
      return;
    }

    if (!phonePattern.test(phone)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!goal) {
      alert("Please select a fitness goal.");
      return;
    }

    const message = `Hello The Muscle Factory Gym, I want to book a free trial batch slot. Details - Name: ${trimmedName}, Phone: ${phone}, Goal: ${goal}.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${basicInfo.phone}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleMembershipSubmit = (event) => {
    event.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) {
      alert("Please enter a valid name.");
      return;
    }

    if (!phonePattern.test(phone)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    const message = `Hello The Muscle Factory Gym, my name is ${trimmedName} and my phone number is ${phone}, and I want to purchase the ${selectedPlanName} membership plan priced at ${selectedPlanPrice}.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${basicInfo.phone}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className={`w-full ${colors.bgMain} ${colors.textPrimary}`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={`w-full rounded-3xl border ${colors.borderColor} ${colors.bgCard} p-8 shadow-xl`}>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              {activeFormMode === "trial" ? (
                <>
                  <div className="space-y-4 mb-8">
                    <p className={`text-sm uppercase tracking-[0.35em] ${colors.brandPrimaryText}`}>Contact</p>
                    <h2 className="text-4xl font-black">Book a free trial batch slot</h2>
                    <p className={`max-w-2xl text-lg leading-relaxed ${colors.textSecondary}`}>
                      Submit your details and start your premium workout experience with The Muscle Factory.
                    </p>
                  </div>

                  <form className="space-y-6" onSubmit={handleTrialSubmit}>
                    <div className="space-y-2">
                      <label htmlFor="name" className={`block text-sm font-medium ${colors.textPrimary}`}>
                        Full name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className={`w-full rounded-2xl border ${colors.borderColor} ${colors.bgMain} ${colors.textPrimary} px-4 py-3 outline-none transition-all duration-300 focus:ring-2 focus:ring-[#D4FF00]`}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className={`block text-sm font-medium ${colors.textPrimary}`}>
                        Mobile number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        className={`w-full rounded-2xl border ${colors.borderColor} ${colors.bgMain} ${colors.textPrimary} px-4 py-3 outline-none transition-all duration-300 focus:ring-2 focus:ring-[#D4FF00]`}
                        placeholder="Enter your 10-digit mobile number"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="goal" className={`block text-sm font-medium ${colors.textPrimary}`}>
                        Fitness goal
                      </label>
                      <select
                        id="goal"
                        value={goal}
                        onChange={(event) => setGoal(event.target.value)}
                        className={`w-full rounded-2xl border ${colors.borderColor} ${colors.bgMain} ${colors.textPrimary} px-4 py-3 outline-none transition-all duration-300 focus:ring-2 focus:ring-[#D4FF00]`}
                      >
                        <option value="" disabled>
                          Select Your Fitness Goal
                        </option>
                        <option value="Muscle Gain 💪">Muscle Gain 💪</option>
                        <option value="Weight Loss 🔥">Weight Loss 🔥</option>
                        <option value="Cardio & Endurance 🏃‍♂️">Cardio & Endurance 🏃‍♂️</option>
                        <option value="Fat Loss & Toning ⚡">Fat Loss & Toning ⚡</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-2xl bg-[#D4FF00] text-black hover:bg-[#bce600] font-bold px-6 py-4 text-base transition-all duration-300 hover:scale-[1.03] active:scale-95"
                    >
                      Send via WhatsApp
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <div className="space-y-4 mb-8">
                    <p className={`text-sm uppercase tracking-[0.35em] ${colors.brandPrimaryText}`}>Membership Inquiry</p>
                    <h2 className="text-4xl font-black text-white">
                      Inquiring for Plan: <span className={colors.brandPrimaryText}>{selectedPlanName || "Selected Plan"}</span>
                      {selectedPlanPrice ? <span className="text-slate-300"> ({selectedPlanPrice})</span> : null}
                    </h2>
                    <p className={`max-w-2xl text-lg leading-relaxed ${colors.textSecondary}`}>
                      Share your details below and we&apos;ll take care of the membership booking right away.
                    </p>
                  </div>

                  <form className="space-y-6" onSubmit={handleMembershipSubmit}>
                    <div className="space-y-2">
                      <label htmlFor="membership-name" className={`block text-sm font-medium ${colors.textPrimary}`}>
                        Full name
                      </label>
                      <input
                        id="membership-name"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="w-full rounded-2xl border border-slate-800 bg-slate-950 text-white px-4 py-3 outline-none transition-all duration-300 focus:ring-2 focus:ring-[#D4FF00]"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="membership-phone" className={`block text-sm font-medium ${colors.textPrimary}`}>
                        Mobile number
                      </label>
                      <input
                        id="membership-phone"
                        type="tel"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        className="w-full rounded-2xl border border-slate-800 bg-slate-950 text-white px-4 py-3 outline-none transition-all duration-300 focus:ring-2 focus:ring-[#D4FF00]"
                        placeholder="Enter your 10-digit mobile number"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-2xl bg-[#D4FF00] hover:bg-[#bce600] px-6 py-4 text-base font-bold text-black transition-all duration-300 hover:scale-[1.03] active:scale-95"
                    >
                      Send Membership Inquiry
                    </button>
                  </form>

                  <button
                    type="button"
                    onClick={() => setActiveFormMode("trial")}
                    className="mt-4 inline-flex items-center text-sm text-slate-300 hover:text-white transition-colors duration-200"
                  >
                    ← Switch back to Free Trial Booking
                  </button>
                </>
              )}
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=The+Muscle+Factory+Gym+Jhotwara+Jaipur"
              target="_blank"
              rel="noopener noreferrer"
              className="block relative cursor-pointer w-full h-72 md:h-full min-h-[300px] rounded-2xl border border-slate-800 opacity-80 hover:opacity-100 transition-opacity duration-300 shadow-xl overflow-hidden"
            >
              <iframe
                title="The Muscle Factory Gym Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3556.8777174623434!2d75.7336712!3d26.9390196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db376ca32e19d%3A0x6bbaea3f6089fcbe!2sThe%20Muscle%20Factory%20Gym!5e0!3m2!1sen!2sin!4v1719999999999!5m2!1sen!2sin"
                allowFullScreen=""
                loading="lazy"
                className="pointer-events-none w-full h-full border-0"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
