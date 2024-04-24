import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '@/App.tsx';
import '@/index.css';
import Policy from '@/pages/Policy.tsx';
import Home from '@/pages/Home.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, path: '/', element: <Home /> },
      {
        path: '/policy/congressperson',
        element: <Policy />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider
      router={router}
      fallbackElement={<div>Loading...</div>} //
    />
  </React.StrictMode>,
);
