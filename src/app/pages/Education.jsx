import React from "react";
import { Book, Award, FileCheck } from "lucide-react";
import { MagicCard } from "@/components/magicui/magic-card";
import { useConfig } from "@/context/ConfigContext";

const Education = () => {
  const { config, loading } = useConfig();
  const educationConfig = config.education;

  if (loading || !educationConfig)
    return <div className="text-white text-center">Loading Education...</div>;

  return (
    <MagicCard
      size={500}
      gradientSize={200}
      gradientFrom="red"
      className="p-0 rounded-2xl xl:border-2 "
    >
      <div className="text-white xl:px-8 px-5 pt-6 pb-6 rounded-2xl max-w-4xl mx-auto space-y-6">
        {/* Education Header & Section */}
        <div>
          <div className="flex items-center mb-4">
            <div className="bg-yellow-400 p-2 rounded-md mr-4">
              <Book size={20} className="text-black" />
            </div>
            <h2 className="text-2xl font-bold">{educationConfig.title}</h2>
          </div>

          <div className="relative ml-5 border-l-2 border-gray-600 pt-4">
            {educationConfig.educationData?.map((item, index) => (
              <div key={index} className="mb-6 pl-8 relative">
                <span className="absolute left-[-9px] top-1 w-4 h-4 bg-yellow-400 border-2 border-black rounded-full"></span>
                <h3 className="text-lg font-bold">{item.school}</h3>
                {item.degree && (
                  <p className="text-sm text-amber-300 font-medium mt-0.5">
                    {item.degree}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-0.5">
                  {item.year} {item.grade && `• Grade: ${item.grade}`}
                </p>
                <p className="text-sm text-gray-200 leading-relaxed mt-2">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        {educationConfig.certifications?.length > 0 && (
          <div className="pt-2 border-t border-gray-800">
            <h3 className="text-lg font-bold text-amber-400 mb-3 flex items-center gap-2">
              <FileCheck size={18} className="text-amber-400" /> Certifications
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-300">
              {educationConfig.certifications.map((cert, idx) => (
                <li
                  key={idx}
                  className="bg-black/40 border border-white/10 rounded-lg p-2.5 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Awards Section */}
        {educationConfig.awards?.length > 0 && (
          <div className="pt-2 border-t border-gray-800">
            <h3 className="text-lg font-bold text-amber-400 mb-3 flex items-center gap-2">
              <Award size={18} className="text-amber-400" /> Honors & Awards
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {educationConfig.awards.map((award, idx) => (
                <li
                  key={idx}
                  className="bg-black/40 border border-white/10 rounded-lg p-2.5 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                  {award}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </MagicCard>
  );
};

export default Education;
