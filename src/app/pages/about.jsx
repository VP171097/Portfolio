import React, { useState, useEffect, useRef } from "react";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { useConfig } from "@/context/ConfigContext";

const About = () => {
  const { config, loading } = useConfig();
  const aboutConfig = config.about;
  const [showMore, setShowMore] = useState(false);
  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setShowMore(false);
        }
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  if (loading || !aboutConfig) {
    return (
      <section className="text-white px-6 py-8">
        Loading About Section...
      </section>
    );
  }

  const [beforeHighlight, afterHighlight] = aboutConfig.description1?.includes(
    aboutConfig.highlight
  )
    ? aboutConfig.description1.split(aboutConfig.highlight)
    : [aboutConfig.description1 || "", ""];

  return (
    <section
      id="about"
      ref={aboutRef}
      className="xl:px-6 px-5 py-8 xl:rounded-2xl bg-black/50  scroll-mt-20"
    >
      <div className="items-center gap-3 mb-3">
        <h2 className="text-white xl:text-2xl text-xl font-bold mb-3">
          {aboutConfig.title}
        </h2>
        <div className="bg-yellow-400 w-15 h-1 rounded-sm"></div>
      </div>

      {/* First Paragraph */}
      <div className="text-gray-300 text-sm mb-4 leading-relaxed">
        {beforeHighlight}
        <span className="inline-flex mx-1">
          <PointerHighlight
            rectangleClassName="bg-muted rounded-lg dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600"
            pointerClassName="text-yellow-500"
          >
            <span className="relative z-10 text-amber-300 xl:text-2xl sm:text-sm xl:p-5 p-2 font-semibold">
              {aboutConfig.highlight}
            </span>
          </PointerHighlight>
        </span>
        {afterHighlight}
      </div>

      {/* Second Paragraph */}
      <div className="text-gray-300 leading-relaxed">
        {/* Desktop always visible */}
        <p className="hidden lg:block">{aboutConfig.description2}</p>

        {/* Mobile Expand/Collapse with Transition */}
        <div className="lg:hidden">
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${showMore ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
          >
            <p className="text-sm">{aboutConfig.description2}</p>
          </div>

          <button
            onClick={() => setShowMore(!showMore)}
            className="mt-2 text-blue-400 text-sm hover:text-amber-400 cursor-pointer focus:outline-none"
          >
            {showMore ? "Show Less" : "See More..."}
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
