import { useState, useEffect } from "react";
import theme, { ThemeMode } from "@styles/theme";

const useDarkMode = () => {
  const getInitialThemeMode = (): ThemeMode => {
    const savedTheme = localStorage.getItem("theme") as ThemeMode;
    return savedTheme || "light";
  };

  const [themeMode, setThemeMode] = useState<ThemeMode>(getInitialThemeMode());
  const [transition, setTransition] = useState(false);

  useEffect(() => {
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setTransition(true);
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const timer = setTimeout(() => setTransition(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const currentTheme = {
    ...theme[themeMode],
    transition,
  };

  const isDarkMode = themeMode === "dark";

  return {
    currentTheme,
    toggleTheme,
    isDarkMode,
    themeMode,
  };
};

export default useDarkMode;
