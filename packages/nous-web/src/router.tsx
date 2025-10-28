import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './shared/RootLayout';
import NotFound from './screens/NotFound';
import Home from './screens/Home';
import Login from './screens/Login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);
