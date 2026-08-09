import React, { useState } from "react";
import { Briefcase, ChevronDown, ChevronUp } from "lucide-react";
import { MagicCard } from "@/components/magicui/magic-card";
import { useConfig } from "@/context/ConfigContext";

const Experience = () => {
  const { config, loading } = useConfig();
  const experienceConfig = config.experience;

  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpand = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (loading || !experienceConfig)
    return <div className="text-white text-center py-6">Loading Experience...</div>;

  return (
    <div className="text-white">
      <MagicCard
        gradientSize={400}
        gradientFrom="#4a16f4"
        gradientTo="#f42116"
        className="rounded-2xl xl:border-2 xl:p-8 py-6 px-4"
      >
        {/* Header */}
        <div className="flex items-center mb-6 px-1">
          <div className="bg-yellow-400 p-2 rounded-md mr-4 shadow-md shadow-yellow-500/20">
            <Briefcase size={22} className="text-black" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{experienceConfig.title || "Experience"}</h2>
            <div className="bg-yellow-400 w-16 h-1 rounded-sm mt-1"></div>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative ml-3 sm:ml-5 border-l-2 border-neutral-700 pl-6 sm:pl-8 space-y-8">
          {experienceConfig.experienceData.map((item, index) => {
            const isExpanded = expandedItems[index];

            return (
              <div key={index} className="relative group">
                {/* Timeline Bullet Node (Aligned with Title) */}
                <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-4 w-4">
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-400 border-2 border-black shadow"></span>
                </span>

                {/* Role Title */}
                <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-amber-300 transition">
                  {item.title}
                </h3>

                {/* Company Banner & Duration */}
                <div className="flex flex-wrap sm:flex-nowrap gap-3.5 mt-2.5 items-center">
                  {item.img && (
                    <img
                      src={item.img}
                      className="w-24 sm:w-28 h-9 sm:h-10 object-contain bg-white/5 border border-white/10 rounded-lg p-1.5"
                      alt={`${item.company} logo`}
                    />
                  )}
                  <div className="border-l border-neutral-700 pl-3">
                    <p className="text-xs sm:text-sm font-semibold text-neutral-300">
                      {item.company}
                    </p>
                    <p className="text-xs text-amber-400/90 font-medium mt-0.5">
                      {item.duration}
                    </p>
                  </div>
                </div>

                {/* Points List */}
                <div className="mt-3.5">
                  {/* Desktop view: full list */}
                  <ul className="hidden lg:block list-disc list-outside ml-4 space-y-2 text-xs md:text-sm text-neutral-300 leading-relaxed">
                    {item.points.map((point, i) => (
                      <li key={i} className="pl-1">
                        {point}
                      </li>
                    ))}
                  </ul>

                  {/* Mobile view: smooth accordion */}
                  <div className="lg:hidden">
                    <ul
                      className={`list-disc list-outside ml-4 space-y-2 text-xs text-neutral-300 leading-relaxed overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded ? "max-h-[1200px] opacity-100 mt-2" : "max-h-0 opacity-0"
                      }`}
                    >
                      {item.points.map((point, i) => (
                        <li key={i} className="pl-1">
                          {point}
                        </li>
                      ))}
                    </ul>

                    {/* Mobile Toggle Button */}
                    <button
                      onClick={() => toggleExpand(index)}
                      type="button"
                      className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition cursor-pointer p-1 -ml-1"
                    >
                      <span>{isExpanded ? "Show Less" : "See More..."}</span>
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </MagicCard>
    </div>
  );
};

export default Experience;
