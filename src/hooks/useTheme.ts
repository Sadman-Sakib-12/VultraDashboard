"use client";

import { useState, useEffect } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("vulota-theme");
    if (stored === "light") setIsDark(false);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove("light");
      localStorage.setItem("vulota-theme", "dark");
    } else {
      html.classList.add("light");
      localStorage.setItem("vulota-theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return { isDark, toggleTheme };
}
