import React, { useState } from "react";
import { Link } from "react-scroll";
import { useConfig } from "@/context/ConfigContext";
import { Menu, X } from "lucide-react";

const Header = () => {
  const { config, loading } = useConfig();
  const [isOpen, setIsOpen] = useState(false);

  if (loading || !config.navigation) {
    return null;
  }

  const navItems = config.navigation.navItems;

  return (
    <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-md border-b border-white/10 shadow-lg">
      {/* ===== Mobile / Tablet View Header ===== */}
      <div className="xl:hidden px-5 py-4 flex justify-between items-center">
        <div className="text-amber-400 font-bold text-lg tracking-wider">
          {config.sidebar?.name || "VIVEK PANDEY"}
        </div>
        <button
          className="text-white focus:outline-none p-1 rounded-md hover:bg-white/10 transition"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="xl:hidden px-5 py-4 flex flex-col gap-2 border-t border-white/10 bg-black/95">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              smooth={true}
              duration={500}
              offset={-70}
              spy={true}
              activeClass="active"
              onClick={() => setIsOpen(false)}
              className={`
                text-sm px-4 py-2.5 rounded-lg cursor-pointer transition font-medium
                text-gray-300 hover:bg-white/10 hover:text-white
                [&.active]:bg-amber-400/20 [&.active]:text-amber-300 [&.active]:font-semibold
              `}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      {/* ===== Desktop View Header ===== */}
      <div className="hidden xl:flex max-w-7xl mx-auto justify-between items-center px-8 py-3.5">
        <div className="text-amber-400 font-bold text-xl tracking-wider">
          {config.sidebar?.name || "VIVEK PANDEY"}
        </div>
        <nav className="flex items-center gap-2">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              smooth={true}
              duration={500}
              offset={-80}
              spy={true}
              activeClass="active"
              className={`
                px-5 py-2 text-sm transition-all duration-200 cursor-pointer rounded-lg font-medium
                text-gray-300 hover:bg-white/10 hover:text-white
                [&.active]:bg-amber-400/20 [&.active]:text-amber-300 [&.active]:border [&.active]:border-amber-400/40 [&.active]:font-semibold
              `}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
