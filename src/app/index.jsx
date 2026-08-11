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
import ScrollToTop from "@/components/ui/ScrollToTop";
import NotesPage from "./pages/NotesPage";

const App = () => {
  const [showDelayFinished, setShowDelayFinished] = useState(false);
  const { loading: configLoading } = useConfig();

  // Check if current route is the standalone DE Notes page
  const isNotesRoute = () => {
    if (typeof window === "undefined") return false;
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get("page");
    const hash = window.location.hash;
    const pathname = window.location.pathname;

    return (
      pageParam === "notes" ||
      hash === "#/notes" ||
      hash === "#notes-page" ||
      pathname.endsWith("/notes") ||
      pathname.endsWith("/notes.html")
    );
  };

  const isNotes = isNotesRoute();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDelayFinished(true);
    }, 1500);
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

  // Standalone DE Notes page when opened in new tab
  if (isNotes) {
    return <NotesPage />;
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

      {/* Sticky Header at top for all screens */}
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

      {/* Floating Back to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default App;
