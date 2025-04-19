import './App.css';
import { useEffect } from 'react';
import mockTopArtists from './mockdata/mockTopArtists.json';

function Header() {
    return (
        <header className='header'>
          <div className='container header-container'>
            <div className='logo'><span className='accent'>Unwrapped</span></div>
          </div>
        </header>
    );
}

function StatsHeader() {
    return (
        <div class="stats-header">
              <h1>Your <span class="stats accent">Listening Stats</span></h1>
              <p>Based on your Spotify activity over the last</p>
              <div class="duration">
                <button class="stats-length">4 Weeks</button>
                <button class="stats-length">6 Months</button>
                <button class="stats-length active">2024</button>
              </div>
        </div>
    );
}

function StatsTracks() {
    const tracks = [1, 2, 3, 4, 5];
    return (
        <div class="stats-card tracks">
            <h3>Top Tracks</h3>
            <div class="track-list">
                {tracks.map((_, i) => (
                    <div class="track-item" key={i}>
                        <div class="track-rank">{i+1}</div>
                        <div class="track-img"></div>
                        <div class="track-info">
                            <div class="track-name">Song</div>
                            <div class="track-artist">Artist</div>
                        </div>  
                    </div>
                ))}
            </div>
        </div>
    );
}

function StatsArtists() {
    const artists = [1, 2, 3, 4, 5];
    return (
        <div class="stats-card artist">
            <h3>Top Artists</h3>
            <div class="artist-list">
                {artists.map((_, i) => (
                    <div class="artist-item" key={i}>
                        <div class="artist-rank">{i+1}</div>
                        <div class="artist-img"></div>
                        <div class="artist-info">Name</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function StatsGenre() {
    const genreBar = [85, 67, 52, 43, 31];
    return (
        <div class="stats-card genre">
            <h3>Top Genres</h3>
            <div class="genre-list">
                {genreBar.map((percentage, i) => (
                    <div class="genre-item" key={i}>
                        <div class="genre-label">Genre</div>
                        <div class="genre-bar">
                            <div class="genre-fill" style={{width: `${percentage}%`}}></div>
                        </div> 
                    </div>
                ))}
            </div>
        </div>
    );
}

function FriendsContainer() {
    return (
        <div class="friends-button-container">
            <button id="view-friends-btn" class="btn btn-outline">See Friends' Stats</button>
        </div>
    )
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

function Data() {

        useEffect(() => {
            // Set the current year in footer
            const currentYear = document.getElementById("current-year");
            if (currentYear) {
            currentYear.textContent = new Date().getFullYear();
            }

            // Toggle friends section visibility
            const viewFriendsBtn = document.getElementById("view-friends-btn");
            if (viewFriendsBtn) {
            viewFriendsBtn.addEventListener("click", () => {
                const friendsSection = document.getElementById("friends-stats");
                if (!friendsSection) return;

                friendsSection.classList.remove("hidden");
                friendsSection.scrollIntoView({ behavior: "smooth" });

                // Friend Tabs
                const friendTabs = friendsSection.querySelectorAll(".friend-tab");
                const friendStats = friendsSection.querySelectorAll(".friend-stats");

                friendTabs.forEach((tab) => {
                tab.addEventListener("click", () => {
                    friendTabs.forEach((t) => t.classList.remove("active"));
                    tab.classList.add("active");
                    friendStats.forEach((stat) => stat.classList.add("hidden"));
                    const friendId = tab.getAttribute("data-friend");
                    const target = friendsSection.querySelector(`.friend-stats[data-friend="${friendId}"]`);
                    if (target) target.classList.remove("hidden");
                });
                });

                // Duration Tabs for Friends
                const durationTabsFriends = friendsSection.querySelectorAll(".stats-length-friends");
                durationTabsFriends.forEach((tab) => {
                tab.addEventListener("click", () => {
                    durationTabsFriends.forEach((t) => t.classList.remove("active"));
                    tab.classList.add("active");
                });
                });
            });
            }

            // Duration tabs for your stats (main section)
            const durationTabs = document.querySelectorAll(".stats-length");
            durationTabs.forEach((tab) => {
            tab.addEventListener("click", () => {
                durationTabs.forEach((t) => t.classList.remove("active"));
                tab.classList.add("active");
            });
            });
        }, []);
        

    return (
      <>
        <div id="root">
          <Header />
          <main>
            <section className="stats-section">
              <div className="container">
                <StatsHeader />
                <div className="stats-grid">
                    <StatsTracks />
                    <StatsArtists />
                    <StatsGenre />
                </div>
                <FriendsContainer />
              </div>
            </section>
            <section id="features" className="features">
            </section>
          </main>
            <Footer />
        </div>
  
      </>
    )
  }
  
  export default Data;