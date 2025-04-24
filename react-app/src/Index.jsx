import './App.css'
import ConnectButton from './ConnectButton.jsx'
import { useState, useEffect } from 'react';

function Index() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const scrollThreshold = documentHeight - windowHeight - 200;

      if (scrollTop > scrollThreshold) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function Header() {
    const [profileName, setProfileName] = useState("");
    useEffect(() => {
      setProfileName(sessionStorage.getItem("spotify_name"));
    }, []);

    return (
      <header className='header'>
        <div className='container header-container'>
          <div className='logo'><span className='accent'>Unwrapped</span></div>
          {profileName ? (
            <div className="header-greeting">
              <span>Hello, </span>
              <span> {profileName}</span>
            </div>
          ) : (
            <ConnectButton />
          )}
        </div>
      </header>
    );
  }

  function ScrollIndicator() {
    return (
      <div className={`scroll-down-container ${!isVisible ? 'fade-out' : ''}`}>
        <div className="scroll-down">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  function Hero() {
    return (
      <section className="hero bg-black flex items-center justify-center">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-extrabold hero-spacing">
            <span>Your Music,</span> <span className="accent">Right Here</span>
          </h1>
          <p className="text-lg text-gray-400 hero-spacing">
            Discover your listening habits and compare with friends. See your top tracks, artists, and genres, all in one place.
          </p>
          <a href="Data.jsx" className="btn btn-primary bg-[#1DB954] text-black px-8 py-3 rounded-lg shadow-lg hover:shadow-xl">
            Check Your Stats
          </a>
        </div>
      </section>
    );
  }

  function Features() {
    return (
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="feature-card bg-[#0e0e0e] rounded-lg flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_0_35px_#1DB954]">
            <h3 className="text-xl font-semibold mb-3">Your Data</h3>
            <p className="text-gray-400">View your personalized listening stats on Unwrapped.</p>
          </div>
          <div className="feature-card bg-[#0e0e0e] rounded-lg flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_0_35px_#1DB954]">
            <h3 className="text-xl font-semibold mb-3">Compare With Friends</h3>
            <p className="text-gray-400">See how your music taste matches up with friends.</p>
          </div>
          <div className="feature-card bg-[#0e0e0e] rounded-lg flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_0_35px_#1DB954]">
            <h3 className="text-xl font-semibold mb-3">Time Comparisons</h3>
            <p className="text-gray-400">Track how your listening habits evolve over time.</p>
          </div>
        </div>
      </div>
    );
  }

  function Footer() {
    return (
      <footer id="about" className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="logo"><span className="accent">Unwrapped</span></div>
            <p className="copyright">&copy; <span id="current-year">2025</span> Unwrapped. Not affiliated with Spotify.</p>          
          </div>
        </div>
      </footer>
    );
  }
  return (
    <div id="root">
      <Header />
      <main>
        <section className="hero">
          <Hero />
        </section>
        <ScrollIndicator />
        <section id="features" className="features">
          <Features />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Index;