import { Outlet, useLocation } from 'react-router-dom';
import Home from './pages/Home.tsx';
import { Header } from './components/Header';

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname === '/' ? (
        <Home />
      ) : (
        <>
          <Header />
          <Outlet />
        </>
      )}
    </>
  );
}

export default App;
