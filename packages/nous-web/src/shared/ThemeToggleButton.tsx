import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

function getInitial(): "light" | "dark" {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggleButton() {
  const [mode, setMode] = useState<"light" | "dark">(getInitial);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
    localStorage.setItem("theme", mode);
  }, [mode]);

  return (
    <button
      type="button"
      onClick={() => setMode(mode === "dark" ? "light" : "dark")}
      className="inline-flex h-9 items-center gap-2 rounded-md border px-3 text-sm hover:bg-muted"
      aria-label="Alternar tema"
      title="Alternar tema"
    >
      {mode === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}
