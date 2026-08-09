import React from "react";
import { Book, GraduationCap } from "lucide-react";
import { MagicCard } from "@/components/magicui/magic-card";
import { useConfig } from "@/context/ConfigContext";

const Education = () => {
  const { config, loading } = useConfig();
  const educationConfig = config.education;

  if (loading || !educationConfig)
    return <div className="text-white text-center">Loading Education...</div>;

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
            <GraduationCap size={22} className="text-black" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{educationConfig.title || "Education"}</h2>
            <div className="bg-yellow-400 w-16 h-1 rounded-sm mt-1"></div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative ml-5 border-l-2 border-gray-600 pt-2">
          {educationConfig.educationData?.map((item, index) => (
            <div key={index} className="mb-6 pl-8 relative">
              <span className="absolute left-[-9px] top-1.5 w-4 h-4 bg-yellow-400 border-2 border-black rounded-full"></span>
              <h3 className="text-lg font-bold text-white">{item.school}</h3>
              {item.degree && (
                <p className="text-sm text-amber-300 font-medium mt-1">
                  {item.degree}
                </p>
              )}
              <p className="text-xs text-gray-400 mt-1">
                {item.year} {item.grade && `• Grade: ${item.grade}`}
              </p>
              <p className="text-sm text-gray-300 leading-relaxed mt-2.5">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </MagicCard>
    </div>
  );
};

export default Education;
