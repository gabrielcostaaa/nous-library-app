import { Navbar } from "@/components/home/Navbar";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-[1280px] px-4 py-6">
        <Outlet />
      </main>
      <footer className="mt-10 border-t py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Nous Library — Todos os direitos reservados.
      </footer>
    </div>
  );
}