import React, { createContext, useContext, useEffect, useState } from "react";

const ConfigContext = createContext();

export const useConfig = () => useContext(ConfigContext);

const fetchConfig = async (filename) => {
  const url = `https://raw.githubusercontent.com/VP171097/portfolio-config/main/${filename}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${filename}`);
  return await res.json();
};

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState({});
  const [loading, setLoading] = useState(true);

  const configFiles = [
    "about.json",
    "skills.json",
    "experience.json",
    "education.json",
    "landing.json",
    "sidebar.json",
    "navigation.json",
    "socialLinks.json",
  ];

  useEffect(() => {
    const loadAll = async () => {
      try {
        const results = {};
        for (const file of configFiles) {
          const key = file.replace(".json", "");
          results[key] = await fetchConfig(file);
        }
        setConfig(results);
        setLoading(false);
      } catch (err) {
        console.error("Error loading config:", err);
      }
    };
    loadAll();
  }, []);

  return (
    <ConfigContext.Provider value={{ config, loading }}>
      {children}
    </ConfigContext.Provider>
  );
};
