import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Themes: 'dark' (default obsidian/neon), 'slate' (deep navy/slate), 'light' (modern clean)
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("portfolio_theme");
      if (saved) return saved;
    } catch {
      // fallback
    }
    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "theme-slate", "theme-light");

    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "slate") {
      root.classList.add("dark", "theme-slate");
    } else {
      root.classList.add("theme-light");
    }

    try {
      localStorage.setItem("portfolio_theme", theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "slate" : prev === "slate" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
