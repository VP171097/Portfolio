import React from "react";
import { Award, BadgeCheck, Trophy, Sparkles } from "lucide-react";
import { MagicCard } from "@/components/magicui/magic-card";
import { useConfig } from "@/context/ConfigContext";

const Certifications = () => {
  const { config, loading } = useConfig();
  const certsConfig = config.certifications;

  if (loading || !certsConfig) {
    return <div className="text-white text-center py-6">Loading Certifications...</div>;
  }

  return (
    <div className="text-white">
      <MagicCard
        gradientSize={400}
        gradientFrom="#4a16f4"
        gradientTo="#f42116"
        className="rounded-2xl xl:border-2 xl:p-8 py-6 px-4"
      >
        {/* Header */}
        <div className="flex items-center mb-2 px-1">
          <div className="bg-yellow-400 p-2 rounded-md mr-4 shadow-md shadow-yellow-500/20">
            <Award size={22} className="text-black" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{certsConfig.title || "Certifications & Honors"}</h2>
            <div className="bg-yellow-400 w-16 h-1 rounded-sm mt-1"></div>
          </div>
        </div>

        {certsConfig.subtitle && (
          <p className="text-gray-400 text-sm mt-2 mb-6 px-1 leading-relaxed">
            {certsConfig.subtitle}
          </p>
        )}

        {/* Certifications Grid */}
        {Array.isArray(certsConfig.certifications) && certsConfig.certifications.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-amber-400 mb-4 px-1 flex items-center gap-2">
              <BadgeCheck size={18} className="text-amber-400" />
              <span>Professional Certifications</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {certsConfig.certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="bg-neutral-950/80 border border-neutral-800 hover:border-amber-400/50 rounded-xl p-4 transition-all duration-200 hover:shadow-md hover:shadow-amber-500/10 flex items-start gap-3"
                >
                  <div className="p-2 bg-amber-400/10 rounded-lg shrink-0 mt-0.5 border border-amber-400/20">
                    <BadgeCheck size={18} className="text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white leading-snug">
                      {cert.name}
                    </h4>
                    {cert.issuer && (
                      <span className="inline-block mt-1 text-xs text-amber-300/80 font-medium">
                        {cert.issuer}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Honors & Awards Section */}
        {Array.isArray(certsConfig.awards) && certsConfig.awards.length > 0 && (
          <div className="pt-6 border-t border-neutral-800">
            <h3 className="text-lg font-bold text-amber-400 mb-4 px-1 flex items-center gap-2">
              <Trophy size={18} className="text-amber-400" />
              <span>Honors &amp; Awards</span>
            </h3>

            <div className="space-y-3.5">
              {certsConfig.awards.map((award, idx) => (
                <div
                  key={idx}
                  className="bg-neutral-950/80 border border-neutral-800 hover:border-amber-400/50 rounded-xl p-4 transition-all duration-200 hover:shadow-md hover:shadow-amber-500/10 flex items-start gap-3.5"
                >
                  <div className="p-2 bg-yellow-400/10 rounded-lg shrink-0 mt-0.5 border border-yellow-400/20">
                    <Sparkles size={18} className="text-yellow-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-snug">
                      {award.title}
                    </h4>
                    {award.organization && (
                      <p className="text-xs text-amber-300/90 font-medium mt-0.5">
                        {award.organization}
                      </p>
                    )}
                    {award.description && (
                      <p className="text-xs text-gray-400 leading-relaxed mt-1.5">
                        {award.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </MagicCard>
    </div>
  );
};

export default Certifications;
