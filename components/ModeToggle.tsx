"use client";

import * as React from "react";
import { SunMedium, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch"; // ShadCN Switch component

const ModeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  // Sync state with the current theme
  React.useEffect(() => {
    setIsDarkMode(theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches));
  }, [theme]);

  // Handle theme change
  const handleThemeChange = (checked: boolean) => {
    setIsDarkMode(checked);
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={isDarkMode}
        onCheckedChange={handleThemeChange}
      />
    </div>
  );
};

export default ModeToggle;
