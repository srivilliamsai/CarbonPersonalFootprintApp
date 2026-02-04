import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import LandingPage from './LandingPage';
import About from './footer/About';
import Privacy from './footer/Privacy';
import Terms from './footer/Terms';
import FeaturesPage from './footer/FeaturesPage';
import Integrations from './footer/Integrations';
import Pricing from './footer/Pricing';
import API from './footer/API';
import Blog from './footer/Blog';
import Press from './footer/Press';
import Security from './footer/Security';
import CarbonCycleDetail from './CarbonCycleDetail';
import Marketplace from './Marketplace';
import Leaderboard from './Leaderboard';
import SurveyPage from './SurveyPage';

// Helper to ensure pages open at the top
const PageWrapper = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return children;
};

function App() {
  const [view, setView] = useState('landing');
  const [user, setUser] = useState(null);
  const [scrollTarget, setScrollTarget] = useState(null); // 'footer' or null

  const handleLogin = (userData) => {
    setUser(userData);
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing');
    setScrollTarget(null);
  };

  const navigateToFooterPage = (pageName) => {
    setView(pageName);
  };

  const backToFooter = () => {
    setView('landing');
    setScrollTarget('footer');
  };

  return (
    <div>
      {view === 'landing' && (
        <LandingPage
          onGetStarted={() => {
            setView('login');
            setScrollTarget(null);
          }}
          onNavigate={navigateToFooterPage}
          initialScrollSection={scrollTarget}
        />
      )}

      {view === 'login' && <LoginPage onLogin={handleLogin} onBack={() => setView('landing')} />}

      {view === 'dashboard' && user && <Dashboard user={user} onLogout={handleLogout} onNavigate={setView} />}

      {/* Footer Pages - Wrapped to scroll to top */}
      {view === 'about' && <PageWrapper><About onNavigate={setView} /></PageWrapper>}
      {view === 'privacy' && <PageWrapper><Privacy onNavigate={setView} /></PageWrapper>}
      {view === 'terms' && <PageWrapper><Terms onNavigate={setView} /></PageWrapper>}
      {view === 'features' && <PageWrapper><FeaturesPage onNavigate={setView} /></PageWrapper>}
      {view === 'integrations' && <PageWrapper><Integrations onNavigate={setView} /></PageWrapper>}
      {view === 'pricing' && <PageWrapper><Pricing onNavigate={setView} /></PageWrapper>}
      {view === 'api' && <PageWrapper><API onNavigate={setView} /></PageWrapper>}
      {view === 'blog' && <PageWrapper><Blog onNavigate={setView} /></PageWrapper>}
      {view === 'press' && <PageWrapper><Press onNavigate={setView} /></PageWrapper>}
      {view === 'security' && <PageWrapper><Security onNavigate={setView} /></PageWrapper>}

      {/* New Feature Pages */}
      {view === 'marketplace' && <PageWrapper><Marketplace onBack={() => setView('dashboard')} /></PageWrapper>}
      {view === 'leaderboard' && <PageWrapper><Leaderboard onBack={() => setView('dashboard')} /></PageWrapper>}
      {view === 'survey' && <PageWrapper><SurveyPage onComplete={() => setView('dashboard')} /></PageWrapper>}

      {/* Carbon Cycle Details */}
      {view === 'production' && <CarbonCycleDetail topic="production" onBack={() => setView('landing')} />}
      {view === 'impact' && <CarbonCycleDetail topic="impact" onBack={() => setView('landing')} />}
      {view === 'solution' && <CarbonCycleDetail topic="solution" onBack={() => setView('landing')} />}
    </div>
  );
}

export default App;
