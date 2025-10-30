// import { useTheme } from "@/shared/theme/ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

export function Navbar() {
  // const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b bg-card text-card-foreground/90">
      <nav className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary" />
          <span className="font-serif text-xl font-semibold">Nous Library</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {/* Login de usuário comum */}
          <Link to="/login?role=user" className="text-sm hover:opacity-80">Entrar</Link>

          {/* Login administrativo */}
          <Link to="/login?role=admin" className="text-sm hover:opacity-80">Painel Admin</Link>

          {/* <button
            onClick={toggle}
            className="rounded-lg border px-3 py-1 text-sm hover:bg-muted"
            aria-label="Alternar tema"
            title="Alternar tema"
          >
            {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
          </button> */}
        </div>
      </nav>
    </header>
  );
}
