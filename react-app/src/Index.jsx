import './App.css'

function HandleScroll() {
  const scrollDownContainer = document.querySelector('.scroll-down-container');
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  const scrollThreshold = documentHeight - windowHeight - 25;

  if (scrollTop > scrollThreshold) {
      scrollDownContainer.classList.add('hidden');
  } else {
      scrollDownContainer.classList.remove('hidden');
  }
}

function Header() {
  return (
      <header className='header'>
        <div className='container header-container'>
          <div className='logo'><span className='accent'>Unwrapped</span></div>
          <button className='btn btn-primary'>Connect Spotify</button>
        </div>
      </header>
  );
}

function Hero() {
  return (
    <div className="container">
      <div className="hero-content">
        <h1 className="hero-title">
          <span>Your Music,</span> <span className="accent"> Right Here</span>
        </h1>
        <p className="hero-description">Discover your listening habits ad compare with friends. See your top tracks, artists, and genres, all in one place.</p>
        <a href="Data.jsx" className="btn btn-primary">Check Your Stats</a>
      </div>
    </div>
  );
}

function ScrollConatiner() {
  return (
    <div className="scroll-down-container">
      <div className="scroll-down">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

function Features() {
  return (
    <div className="container">
      <div className="features-grid">
        <div className="feature-card">
          <h3>Your Data</h3>
          <p>View your personalized listening stats on Unwrapped.</p>
        </div>
        <div className="feature-card">
          <h3>Compare With Friends</h3>
          <p>See how your music taste matches up with friends.</p>
        </div>
        <div className="feature-card">
          <h3>Time Comparisons</h3>
          <p>Track how your listening habits evolve over time.</p>
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

function Index() {
  // window.addEventListener('scroll', HandleScroll);
  // HandleScroll();
  
  return (
    <>
      <div id="root">
        <Header />
        <main>
          <section className="hero">
            <Hero />
          </section>
          <ScrollConatiner />
          <section id="features" className="features">
            <Features />
          </section>
        </main>
        <Footer />
      </div>

    </>
  )
}

export default Index;
