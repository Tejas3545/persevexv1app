"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
    const { theme, setTheme, systemTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button className="p-2 rounded-full bg-muted text-muted-foreground w-9 h-9 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-muted animate-pulse"></div>
            </button>
        );
    }

    const currentTheme = theme === "system" ? systemTheme : theme;

    const toggleTheme = () => {
        setTheme(currentTheme === "dark" ? "light" : "dark");
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-muted text-foreground transition-colors outline-none focus:ring-2 focus:ring-ring"
            aria-label="Toggle theme"
        >
            {currentTheme === "dark" ? (
                <Sun className="h-5 w-5 hover:text-highlight transition-colors" />
            ) : (
                <Moon className="h-5 w-5 hover:text-primary transition-colors" />
            )}
        </button>
    );
}
