import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./theme/ThemeProvider";
import { Toaster } from "sonner";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Outlet />
      <Toaster richColors position="bottom-right" />
    </ThemeProvider>
  );
}