"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  MoonIcon, SunIcon
} from "@heroicons/react/24/outline";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className={`w-fit  right-5 top-2 p-2 rounded-full hover:scale-110 active:scale-100 duration-200 bg-primary-200 dark:bg-primary-700`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? <MoonIcon className="w-6 h-6 text-gray-100" /> : <SunIcon className="w-6 h-6 text-white" />}
    </button>
  );
};