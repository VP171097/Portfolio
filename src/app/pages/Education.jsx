import React from "react";
import { GraduationCap } from "lucide-react";
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
        className="rounded-2xl xl:border-2 xl:p-8 py-6 px-3"
      >
        {/* Header */}
        <div className="flex items-center mb-4 px-1">
          <div className="bg-yellow-400 p-2 rounded-md mr-4 shadow-md shadow-yellow-500/20">
            <GraduationCap size={20} className="text-black" />
          </div>
          <h2 className="text-2xl font-bold">{educationConfig.title || "Education"}</h2>
        </div>

        {/* Timeline */}
        <div className="relative ml-5 border-l-2 border-gray-600 pt-0.5">
          {educationConfig.educationData?.map((item, index) => (
            <div key={index} className="mb-6 pl-8 relative">
              <div className="mt-4 py-1">
                <span className="absolute left-[-9px] top-6 w-4 h-4 bg-yellow-400 rounded-full"></span>

                {/* Degree / Title */}
                <h3 className="xl:text-lg text-xl font-bold">{item.degree || item.school}</h3>

                {/* Logo and Info */}
                <div className="flex gap-4 mt-3 items-center">
                  {item.img && (
                    <img
                      src={item.img}
                      className="w-28 h-10 object-contain bg-white/5 rounded p-1"
                      alt={`${item.school} logo`}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  )}
                  <div className="border-l-2 pl-3">
                    <p className="text-sm text-gray-400">{item.school}</p>
                    <p className="text-sm text-gray-400 mb-1">
                      {item.year} {item.grade && `• Grade: ${item.grade}`}
                    </p>
                  </div>
                </div>

                {/* Description */}
                {item.description && (
                  <p className="text-sm text-gray-200 leading-relaxed mt-3">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </MagicCard>
    </div>
  );
};

export default Education;
