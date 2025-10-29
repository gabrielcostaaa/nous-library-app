// src/shared/AppLayout.tsx
import { NavLink, Outlet, useLoaderData, redirect } from "react-router-dom";
import { getSession } from "@/shared/auth";
import type { Session } from "@/shared/auth";
import { ThemeProvider } from "@/shared/theme/ThemeProvider"; // ⬅️ adicione isto
import { ThemeToggleButton } from "@/shared/ThemeToggleButton";
import { Book, LibraryBig } from "lucide-react";

const UserAvatar = ({ initial }: { initial: string }) => (
  <div className="grid h-8 w-8 place-items-center rounded-full bg-muted text-sm font-semibold">
    {initial}
  </div>
);

export async function authedLayoutLoader() {
  const s = getSession();
  if (!s) throw redirect("/login");
  return s;
}

function navClass(isActive: boolean) {
  return [
    "flex items-center gap-2 rounded-md px-3 py-2 text-sm",
    isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground",
  ].join(" ");
}

export default function AppLayout() {
  const session = useLoaderData() as Session;
  const initial = (session.name?.trim()?.[0] || "U").toUpperCase();

  return (
    <ThemeProvider>{/* ⬅️ agora o layout privado também tem tema */}
      <div className="min-h-dvh bg-background text-foreground">
        <header className="border-b">
          <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <LibraryBig className="h-5 w-5 text-primary" />
              <span className="font-semibold">Nous Library</span>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggleButton />
              <div className="flex items-center gap-2 rounded-md border px-2 py-1">
                <UserAvatar initial={initial} />
                <span className="text-sm">{session.name}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-[1280px] grid-cols-[220px_1fr] gap-6 px-4 py-6">
          <aside className="sticky top-4 h-fit rounded-lg border bg-card p-3">
            <nav className="flex flex-col gap-1">
              <NavLink to="/app/books" className={({ isActive }) => navClass(isActive)}>
                <Book className="h-4 w-4" />
                Acervo
              </NavLink>
              <NavLink to="/app/loans" className={({ isActive }) => navClass(isActive)}>
                <LibraryBig className="h-4 w-4" />
                Empréstimos
              </NavLink>
            </nav>
          </aside>

          <main className="min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
