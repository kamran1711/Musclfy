import React, { useEffect } from 'react';
import PlayerLayout from './components/PlayerLayout';
import { useAuth } from './context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

import IntroPage from './components/auth/IntroPage';

function App() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      if (!user && location.pathname !== '/intro' && location.pathname !== '/login' && location.pathname !== '/register') {
        navigate('/intro');
      } else if (user && (location.pathname === '/intro' || location.pathname === '/login' || location.pathname === '/register')) {
        navigate('/');
      }
    }
  }, [user, loading, navigate, location]);

  if (loading) {
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
    if (isAuthPage) return <div className="min-h-screen bg-[#050b14]" />; // Don't show intro when already on login/register

    const hasStoredUser = localStorage.getItem('muscifyUser');
    if (hasStoredUser) {
      return <div className="min-h-screen bg-[#050b14]" />;
    }
    return <IntroPage />;
  }

  return <PlayerLayout />;
}

export default App;
