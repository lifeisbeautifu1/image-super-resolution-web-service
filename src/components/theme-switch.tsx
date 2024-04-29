import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

import { useEffect, useState } from "react";

import { getColorPreference, setPreference } from "../utils";

export const ThemeSwitch = () => {
  const [theme, setTheme] = useState(getColorPreference());

  const toggleTheme = () => {
    setTheme((theme) => (theme === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    setPreference(theme);
  }, [theme]);

  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", ({ matches: isDark }) => {
        setTheme(isDark ? "dark" : "light");
      });
  }, []);

  return (
    <button
      title="Toggles light & dark"
      aria-label={theme}
      aria-live="polite"
      id="theme-toggle"
      onClick={toggleTheme}
      className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-600 w-12 h-12 flex items-center justify-center rounded-full outline-offset-5 transition-transform active:scale-90"
    >
      {theme === "dark" ? (
        <SunIcon className="w-[32px] h-[32px]" />
      ) : (
        <MoonIcon className="w-[28px] h-[28px]" />
      )}
    </button>
  );
};
