import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DiscoverPage from './pages/DiscoverPage.tsx';
// Import Components
import AuthLoader from './components/AuthLoader.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';

// Import Pages
import HomePage from './pages/HomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
// ... other imports
import CollectionDetailPage from './pages/CollectionDetailPage.tsx'; // <-- 1. Import new page

// Create the router
// Create the router
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Our main layout (with Header)
    children: [
      // --- Protected Routes ---
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true, // This is the default page (HomePage)
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
            path: '/discover', // <-- ADD THIS ROUTE
            element: <DiscoverPage />,
          },
        ],
      },

      // --- Public Route ---
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
]);

// ... rest of the file

// Create the route

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* We wrap the *entire app* in AuthLoader */}
    <AuthLoader>
      <RouterProvider router={router} />
    </AuthLoader>
  </React.StrictMode>
);