import { useEffect, useState } from "react";
import Button from "../button/Button";
import { LuSunMedium } from "react-icons/lu";
import { FiMoon } from "react-icons/fi";
const ThemeSwitcher = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <Button
      onClick={toggleTheme}
      isIconOnly
      variant="text"
      className="self-end"
       ariaLabel={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <LuSunMedium className="text-xl" />
      ) : (
        <FiMoon className="text-xl" />
      )}
    </Button>
  );
};

export default ThemeSwitcher;
