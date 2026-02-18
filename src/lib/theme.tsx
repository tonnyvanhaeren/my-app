// src/lib/theme.tsx
import * as React from "react";

type Theme = "light" | "dark";
type ThemeCtx = {
  theme: Theme;
  setTheme: (t: Theme) => void;
};

const ThemeContext = React.createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    return (stored as Theme) || "light";
  });

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const setTheme = (t: Theme) => setThemeState(t);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
