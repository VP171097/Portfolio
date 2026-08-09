import React, { useState, useMemo, useRef } from "react";
import { FolderGit2, Github, ExternalLink, Sparkles, CheckCircle2 } from "lucide-react";
import { MagicCard } from "@/components/magicui/magic-card";
import { useConfig } from "@/context/ConfigContext";

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const hasGithub = Boolean(project.githubUrl && project.githubUrl.trim() !== "");
  const hasLive = Boolean(project.liveUrl && project.liveUrl.trim() !== "");
  const hasLinks = hasGithub || hasLive;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      className="group relative flex flex-col justify-between bg-neutral-950/80 border border-neutral-800 hover:border-amber-400/50 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 will-change-transform"
    >
      {/* Specular Radial Glare Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 rounded-xl"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(251, 191, 36, ${glare.opacity}), transparent 70%)`,
        }}
      />

      <div>
        {/* Project Image */}
        {project.image && (
          <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-neutral-900 border-b border-neutral-800">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent pointer-events-none"></div>

            {/* Category Badge */}
            <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-neutral-700 text-amber-400 text-xs font-semibold px-2.5 py-1 rounded-md shadow">
              {project.category}
            </span>

            {/* Featured Indicator */}
            {project.featured && (
              <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-amber-400 text-black text-xs font-bold px-2.5 py-1 rounded-md shadow-md">
                <Sparkles size={12} />
                Featured
              </span>
            )}
          </div>
        )}

        {/* Project Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition mb-2">
            {project.title}
          </h3>

          <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Highlights */}
          {Array.isArray(project.highlights) && project.highlights.length > 0 && (
            <ul className="space-y-1.5 mb-4">
              {project.highlights.map((highlight, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-xs text-gray-300 leading-normal"
                >
                  <CheckCircle2
                    size={14}
                    className="text-amber-400 shrink-0 mt-0.5"
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Tech Stack Badges */}
          {Array.isArray(project.techStack) && project.techStack.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-neutral-800">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-neutral-900 text-neutral-300 border border-neutral-700/80 text-[11px] px-2 py-0.5 rounded-md font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Links (Conditional Rendering) */}
      {hasLinks && (
        <div className="px-5 pb-5 pt-2 flex items-center gap-3 relative z-30">
          {hasGithub && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-neutral-500 text-white text-xs font-semibold rounded-lg transition"
            >
              <Github size={14} />
              <span>Code Repo</span>
            </a>
          )}

          {hasLive && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-black text-xs font-semibold rounded-lg shadow-sm shadow-amber-500/30 transition"
            >
              <ExternalLink size={14} />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
};

const Projects = () => {
  const { config, loading } = useConfig();
  const projectsConfig = config.projects;
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    if (!projectsConfig?.categories) return ["All"];
    return projectsConfig.categories;
  }, [projectsConfig]);

  const filteredProjects = useMemo(() => {
    if (!projectsConfig?.projects) return [];
    if (selectedCategory === "All") return projectsConfig.projects;
    return projectsConfig.projects.filter(
      (project) => project.category === selectedCategory
    );
  }, [projectsConfig, selectedCategory]);

  if (loading || !projectsConfig) {
    return <div className="text-white text-center py-6">Loading Projects...</div>;
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
            <FolderGit2 size={22} className="text-black" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{projectsConfig.title || "Featured Projects"}</h2>
            <div className="bg-yellow-400 w-16 h-1 rounded-sm mt-1"></div>
          </div>
        </div>

        {projectsConfig.subtitle && (
          <p className="text-gray-400 text-sm mt-2 mb-6 px-1 leading-relaxed">
            {projectsConfig.subtitle}
          </p>
        )}

        {/* Category Filter Tabs */}
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-8 px-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-amber-400 text-black font-semibold shadow-lg shadow-amber-400/20 scale-[1.02]"
                      : "bg-neutral-900/90 text-neutral-300 border border-neutral-700 hover:border-neutral-500 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </MagicCard>
    </div>
  );
};

export default Projects;
