import { createBrowserRouter, redirect } from "react-router-dom";
import { getSession } from "./shared/auth";

import PublicLayout from "./shared/PublicLayout";
import AuthLayout, { authLoader } from "./shared/AuthLayout";

import Home from "./screens/Home";
import Login from "./screens/Login";
import BookCollection from "./screens/BookCollection";
import Loans from "./screens/Loans";
import NotFound from "./screens/NotFound";
import RootLayout from "./shared/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          { index: true, element: <Home /> },
        ],
      },

      {
        path: "login",
        element: <Login />,
      },

      {
        path: "app",
        element: <AuthLayout />,
        loader: authLoader,
        children: [
          {
            index: true,
            loader: () => {
              const s = getSession();
              return redirect(s?.role === "ADMIN" ? "/app/loans" : "/app/books");
            },
          },
          { path: "books", element: <BookCollection /> },
          { path: "loans", element: <Loans /> },
        ],
      },
    ],
  },
]);