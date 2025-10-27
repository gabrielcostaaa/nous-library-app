import { Link, Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className="min-h-svh flex flex-col">
      <header className="border-b bg-white">
        <nav className="mx-auto max-w-5xl px-4 h-12 flex items-center gap-4">
          <Link to="/" className="font-semibold">Biblioteca</Link>
          <div className="ml-auto flex items-center gap-3 text-sm">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 w-full">
        <Outlet />
      </main>
    </div>
  );
}
