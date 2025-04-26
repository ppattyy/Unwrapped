import { createClient } from "@supabase/supabase-js";
import { generateRandomString, generateCodeChallenge } from './auth.js';
import { getToken } from './token.js'; 
import { fetchProfile, fetchTopTracks, fetchTopArtists } from './fetch.js';

const supabase = createClient("https://ohvjoekcangwhrpwqcpw.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9odmpvZWtjYW5nd2hycHdxY3B3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxOTE0NzcsImV4cCI6MjA1ODc2NzQ3N30.NSkMSsN3lH0Bmgu6kuCinn0B7kY0L460D3Af142CEzc");

/*
 * This function is used to start the authorization flow for Spotify.
 * It generates a code verifier and code challenge, and redirects the user to the Spotify authorization page.
 * The return is handled by the function handleRedirect() in this file.
 */
export const startAuthFlow = async () => {
    const codeVerifier = generateRandomString(128); //From auth.js
    localStorage.setItem('code_verifier', codeVerifier);
    const codeChallenge = await generateCodeChallenge(codeVerifier); //From auth.js
  
    const clientId = 'd20e9e734bfb4d128096bb863a075dac';
    const redirectUri = 'https://unwrappedmi.netlify.app/home';  // Should match a valid redirect URI for the app
    const scope = 'user-read-private user-read-email user-read-recently-played user-top-read'; // Requesting these permissions. Read more: https://developer.spotify.com/documentation/web-api/concepts/scopes
  
    const authUrl = new URL("https://accounts.spotify.com/authorize");
  
    const params = {
      response_type: 'code',
      client_id: clientId,
      scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    };
    
    sessionStorage.setItem('codeUsed', false);
    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  };
  
 /*
Runs whenever the webpage loads. If the user is returning from a redirect with a Spotify
code in the URL it uses to to get an access token from token.js
 */
 export const handleRedirect = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code && sessionStorage.getItem('codeUsed') === "false") {
      sessionStorage.setItem('loading', "true");
      sessionStorage.setItem('codeUsed', true);
      const accessToken = await getToken(code); //From token.js
      if (accessToken) {
        const profile = await fetchProfile(accessToken); // Get the profile from Spotify API
        sessionStorage.setItem('spotify_name', profile.display_name);
        const topArtists = {};
        topArtists["long_term"] = await fetchTopArtists(accessToken, 5, "long_term"); //Get the top artists from Spotify API
        topArtists["medium_term"] = await fetchTopArtists(accessToken, 5, "medium_term"); 
        topArtists["short_term"] = await fetchTopArtists(accessToken, 5, "short_term"); 
        const topTracks = {};
        topTracks["long_term"] = await fetchTopTracks(accessToken, 5, "long_term"); //Get the top tracks from Spotify API
        topTracks["medium_term"] = await fetchTopTracks(accessToken, 5, "medium_term"); 
        topTracks["short_term"] = await fetchTopTracks(accessToken, 5, "short_term"); 

        console.log(topTracks);
  
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !sessionData.session) {
          console.log(sessionData)
          console.error("No session found:", sessionError);
          sessionStorage.setItem('loading', "false");
          return;
        }
  
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
          console.error("Failed to get Supabase user:", userError);
          sessionStorage.setItem('loading', "false");
          return;
        }
  
        const { error } = await supabase
          .from('profiles')
          .update({ top_artists: topArtists, top_tracks: topTracks, profile_object: profile })
          .eq('id', user.id) 
        if (error) {
          console.error("Error updating profile:", error);
          sessionStorage.setItem('loading', "false");
        }
        sessionStorage.setItem('loading', "false");
        // FETCH FUNCTIONS FROM fetch.js //
        // const currentTrack = await fetchCurrentTrack(accessToken);
        // const topTrackList = await fetchTopTracks(accessToken, 20, "long_term"); 
          /* Number of tracks can range from 1 to 50. Time period can be short_term, medium_term, or long_term.
          Short term is the last 4 weeks, medium term is the last 6 months, and long term is one year. */
  
        // OTHER FUNCTIONS //
        // const topGenres = getTopGenres(topTrackList.items, accessToken);
        // populateUI(profile, currentTrack, topGenres);
      }
    }
  }

  