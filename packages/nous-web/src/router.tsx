import { createBrowserRouter, redirect } from "react-router-dom";
import RootLayout from "./shared/RootLayout";
import NotFound from "./screens/NotFound";
import Home from "./screens/Home";
import Login from "./screens/Login";
import BookCollection from "./screens/BookCollection";

import AppLayout, { authedLayoutLoader } from "./shared/AppLayout";
import { getSession } from "./shared/auth";
import Loans from "./screens/Loans";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [{ index: true, element: <Home /> }],
  },
  { path: "/login", element: <Login /> },

  {
    path: "/app",
    element: <AppLayout />,
    loader: authedLayoutLoader,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        loader: async () => {
          const s = getSession();
          if (!s) throw redirect("/login");
          throw redirect(s.role === "ADMIN" ? "/app/loans" : "/app/books");
        },
      },
      { path: "books", element: <BookCollection /> },
      { path: "loans", element: <Loans /> },
    ],
  },

  { path: "/books", element: <BookCollection /> },
]);
