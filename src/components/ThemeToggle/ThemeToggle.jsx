import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <FiMoon className="text-xl" />
      ) : (
        <FiSun className="text-xl text-yellow-400" />
      )}
    </motion.button>
  );
};

export default ThemeToggle;
