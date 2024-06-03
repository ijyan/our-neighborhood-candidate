import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from '@/App.tsx';
import '@/index.css';
import Home from '@/pages/Home.tsx';
// policy
import PolicyParliamentary from '@/pages/policy/Parliamentary.tsx';
import PolicyParliamentaryDetail from '@/pages/policy/ParliamentaryDetail.tsx';
import PolicyPresidential from '@/pages/policy/Presidential.tsx';
import PolicyPresidentialDetail from '@/pages/policy/PresidentialDetail.tsx';
// elections
import ElectionsParliamentary from '@/pages/elections/Parliamentary.tsx';
import ElectionsParliamentaryDetail from '@/pages/elections/ParliamentaryDetail.tsx';
import ElectionPresidential from '@/pages/elections/Presidential.tsx';
import ElectionPresidentialDetail from '@/pages/elections/PresidentialDetail.tsx';
// notFound
// import NotFound from '@/pages/notFound/notFound.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <HelmetProvider>
        <App />
      </HelmetProvider>
    ),
    // errorElement: <NotFound />,
    children: [
      { index: true, path: '/', element: <Home /> },
      {
        path: '/policy/parliamentary/22',
        element: <PolicyParliamentary />,
      },
      {
        path: '/policy/parliamentary/22/:jdName',
        element: <PolicyParliamentaryDetail />,
      },
      {
        path: '/policy/presidential/20',
        element: <PolicyPresidential />,
      },
      {
        path: '/policy/presidential/20/:jdName',
        element: <PolicyPresidentialDetail />,
      },
      {
        path: '/elections/parliamentary/22',
        element: <ElectionsParliamentary />,
      },
      {
        path: '/elections/parliamentary/22/:huboid',
        element: <ElectionsParliamentaryDetail />,
      },
      {
        path: '/elections/presidential/20',
        element: <ElectionPresidential />,
      },
      {
        path: '/elections/presidential/20/:huboid',
        element: <ElectionPresidentialDetail />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
  </React.StrictMode>,
);
