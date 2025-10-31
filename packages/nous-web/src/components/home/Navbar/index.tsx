import { ThemeToggleButton } from "@/shared/ThemeToggleButton";
import { Link } from "react-router-dom";

export function Navbar() {

  return (
    <header className="sticky top-0 z-50 border-b bg-card text-card-foreground/90">
      <nav className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <img
              src={`${import.meta.env.BASE_URL}icon.png`}
              alt="Nous Library"
              className="h-10 w-10 rounded-2xl"
            />
            <span className="font-semibold text-primary">Nous Library</span>
          </div>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link to="/login?role=user" className="text-sm hover:opacity-60 font-semibold text-primary">Entrar</Link>
          <Link to="/login?role=admin" className="text-sm hover:opacity-60">Painel Admin</Link>
          <ThemeToggleButton />
        </div>
      </nav>
    </header>
  );
}
