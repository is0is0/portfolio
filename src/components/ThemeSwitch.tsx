"use client";

import { useSyncExternalStore } from "react";
import {
  getServerThemeSnapshot,
  getThemeSnapshot,
  setTheme,
  subscribeTheme,
  THEME_SWITCH_ENABLED,
} from "@/lib/theme";

const switchPosition =
  "fixed top-5 right-8 z-[100] sm:right-12 lg:right-20 xl:right-28";

export function ThemeSwitch() {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  if (!THEME_SWITCH_ENABLED) {
    return null;
  }

  const isLight = theme === "light";
  const toggle = () => setTheme(isLight ? "dark" : "light");

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className={`${switchPosition} border-0 bg-transparent p-1 opacity-40 transition-opacity duration-300 hover:opacity-70`}
    >
      <span
        className="inline-flex h-3.5 w-7 shrink-0 rounded-full bg-line/50 p-0.5"
        aria-hidden
      >
        <span
          className={`block h-2.5 w-2.5 rounded-full transition-transform duration-300 ease-out ${
            isLight ? "translate-x-3 bg-muted" : "translate-x-0 bg-muted/80"
          }`}
        />
      </span>
    </button>
  );
}
