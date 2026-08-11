import React, { useState } from "react";
import { Link } from "react-scroll";
import { useConfig } from "@/context/ConfigContext";
import { useTheme } from "@/context/ThemeContext";
import { Menu, X, Sun, Moon, Download, Github } from "lucide-react";

const Header = () => {
  const { config, loading } = useConfig();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  if (loading || !config.navigation) {
    return null;
  }

  const navItems = config.navigation.navItems;

  return (
    <header className="sticky top-0 z-50 w-full bg-black/85 backdrop-blur-xl border-b border-neutral-800 shadow-2xl transition-colors">
      {/* ===== Mobile / Tablet View Header ===== */}
      <div className="xl:hidden px-4 sm:px-6 py-3 flex justify-between items-center">
        <Link
          to="landing"
          smooth={true}
          duration={500}
          className="text-amber-400 font-extrabold text-base sm:text-lg tracking-wider cursor-pointer flex items-center gap-1.5"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
          <span>{config.sidebar?.name || "VIVEK PANDEY"}</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-lg bg-neutral-900 border border-neutral-700 text-amber-400 hover:bg-neutral-800 transition"
            title={`Current Theme: ${theme}`}
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Mobile Drawer Toggle */}
          <button
            className="text-white p-2 rounded-lg bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 transition"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="xl:hidden px-5 py-4 flex flex-col gap-1.5 border-t border-neutral-800 bg-neutral-950/98 backdrop-blur-2xl shadow-2xl animate-in slide-in-from-top duration-200">
          {navItems.map((item, index) =>
            item.isNewTab ? (
              <a
                key={index}
                href={`${import.meta.env.BASE_URL}${item.path || "?page=notes"}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="text-sm px-4 py-2.5 rounded-lg transition font-medium text-gray-300 hover:bg-neutral-800 hover:text-white"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={index}
                to={item.to}
                smooth={true}
                duration={500}
                offset={-70}
                spy={true}
                activeClass="active"
                onClick={() => setIsOpen(false)}
                className="text-sm px-4 py-2.5 rounded-lg cursor-pointer transition font-medium text-gray-300 hover:bg-neutral-800 hover:text-white"
              >
                {item.label}
              </Link>
            )
          )}

          {/* Quick Resume CTA inside Mobile Menu */}
          <div className="pt-3 mt-2 border-t border-neutral-800 flex gap-2">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-amber-500 text-black font-bold text-xs shadow-md"
            >
              <Download size={14} />
              <span>Resume (PDF)</span>
            </a>
          </div>
        </div>
      )}

      {/* ===== Desktop View Header ===== */}
      <div className="hidden xl:flex max-w-7xl mx-auto justify-between items-center px-6 py-2.5">
        {/* Left Brand */}
        <Link
          to="landing"
          smooth={true}
          duration={500}
          className="text-amber-400 font-extrabold text-base tracking-wider cursor-pointer flex items-center gap-2 hover:scale-105 transition-transform shrink-0"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
          <span>{config.sidebar?.name || "VIVEK PANDEY"}</span>
        </Link>

        {/* Center Main Nav Items */}
        <nav className="flex items-center gap-1 bg-neutral-950/80 px-2 py-1 rounded-xl border border-neutral-800">
          {navItems.map((item, index) =>
            item.isNewTab ? (
              <a
                key={index}
                href={`${import.meta.env.BASE_URL}${item.path || "?page=notes"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-xs lg:text-sm transition-all duration-150 rounded-lg font-medium text-gray-300 hover:bg-neutral-800 hover:text-white whitespace-nowrap cursor-pointer"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={index}
                to={item.to}
                smooth={true}
                duration={500}
                offset={-80}
                spy={true}
                activeClass="active"
                className="px-3 py-1.5 text-xs lg:text-sm transition-all duration-150 cursor-pointer rounded-lg font-medium text-gray-300 hover:bg-neutral-800 hover:text-white whitespace-nowrap"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-amber-400 hover:bg-neutral-800 transition cursor-pointer"
            title={`Toggle Theme (Current: ${theme})`}
          >
            {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
          </button>

          {/* GitHub Profile */}
          <a
            href="https://github.com/VP171097"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-gray-300 hover:text-white hover:bg-neutral-800 transition"
            aria-label="GitHub Profile"
          >
            <Github size={15} />
          </a>

          {/* Resume CTA */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold shadow-md shadow-amber-500/20 transition hover:scale-105"
          >
            <Download size={13} />
            <span>Resume</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
