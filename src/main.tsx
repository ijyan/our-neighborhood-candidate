import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
import NotFound from '@/pages/notFound/notFound.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
  </React.StrictMode>,
);
