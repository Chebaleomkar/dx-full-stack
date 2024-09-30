"use client";
import  React , {useEffect , useState} from "react";
import { useTheme } from "next-themes";
import { Switch } from "../ui/switch"; 
const ModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    setIsDarkMode(theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches));}, [theme]);
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
)};
export default ModeToggle;
