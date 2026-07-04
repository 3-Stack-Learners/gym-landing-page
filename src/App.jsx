import { useState } from "react";
import gymThemeConfig from "./data/gymThemeConfig";
import Hero from "./components/Hero";
import GymDetails from "./components/GymDetails";
import WhyChooseUs from "./components/WhyChooseUs";
import Pricing from "./components/Pricing";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  const [activeFormMode, setActiveFormMode] = useState("trial");
  const [selectedPlanName, setSelectedPlanName] = useState("");
  const [selectedPlanPrice, setSelectedPlanPrice] = useState("");

  return (
    <div className={`w-full min-h-screen ${gymThemeConfig.design.colors.bgMain} flex flex-col p-0 m-0 overflow-x-hidden`}>
      <Navbar />
      <Hero />
      <GymDetails />
      <WhyChooseUs />
      <Pricing
        setActiveFormMode={setActiveFormMode}
        setSelectedPlanName={setSelectedPlanName}
        setSelectedPlanPrice={setSelectedPlanPrice}
      />
      <ContactForm
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
