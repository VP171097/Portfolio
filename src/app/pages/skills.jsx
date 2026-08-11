import React, { useState, useMemo } from "react";
import { MagicCard } from "@/components/magicui/magic-card";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { useConfig } from "@/context/ConfigContext";
import { Cpu, Search, Sparkles, Star, Zap, CheckCircle2, Layers } from "lucide-react";

const SkillItemCard = ({ skill }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Gradient by category
  const getProgressColor = (proficiency) => {
    if (proficiency >= 90) return "from-amber-400 to-yellow-500";
    if (proficiency >= 85) return "from-cyan-400 to-blue-500";
    return "from-emerald-400 to-teal-500";
  };

  return (
    <div
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className="relative group bg-neutral-950/80 hover:bg-neutral-900/90 border border-neutral-800 hover:border-amber-400/60 rounded-xl p-4 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-amber-500/10 flex flex-col justify-between"
    >
      {/* Top row: Icon, Name, Level Badge */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 p-1.5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            {skill.icon ? (
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-full h-full object-contain"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <Cpu size={20} className="text-amber-400" />
            )}
          </div>
          <div>
            <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition">
              {skill.name}
            </h4>
            <span className="text-[11px] text-neutral-400 font-medium">
              {skill.category}
            </span>
          </div>
        </div>

        {/* Level Badge */}
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider border ${
            skill.level === "Expert"
              ? "bg-amber-500/15 text-amber-300 border-amber-500/40"
              : skill.level === "Advanced"
              ? "bg-blue-500/15 text-blue-300 border-blue-500/40"
              : "bg-emerald-500/15 text-emerald-300 border-emerald-500/40"
          }`}
        >
          {skill.level || "Proficient"}
        </span>
      </div>

      {/* Progress Bar & Percentage */}
      <div className="mt-2">
        <div className="flex justify-between items-center text-xs mb-1">
          <span className="text-neutral-400 text-[11px]">
            {skill.experience || "Enterprise Delivery"}
          </span>
          <span className="text-amber-400 font-bold text-xs">
            {skill.proficiency || 88}%
          </span>
        </div>

        <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${getProgressColor(
              skill.proficiency || 88
            )} transition-all duration-700 ease-out`}
            style={{ width: `${skill.proficiency || 88}%` }}
          />
        </div>
      </div>

      {/* Floating Detailed Hover Tooltip */}
      {showTooltip && skill.useCase && (
        <div className="absolute left-1/2 -bottom-2 translate-y-full -translate-x-1/2 w-64 p-3 bg-neutral-950/98 backdrop-blur-xl border border-amber-400/50 rounded-xl shadow-2xl z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 mb-1 border-b border-neutral-800 pb-1">
            <Zap size={13} className="text-amber-400" />
            <span>{skill.name} • {skill.experience || "Production"}</span>
          </div>
          <p className="text-[11px] text-neutral-300 leading-snug">
            {skill.useCase}
          </p>
        </div>
      )}
    </div>
  );
};

const SkillsSection = () => {
  const { config, loading } = useConfig();
  const skillsConfig = config.skills;

  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => {
    if (!skillsConfig?.categories) return ["All"];
    return ["All", ...skillsConfig.categories.map((c) => c.category)];
  }, [skillsConfig]);

  const allSkills = useMemo(() => {
    if (!skillsConfig?.technicalSkills) return [];
    return skillsConfig.technicalSkills;
  }, [skillsConfig]);

  const filteredSkills = useMemo(() => {
    return allSkills.filter((skill) => {
      const matchesCategory =
        activeTab === "All" || skill.category === activeTab;
      const matchesSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.useCase?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allSkills, activeTab, searchQuery]);

  if (loading || !skillsConfig) {
    return <div className="text-white text-center py-6">Loading Skills...</div>;
  }

  return (
    <div className="text-white">
      <MagicCard
        gradientSize={400}
        gradientFrom="#4a16f4"
        gradientTo="#f42116"
        className="rounded-2xl xl:border-2 xl:p-8 py-6 px-4"
      >
        {/* Section Header */}
        <div className="flex items-center mb-2 px-1">
          <div className="bg-yellow-400 p-2 rounded-md mr-4 shadow-md shadow-yellow-500/20">
            <Layers size={22} className="text-black" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              {skillsConfig.headline || "Technical & Data Engineering"}
            </h2>
            <div className="bg-yellow-400 w-16 h-1 rounded-sm mt-1"></div>
          </div>
        </div>

        <p className="text-gray-300 text-xs md:text-sm mt-2 mb-6 px-1 leading-relaxed">
          {skillsConfig.description}
        </p>

        {/* Filter Controls: Category Tabs + Search Input */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 px-1">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => {
              const isSelected = activeTab === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-amber-400 text-black shadow-lg shadow-amber-400/20 scale-[1.02]"
                      : "bg-neutral-900/90 text-neutral-300 border border-neutral-700 hover:border-neutral-500 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-56">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
            />
            <input
              type="text"
              placeholder="Search skill / tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-neutral-900/90 border border-neutral-700 focus:border-amber-400 rounded-lg text-white placeholder-neutral-500 focus:outline-none transition"
            />
          </div>
        </div>

        {/* Skills Grid with Animated Cards */}
        {filteredSkills.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredSkills.map((skill, idx) => (
              <SkillItemCard key={idx} skill={skill} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-neutral-400 text-sm">
            No matching skills found for "{searchQuery}".
          </div>
        )}
      </MagicCard>
    </div>
  );
};

export default SkillsSection;
