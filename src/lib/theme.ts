export const THEME_SWITCH_ENABLED = true;

export type Theme = "dark" | "light";

export const DEFAULT_THEME: Theme = "dark";

const listeners = new Set<() => void>();

export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(theme);
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Ignore storage failures (private mode, blocked cookies, etc.).
  }
}

export function setTheme(theme: Theme) {
  applyTheme(theme);
  listeners.forEach((listener) => listener());
}

export function subscribeTheme(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getThemeSnapshot(): Theme {
  if (typeof document === "undefined") return DEFAULT_THEME;
  return document.documentElement.classList.contains("light")
    ? "light"
    : "dark";
}

export function getServerThemeSnapshot(): Theme {
  return DEFAULT_THEME;
}

export const themeInitScript = THEME_SWITCH_ENABLED
  ? `(function () {
    try {
      var theme = localStorage.getItem("theme");
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme === "light" ? "light" : "dark");
    } catch (e) {
      document.documentElement.classList.add("dark");
    }
  })();`
  : `(function () {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add("dark");
  })();`;
