 import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Import our layout and all pages
import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import CreatePostPage from './pages/CreatePostPage.jsx'; // The new page
import { AuthProvider } from './context/AuthProvider.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // The root layout component
    children: [ // All pages are rendered inside the App component's <Outlet />
      {
        index: true, // This makes HomePage the default page for the "/" path
        element: <HomePage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'create-post', // The route for our new page
        element: <CreatePostPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);