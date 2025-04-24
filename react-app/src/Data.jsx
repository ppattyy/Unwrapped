import './App.css';
import { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";
import { Link } from 'react-router-dom';
import mockTopArtists from './mockdata/mockTopArtists.json';

const supabase = createClient("https://ohvjoekcangwhrpwqcpw.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9odmpvZWtjYW5nd2hycHdxY3B3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxOTE0NzcsImV4cCI6MjA1ODc2NzQ3N30.NSkMSsN3lH0Bmgu6kuCinn0B7kY0L460D3Af142CEzc");

const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
const { data: { user }, error: userError } = await supabase.auth.getUser();



function Header() {
    return (
        <header className='header'>
          <div className='container header-container'>
            <div className='logo'>
              <Link to="/home" className='accent'>Unwrapped</Link>
            </div>
          </div>
        </header>
    );
}

function StatsHeader() {
    return (
        <div className="stats-header">
              <h1 className='font-extrabold text-5xl mb-4'>Your <span className="stats accent">Listening Stats</span></h1>
              <p>Based on your Spotify activity over the last...</p>
              <div className="duration">
                <button className="stats-length mx-1">4 Weeks</button>
                <button className="stats-length mx-1">6 Months</button>
                <button className="stats-length active mx-1">2024</button>
              </div>
        </div>
    );
}

function StatsTracks({currDuration, profile}) {
    const [topTracks, setTopTracks] = useState([]); 
    useEffect(() => {
        getTopTracks();
      }, [currDuration]);

      async function getTopTracks() {
        setTopTracks(profile.top_tracks[currDuration].items);
      }

    return (
        <div className="stats-card tracks">
            <h3>Top Tracks</h3>
            <div className="track-list">
                {topTracks.map((track, i) => (
                    <a href={track.uri}>
                    <div className="track-item" key={i}>
                        <div className="track-rank">{i+1}</div>
                        <img src={track.album.images[2].url} className="track-img"></img>
                        <div className="track-info">
                            <div className="track-name">{track.name}</div>
                            <div className="track-artist">{track.artists[0].name}</div>
                        </div>  
                    </div>
                    </a>
                ))}
            </div>
        </div>
    );
}

function StatsArtists({currDuration, profile}) {
    const [topArtists, setTopArtists] = useState([]);
    useEffect(() => {
        getTopArtists();
      }, [currDuration]);

      async function getTopArtists() {
        setTopArtists(profile.top_artists[currDuration].items);
      }

    return (
        <div className="stats-card artist">
            <h3>Top Artists</h3>
            <div className="artist-list">
                {topArtists.map((artist, i) => (
                    <a href={artist.uri}>
                    <div className="artist-item" key={i}>
                        <div className="artist-rank">{i+1}</div>
                        <img src={artist.images[2].url} className="artist-img"></img>
                        <div className="artist-info">{artist.name}</div>
                    </div>
                    </a>
                ))}
            </div>
        </div>
    );
}

function StatsGenre() {
    const genreBar = [85, 67, 52, 43, 31];
    return (
        <div className="stats-card genre">
            <h3>Top Genres</h3>
            <div className="genre-list">
                {genreBar.map((percentage, i) => (
                    <div className="genre-item" key={i}>
                        <div className="genre-label">Genre</div>
                        <div className="genre-bar">
                            <div className="genre-fill" style={{width: `${percentage}%`}}></div>
                        </div> 
                    </div>
                ))}
            </div>
        </div>
    );
}

function FriendsContainer() {
    return (
        <div className="friends-button-container">
            <button id="view-friends-btn" className="btn btn-outline">See Friends' Stats</button>
        </div>
    )
}

function FriendsStats() {
    return (
        <div className="stats-header">
            <h2><span className="accent text-4xl font-bold">Your Friends' Stats</span></h2>
            <div className="mt-4 mb-4">
                <button className="stats-length-friends mx-1">4 Weeks</button>
                <button className="stats-length-friends mx-1">6 Months</button>
                <button className="stats-length-friends active">2024</button>
            </div>
        </div>
    );
}

function FriendSelector() {
    return (
        <div className="friend-selector">
            <button className="friend-tab active" data-friend="nathan">Nathan</button>
            <button className="friend-tab" data-friend="elijah">Elijah</button>
        </div>
    );
}

function NathanTracks({currDurationFriend, profile}) {
    const [topTracks, setTopTracks] = useState([]); 
    useEffect(() => {
        getTopTracks();
      }, [currDurationFriend]);

      async function getTopTracks() {
        setTopTracks(profile.top_tracks[currDurationFriend].items);
      }

    return (
        <div className="stats-card tracks">
            <h3>Top Tracks</h3>
            <div className="track-list">
                {topTracks.map((track, i) => (
                    <a href={track.uri}>
                    <div className="track-item" key={i}>
                        <div className="track-rank">{i+1}</div>
                        <img src={track.album.images[2].url} className="track-img"></img>
                        <div className="track-info">
                            <div className="track-name">{track.name}</div>
                            <div className="track-artist">{track.artists[0].name}</div>
                        </div>  
                    </div>
                    </a>
                ))}
            </div>
        </div>
    );
}

function NathanArtists({currDurationFriend, profile}) {
    const [topArtists, setTopArtists] = useState([]);
    useEffect(() => {
        getTopArtists();
      }, [currDurationFriend]);

      async function getTopArtists() {
        setTopArtists(profile.top_artists[currDurationFriend].items);
      }

    return (
        <div className="stats-card artist">
            <h3>Top Artists</h3>
            <div className="artist-list">
                {topArtists.map((artist, i) => (
                    <a href={artist.uri}>
                    <div className="artist-item" key={i}>
                        <div className="artist-rank">{i+1}</div>
                        <img src={artist.images[2].url} className="artist-img"></img>
                        <div className="artist-info">{artist.name}</div>
                    </div>
                    </a>
                ))}
            </div>
        </div>
    );
}

function NathanGenre() {
    const genreBar = [85, 67, 52, 43, 31];
    return (
        <div className="stats-card">
            <h3>Top Genres</h3>
            <div className="genre-list">
                {genreBar.map((percentage, i) => (
                    <div className="genre-item" key={i}>
                        <div className="genre-label">Genre</div>
                        <div className="genre-bar">
                            <div className="genre-fill" style={{width: `${percentage}%`}}></div>
                        </div> 
                    </div>
                ))}
            </div>
        </div>
    );
}

function ElijahTracks() {
    const tracks = [1, 2, 3, 4, 5];
    return (
        <div className="stats-card">
            <h3>Top Tracks</h3>
            <div className="track-list">
                {tracks.map((_, i) => (
                    <div className="track-item" key={i}>
                        <div className="track-rank">{i+1}</div>
                        <div className="track-img"></div>
                        <div className="track-info">
                            <div className="track-name">Song</div>
                            <div className="track-artist">Artist</div>
                        </div>  
                    </div>
                ))}
            </div>
        </div>
    );
}

function ElijahArtists() {
    const artists = [1, 2, 3, 4, 5];
    return (
        <div className="stats-card">
            <h3>Top Artists</h3>
            <div className="artist-list">
                {artists.map((_, i) => (
                    <div className="artist-item" key={i}>
                        <div className="artist-rank">{i+1}</div>
                        <div className="artist-img"></div>
                        <div className="artist-info">Name</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ElijahGenre() {
    const genreBar = [90, 78, 44, 22, 9];
    return (
        <div className="stats-card">
            <h3>Top Genres</h3>
            <div className="genre-list">
                {genreBar.map((percentage, i) => (
                    <div className="genre-item" key={i}>
                        <div className="genre-label">Genre</div>
                        <div className="genre-bar">
                            <div className="genre-fill" style={{width: `${percentage}%`}}></div>
                        </div> 
                    </div>
                ))}
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

function Data() {
    const [loading, setLoading] = useState(true);
    const [currDuration, setCurrDuration] = useState("long_term");
    const [currDurationFriend, setCurrDurationFriend] = useState("long_term");
    const [friendLoading, setFriendLoading] = useState(true);
    const [profile, setProfile] = useState({});
    const [friendProfiles, setFriendProfiles] = useState([]);
    
    async function getProfile() {
        const { data } = await supabase
            .from("profiles").select()
            .eq("id", user.id);
            
            if (data?.length) {
                setProfile(data[0]);
              }
              setLoading(false);
      }
      
      async function getFriendProfile(id) {
        const { data } = await supabase
            .from("profiles").select()
            .eq("id", id);
            
            if (data?.length) {
                setFriendProfiles(prev => [...prev, data[0]]);
            }
      }

        useEffect(() => {
            const fetchFriends = async () => {
                const friendIDs = ["02516fc7-411a-4330-b7b3-cabe0477a657"] // Get specific friend profiles. This is a hardcoded solution.        
                for (let i = 0; i < friendIDs.length; i++) {
                    await getFriendProfile(friendIDs[i]);
                }
                setFriendLoading(false);
            };

            // Get the profile data from Supabase
            getProfile();    
            fetchFriends();

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
                const friendStats = friendsSection.querySelectorAll(".friends-stats");

                friendTabs.forEach((tab) => {
                tab.addEventListener("click", () => {
                    friendTabs.forEach((t) => t.classList.remove("active"));
                    tab.classList.add("active");
                    friendStats.forEach((stat) => stat.classList.add("hidden"));
                    const friendId = tab.getAttribute("data-friend");
                    const target = friendsSection.querySelector(`.friends-stats[data-friend="${friendId}"]`);
                    if (target) target.classList.remove("hidden");
                });
                });

                // Duration Tabs for Friends
                const durationTabsFriends = friendsSection.querySelectorAll(".stats-length-friends");
                durationTabsFriends.forEach((tab) => {
                tab.addEventListener("click", () => {
                    durationTabsFriends.forEach((t) => t.classList.remove("active"));
                    tab.classList.add("active");
                    if (tab.innerText === "4 Weeks") {
                        setCurrDurationFriend("short_term");
                    } else if (tab.innerText === "6 Months") {
                        setCurrDurationFriend("medium_term");
                    } else {
                        setCurrDurationFriend("long_term");
                    }
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
                if (tab.innerText === "4 Weeks") {
                    setCurrDuration("short_term");
                } else if (tab.innerText === "6 Months") {
                    setCurrDuration("medium_term");
                } else {
                    setCurrDuration("long_term");
                }
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
                {loading ? (
                    <div>Loading your stats...</div>
                    ) : (
                    <div className="stats-grid">
                        <StatsTracks currDuration={currDuration} profile={profile} />
                        <StatsArtists currDuration={currDuration} profile={profile} />
                        <StatsGenre />
                    </div>
                    )}
                <FriendsContainer />
              </div>
            </section>
            <section id="features" className="features"></section>
                <section id="friends-stats" className="friends-section hidden">
                <div className="container">
                    <FriendsStats />
                    <FriendSelector />
                    <div className="friends-stats" data-friend="nathan">
                    {friendLoading ? (
                    <div>Loading your stats...</div>
                    ) : (
                    <div className="stats-grid">
                        <NathanTracks currDurationFriend={currDurationFriend} profile={friendProfiles[0]} />
                        <NathanArtists currDurationFriend={currDurationFriend} profile={friendProfiles[0]} />
                        <NathanGenre />
                    </div>
                    )}
                    </div>
                    <div className="friends-stats hidden" data-friend="elijah">
                        <div className="stats-grid">
                            <ElijahTracks />
                            <ElijahArtists />
                            <ElijahGenre />                        
                        </div>
                    </div>
                    <div className="return-button-container">
                        <Link to="/" className="btn btn-ghost">Return Home</Link>
                    </div>
                </div>
            </section>
          </main>
            <Footer />
        </div>
  
      </>
    )
  }
  
  export default Data;