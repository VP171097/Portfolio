import React, { useState, useEffect } from "react";
import Sidebar from "./heroSection/sidebar";
import HeroSection from "./heroSection/heroSection";
import { Particles } from "@/components/magicui/particles";
import LandingPage from "./landing/landingPage";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import Preloader from "@/components/ui/preloader";
import ContactSection from "./pages/contact";
import Footer from "@/components/layouts/footer";
import { useConfig } from "@/context/ConfigContext";
import Header from "@/components/layouts/header";

const App = () => {
  const [showDelayFinished, setShowDelayFinished] = useState(false);
  const { loading: configLoading } = useConfig();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDelayFinished(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const stillLoading = configLoading || !showDelayFinished;

  if (stillLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
        <Preloader />
      </div>
    );
  }

  return (
    <div className="relative">
      <Particles
        className="fixed inset-0 -z-10"
        quantity={200}
        ease={50}
        refresh
      />
      <ScrollProgress className="top-0 z-20" />

      {/* ✅ Sticky Header at top for all screens */}
      <div className="sticky top-0 z-50">
        <Header />
      </div>

      <LandingPage />

      <section className="flex mt-8 flex-col md:flex-row xl:container w-full justify-center xl:gap-24 z-10">
        <div>
          <Sidebar />
        </div>
        <div>
          <HeroSection />
        </div>
      </section>

      <section id="contact" className="flex justify-between flex-col mb-5">
        <ContactSection />
      </section>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;
