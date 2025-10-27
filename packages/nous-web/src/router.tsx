import { createBrowserRouter } from 'react-router-dom';
import Login from './modules/admin/screens/Login';
import RootLayout from './shared/RootLayout';
import NotFound from './screens/NotFound';
import Home from './screens/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
    ],
  },
]);
