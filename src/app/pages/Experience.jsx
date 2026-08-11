import React from "react";
import { Briefcase, Download, Sparkles, CheckCircle2 } from "lucide-react";
import { MagicCard } from "@/components/magicui/magic-card";
import { useConfig } from "@/context/ConfigContext";

const HIGHLIGHT_KEYWORDS = [
  "Databricks Lakehouse",
  "Medallion Architecture",
  "PySpark",
  "Amazon Connect",
  "Unity Catalog",
  "Delta Lake",
  "Change Data Feed",
  "Kafka",
  "Azure Data Lake",
  "Azure SQL Server",
  "ETL",
  "AWS S3",
  "Python",
];

const renderHighlightedText = (text) => {
  let parts = [text];
  HIGHLIGHT_KEYWORDS.forEach((keyword) => {
    const newParts = [];
    parts.forEach((part) => {
      if (typeof part === "string") {
        const split = part.split(new RegExp(`(${keyword})`, "gi"));
        split.forEach((subPart) => {
          if (subPart.toLowerCase() === keyword.toLowerCase()) {
            newParts.push(
              <span
                key={Math.random()}
                className="font-bold text-amber-300 bg-amber-400/10 px-1 py-0.5 rounded border border-amber-400/20"
              >
                {subPart}
              </span>
            );
          } else {
            newParts.push(subPart);
          }
        });
      } else {
        newParts.push(part);
      }
    });
    parts = newParts;
  });
  return parts;
};

const Experience = () => {
  const { config, loading } = useConfig();
  const experienceConfig = config.experience;

  if (loading || !experienceConfig)
    return <div className="text-white text-center py-6">Loading Experience...</div>;

  return (
    <div id="experience" className="text-white scroll-mt-24">
      <MagicCard
        gradientSize={400}
        gradientFrom="#4a16f4"
        gradientTo="#f42116"
        className="rounded-2xl xl:border-2 xl:p-8 py-6 px-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 px-1">
          <div className="flex items-center">
            <div className="bg-yellow-400 p-2 rounded-md mr-4 shadow-md shadow-yellow-500/20">
              <Briefcase size={22} className="text-black" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {experienceConfig.title || "Career Experience"}
              </h2>
              <div className="bg-yellow-400 w-16 h-1 rounded-sm mt-1"></div>
            </div>
          </div>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold shadow-md shadow-amber-500/20 transition hover:scale-105"
          >
            <Download size={14} />
            <span>Download Resume</span>
          </a>
        </div>

        {/* Timeline Container */}
        <div className="relative ml-3 sm:ml-5 border-l-2 border-amber-500/40 pl-6 sm:pl-8 space-y-10">
          {experienceConfig.experienceData.map((item, index) => (
            <div key={index} className="relative group">
              {/* Timeline Bullet Node with Glowing Pulse */}
              <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-400 border-2 border-black shadow"></span>
              </span>

              {/* Role Title & Duration */}
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg md:text-xl font-black text-white group-hover:text-amber-300 transition">
                  {item.title}
                </h3>
                <span className="text-xs text-amber-300 font-bold px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30">
                  {item.duration}
                </span>
              </div>

              {/* Company Banner */}
              <div className="flex flex-wrap sm:flex-nowrap gap-3.5 mt-2.5 items-center">
                {item.img && (
                  <img
                    src={item.img}
                    className="w-24 sm:w-28 h-9 sm:h-10 object-contain bg-white/5 border border-white/10 rounded-lg p-1.5"
                    alt={`${item.company} logo`}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                )}
                <div className="border-l border-neutral-700 pl-3">
                  <p className="text-xs sm:text-sm font-semibold text-neutral-200">
                    {item.company}
                  </p>
                </div>
              </div>

              {/* Points List */}
              <div className="mt-4">
                <ul className="space-y-2.5">
                  {item.points.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs md:text-sm text-neutral-300 leading-relaxed"
                    >
                      <CheckCircle2
                        size={15}
                        className="text-amber-400 shrink-0 mt-0.5"
                      />
                      <span>{renderHighlightedText(point)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </MagicCard>
    </div>
  );
};

export default Experience;
