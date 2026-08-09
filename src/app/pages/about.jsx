import React, { useState, useEffect, useRef } from "react";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { useConfig } from "@/context/ConfigContext";
import { Sparkles, Zap, Server, CheckCircle } from "lucide-react";

const statIcons = [Zap, Server, Sparkles, CheckCircle];

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

    const currentRef = aboutRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
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
      className="xl:px-6 px-5 py-8 xl:rounded-2xl bg-black/50 scroll-mt-20"
    >
      <div className="items-center gap-3 mb-3">
        <h2 className="text-white xl:text-2xl text-xl font-bold mb-3">
          {aboutConfig.title}
        </h2>
        <div className="bg-yellow-400 w-16 h-1 rounded-sm"></div>
      </div>

      {/* First Paragraph */}
      <div className="text-gray-300 text-sm mb-4 leading-relaxed">
        {beforeHighlight}
        <span className="inline-flex mx-1">
          <PointerHighlight
            rectangleClassName="bg-muted rounded-lg dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600"
            pointerClassName="text-yellow-500"
          >
            <span className="relative z-10 text-amber-300 text-sm md:text-base font-bold px-2 py-1">
              {aboutConfig.highlight}
            </span>
          </PointerHighlight>
        </span>
        {afterHighlight}
      </div>

      {/* Second Paragraph */}
      <div className="text-gray-300 leading-relaxed mb-6">
        {/* Desktop always visible */}
        <p className="hidden lg:block">{aboutConfig.description2}</p>

        {/* Mobile Expand/Collapse with Transition */}
        <div className="lg:hidden">
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              showMore ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
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

      {/* Key Metrics & Stats Counter Grid */}
      {Array.isArray(aboutConfig.stats) && aboutConfig.stats.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-neutral-800">
          {aboutConfig.stats.map((stat, idx) => {
            const Icon = statIcons[idx % statIcons.length];
            return (
              <div
                key={idx}
                className="group p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-amber-400/50 transition-all duration-300 hover:shadow-md hover:shadow-amber-500/10 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                    {stat.value}
                  </span>
                  <div className="p-1.5 rounded-lg bg-amber-400/10 text-amber-400 group-hover:scale-110 transition-transform">
                    <Icon size={14} />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-white leading-tight">
                    {stat.label}
                  </p>
                  {stat.sub && (
                    <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">
                      {stat.sub}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default About;
