import React, { useState, useEffect, useMemo } from "react";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { MagicCard } from "@/components/magicui/magic-card";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { useConfig } from "@/context/ConfigContext";

const SkillsSection = () => {
  const { config, loading } = useConfig();
  const skillsConfig = config.skills;

  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const maxVisibleOnMobile = 2;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const skillMap = useMemo(() => {
    if (!skillsConfig?.technicalSkills) return new Map();
    return new Map(skillsConfig.technicalSkills.map((s) => [s.name, s]));
  }, [skillsConfig]);

  if (loading || !skillsConfig)
    return <div className="text-white text-center">Loading Skills...</div>;

  const hasCategories =
    Array.isArray(skillsConfig.categories) && skillsConfig.categories.length > 0;

  const visibleCategories =
    isMobile && !showAll && hasCategories
      ? skillsConfig.categories.slice(0, maxVisibleOnMobile)
      : skillsConfig.categories;

  const visibleSkills =
    isMobile && !showAll && !hasCategories
      ? skillsConfig.technicalSkills?.slice(0, 6)
      : skillsConfig.technicalSkills;

  return (
    <div>
      <MagicCard
        gradientSize={400}
        gradientFrom="#4a16f4"
        gradientTo="#f42116"
        className="rounded-2xl xl:border-2 xl:p-8 md:p-12 py-5 flex flex-col items-center justify-center w-full text-white"
      >
        {/* Heading */}
        <div className="max-w-3xl text-center">
          <p className="text-lg tracking-widest text-orange-400 mb-1">
            {skillsConfig.sectionTitle}
          </p>
          <h2 className="font-bold mb-5">
            <SparklesText>{skillsConfig.headline}</SparklesText>
          </h2>

          <div className="flex justify-center">
            <PointerHighlight
              rectangleClassName="bg-muted rounded-lg dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600"
              pointerClassName="text-yellow-500"
            >
              <span className="relative z-10 text-amber-300 text-2xl p-5 font-semibold">
                {skillsConfig.highlight}
              </span>
            </PointerHighlight>
          </div>

          <p className="text-gray-400 text-sm mt-4 mb-6 px-5">
            {skillsConfig.description}
          </p>
        </div>

        {/* Categorized Skills View */}
        {hasCategories ? (
          <div className="w-full max-w-4xl space-y-6 px-4 mb-4">
            {visibleCategories.map((cat, catIdx) => (
              <div
                key={catIdx}
                className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-5 shadow-lg"
              >
                <h3 className="text-amber-400 font-bold text-lg mb-4 flex items-center gap-2 border-b border-amber-400/20 pb-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  {cat.category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {cat.skills.map((skillName, idx) => {
                    const skillData = skillMap.get(skillName) || { name: skillName };
                    return (
                      <div
                        key={idx}
                        className="bg-white/95 hover:bg-white border-2 border-black shadow-amber-50 rounded-lg px-3 py-2 flex items-center gap-2.5 hover:scale-105 transition-all duration-200 cursor-default"
                      >
                        {skillData.icon && (
                          <img
                            src={skillData.icon}
                            alt={skillData.name}
                            className="w-7 h-7 object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        )}
                        <p className="text-sm font-semibold whitespace-nowrap text-black">
                          {skillData.name}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Flat Skills Grid Fallback */
          <div className="flex flex-wrap gap-5 justify-center text-black mb-4">
            {visibleSkills?.map((item, idx) => (
              <div
                key={idx}
                className="bg-white/95 hover:bg-white border-2 border-black shadow-amber-50 rounded-lg px-3 py-2 flex items-center gap-3 hover:scale-110 transition w-40"
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <p className="text-sm font-semibold whitespace-nowrap text-black">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Toggle Button for mobile */}
        {isMobile &&
          ((hasCategories && skillsConfig.categories.length > maxVisibleOnMobile) ||
            (!hasCategories && skillsConfig.technicalSkills?.length > 6)) && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-blue-400 text-sm cursor-pointer hover:text-amber-400 focus:outline-none px-10 mt-2"
            >
              {showAll ? "Show Less" : "See More..."}
            </button>
          )}
      </MagicCard>
    </div>
  );
};

export default SkillsSection;
