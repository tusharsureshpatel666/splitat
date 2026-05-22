"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <DropdownMenuItem
      onClick={toggleTheme}
      className="flex items-center gap-2 hover:bg-accent hover:text-accent-foreground cursor-pointer"
    >
      {/* Icons */}
      <div className="relative h-4 w-4">
        <Sun className="absolute h-4 w-4 rotate-0 scale-100 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </div>

      <span>Theme</span>
    </DropdownMenuItem>
  );
}
