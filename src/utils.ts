type Theme = "dark" | "light";

const storageKey = "theme-preference";

export const getColorPreference = (): Theme => {
  if (localStorage.getItem(storageKey))
    return localStorage.getItem(storageKey) as Theme;
  else
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
};

export const setPreference = (theme: Theme) => {
  localStorage.setItem(storageKey, theme);

  reflectPreference(theme);
};

export const reflectPreference = (theme: Theme) => {
  if (
    theme === "dark" &&
    !document.documentElement.classList.contains("dark")
  ) {
    document.documentElement.classList.add("dark");
  } else if (
    theme === "light" &&
    document.documentElement.classList.contains("dark")
  ) {
    document.documentElement.classList.remove("dark");
  }
};
