import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Musicfy.css';

const IntroPage = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Small delay to trigger entry animations
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    navigate('/login');
  };

  return (
    <div className="intro-container">
      <div className={`intro-content ${isLoaded ? 'visible' : ''}`} onClick={handleStart}>
        <div className="logo-wrapper">
          <div className="logo-glow"></div>
          <img 
            src="/logo_premium.png" 
            alt="Musicfy Logo" 
            className="intro-logo"
          />
        </div>
        
        <div className="text-content">
          <h1 className="intro-title">Musicfy</h1>
          <p className="intro-subtitle">Tap to enter the world of immersive sound</p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .intro-container {
          min-height: 100vh;
          width: 100%;
          background: radial-gradient(circle at center, #0a192f 0%, #050b14 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          cursor: pointer;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 9999;
        }

        .intro-content {
          text-align: center;
          opacity: 0;
          transform: scale(0.9);
          transition: all 1.5s cubic-bezier(0.2, 0.8, 0.2, 1);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .intro-content.visible {
          opacity: 1;
          transform: scale(1);
        }

        .logo-wrapper {
          position: relative;
          width: 280px;
          height: 280px;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .intro-logo {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 0 40px rgba(0, 255, 255, 0.4));
          animation: float 6s ease-in-out infinite;
          position: relative;
          z-index: 2;
        }

        .logo-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 180%;
          height: 180%;
          background: radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%);
          animation: pulse 4s ease-in-out infinite;
          z-index: 1;
        }

        .text-content {
          margin-top: 1rem;
        }

        .intro-title {
          font-family: 'Inter', sans-serif;
          font-size: 4.5rem;
          font-weight: 800;
          letter-spacing: 0.8rem;
          background: linear-gradient(to right, #00ffff, #0080ff, #00ffff);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          animation: shine 4s linear infinite;
        }

        .intro-subtitle {
          color: rgba(255, 255, 255, 0.4);
          font-size: 1rem;
          letter-spacing: 0.3rem;
          font-weight: 300;
          text-transform: uppercase;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(2deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(0.9); }
          50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); }
        }

        @keyframes shine {
          to { background-position: 200% center; }
        }
      `}} />
    </div>
  );
};

export default IntroPage;
