import './App.css'
import ConnectButton from './ConnectButton.jsx'
import { useState, useEffect } from 'react';
import ScrollReveal from 'scrollreveal';

function Index() {
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(sessionStorage.getItem("loading") === "true");

  useEffect(() => {
    const interval = setInterval(() => {
      const current = sessionStorage.getItem("loading") === "true";
      setIsLoading(current);
    }, 250); // poll every 250ms

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {

    let hasActivated = false;

    const handleScroll = () => {
      if (hasActivated) return; 

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const scrollThreshold = documentHeight - windowHeight - 200;

      if (scrollTop > scrollThreshold) {
        setIsVisible(false);
        hasActivated = true;
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
          <div className='logo'><span className='accent font-extrabold'>Unwrapped</span></div>
          {profileName ? (
            <div className="text-2xl font-bold text-white flex items-center gap-2">
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

    useEffect(() => {
      ScrollReveal().reveal('#title1', {
        duration: 2000,
        origin: 'left',
        distance: '50px',
        reset: false,
      });
  
      ScrollReveal().reveal('.large', {
        duration: 6000,
        origin: 'right',
        delay: 200,
        distance: '30px',
        easing: 'ease-in-out',
        reset: false,
      });

      ScrollReveal().reveal('#desc', {
        duration: 3000,
        origin: 'bottom',
        delay: 200,
        distance: '30px',
        easing: 'ease-in-out',
        reset: false,
      });
    }, []); 

    return (
      <section className="hero bg-black flex items-center justify-center min-h-[75vh]">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-7xl font-extrabold leading-tight tracking-tight mb-8">
            <span id='title1'>Your Music,</span> <span className="accent large">Right Here</span>
          </h1>
          <p id='desc' className="text-xl text-gray-400 mb-8 max-w-xl mx-auto">
            Discover your listening habits and compare with friends. See your top tracks, artists, and genres, all in one place.
          </p>
          <a
            href="Data.jsx"
            className="btn btn-primary bg-[#1DB954] text-black px-2.5 py-2.5 rounded-xl shadow-lg hover:shadow-xl font-bold"
          >
            Check Your Stats
          </a>
        </div>
      </section>
    );
  }

  function Features() {

    useEffect(() => {
      ScrollReveal().reveal('#card', {
        duration: 4000,
        origin: 'bottom',
        distance: '50px',
        reset: false,
      });
  
      ScrollReveal().reveal('.large', {
        duration: 6000,
        origin: 'right',
        delay: 200,
        distance: '30px',
        easing: 'ease-in-out',
        reset: false,
      });
    }, []); 

    return (
      <div className="container mx-auto">
        <div id='card' className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            <div className="logo"><span className="accent font-extrabold">Unwrapped</span></div>
            <p className="copyright">&copy; <span id="current-year">2025</span> Unwrapped. Not affiliated with Spotify.</p>          
          </div>
        </div>
      </footer>
    );
  }
  return (
    <div id="root">
      {isLoading ? (
        <div className="loading-overlay">
          <div className="loading-content">
            <p>Loading your Spotify data…</p>
          </div>
        </div>
      ) : (
        <>
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
        </>
      )}
      </div>
  );  
}

export default Index;