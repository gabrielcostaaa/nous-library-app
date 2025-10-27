import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './shared/RootLayout';
import Home from './screens/Home';
import Login from './screens/Login';
import NotFound from './screens/NotFound';

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
