import { useTheme } from "@/shared/theme/ThemeProvider";
import { Link } from "react-router-dom";

export function Navbar() {
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b bg-card text-card-foreground/90">
      <nav className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary" />
          <span className="font-serif text-xl font-semibold">Nous Library</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link to="/" className="text-sm hover:opacity-80">Catálogo</Link>
          <Link to="/" className="text-sm hover:opacity-80">Empréstimos</Link>
          <Link to="/login" className="text-sm hover:opacity-80">Admin</Link>
          <button
            onClick={toggle}
            className="rounded-lg border px-3 py-1 text-sm hover:bg-muted"
            aria-label="Alternar tema"
            title="Alternar tema"
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
        </div>
      </nav>
    </header>
  );
}
