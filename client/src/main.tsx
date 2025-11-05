import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DiscoverPage from './pages/DiscoverPage.tsx';
import AuthLoader from './components/AuthLoader.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import HomePage from './pages/HomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
import CollectionDetailPage from './pages/CollectionDetailPage.tsx';

// FIXED: Set axios defaults
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: '/dashboard',
            element: <DashboardPage />,
          },
          {
            path: '/collection/:id',
            element: <CollectionDetailPage />,
          },
          {
            path: '/discover',
            element: <DiscoverPage />,
          },
        ],
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthLoader>
      <RouterProvider router={router} />
    </AuthLoader>
  </React.StrictMode>
);