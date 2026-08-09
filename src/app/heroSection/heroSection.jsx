import React from "react";
import About from "../pages/about";
import Experience from "../pages/Experience";
import Projects from "../pages/Projects";
import SkillsSection from "../pages/skills";
import Education from "../pages/Education";

const HeroSection = () => {
  return (
    <div className="rounded-2xl xl:border-2 xl:border-amber-100 max-w-4xl relative flex justify-between h-full w-full flex-col pb-8">
      <div id="about" className="xl:px-5 mb-4 scroll-mt-24">
        <About />
      </div>
      <div id="experience" className="xl:px-10 my-4 scroll-mt-24">
        <Experience />
      </div>
      <div id="projects" className="xl:px-10 my-4 scroll-mt-24">
        <Projects />
      </div>
      <div id="skills" className="xl:px-10 my-4 scroll-mt-24">
        <SkillsSection />
      </div>
      <div id="education" className="xl:px-10 my-4 scroll-mt-24">
        <Education />
      </div>
    </div>
  );
};

export default HeroSection;
