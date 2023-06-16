import React, { createContext, useMemo, useState } from "react";
import useCustomEffect from "../hooks/useCustomEffect.hook";

  export const ThemeContext = createContext({
    theme: "default",
    setTheme: () => {},
  });

/**
 * Theme Context Provider.
 *
 * @param value string
 * @param children ReactNode
 * @returns ReactNode
 */
export const ThemeContextProvider = ({
    value = "default",
    children,
  }) => {
    const [theme, setTheme] = useState(value);

    useCustomEffect(() => {
        const storeTheme = localStorage.getItem("theme");
        applyTheme(storeTheme || "default");
    }, []);

/**
   * Apply theme to 'html' tag on DOM.
   */
  const applyTheme = (theme = "default") => {
    let newTheme = theme;
    const html = document.getElementsByTagName("html")[0];
    localStorage.setItem("theme", theme);
    (html).setAttribute("data-theme", newTheme);
  };

  const handleThemeChange = (theme) => {
    setTheme(theme);
    applyTheme(theme);
  };

  /**
   * Current context value for theme.
   */
  const val = useMemo(
    () => ({
      theme,
      setTheme: handleThemeChange,
    }),
    [theme]
  );

  return <ThemeContext.Provider value={val}>{children}</ThemeContext.Provider>;
};