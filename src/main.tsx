import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '@/App.tsx';
import '@/index.css';
import Home from '@/pages/Home.tsx';
import Congressperson from '@/pages/policy/Congressperson.tsx';
import CongresspersonDetail from '@/pages/policy/CongresspersonDetail.tsx';
import President from '@/pages/policy/President.tsx';
import PresidentDetail from '@/pages/policy/PresidentDetail.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, path: '/', element: <Home /> },
      {
        path: '/policy/congressperson',
        element: <Congressperson />,
      },
      {
        path: '/policy/congressperson/:jdName',
        element: <CongresspersonDetail />,
      },
      {
        path: '/policy/president',
        element: <President />,
      },
      {
        path: '/policy/president/:jdName',
        element: <PresidentDetail />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
  </React.StrictMode>,
);
