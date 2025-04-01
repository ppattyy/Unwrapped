import { generateRandomString, generateCodeChallenge } from './auth.js';
import { getToken } from './token.js'; 

/*
 * This function is used to start the authorization flow for Spotify.
 * It generates a code verifier and code challenge, and redirects the user to the Spotify authorization page.
 * The return is handled by the function handleRedirect() in this file.
 */
const startAuthFlow = async () => {
    const codeVerifier = generateRandomString(128); //From auth.js
    localStorage.setItem('code_verifier', codeVerifier);
    const codeChallenge = await generateCodeChallenge(codeVerifier); //From auth.js
  
    const clientId = 'd20e9e734bfb4d128096bb863a075dac';
    const redirectUri = 'http://localhost:5173/';  // Should match a valid redirect URI for the app
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
  
    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  };
  
 /*
Runs whenever the webpage loads. If the user is returning from a redirect with a Spotify
code in the URL it uses to to get an access token from token.js
 */
  const handleRedirect = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      const accessToken = await getToken(code); //From token.js
      // FETCH FUNCTIONS FROM fetch.js //
      // const profile = await fetchProfile(accessToken);
      // const currentTrack = await fetchCurrentTrack(accessToken);
      // const topTrackList = await fetchTopTracks(accessToken, 20, "long_term"); 
        /* Number of tracks can range from 1 to 50. Time period can be short_term, medium_term, or long_term.
        Short term is the last 4 weeks, medium term is the last 6 months, and long term is one year. */

      // OTHER FUNCTIONS //
      // const topGenres = getTopGenres(topTrackList.items, accessToken);
      // populateUI(profile, currentTrack, topGenres);
    }
  }

// handle redirect when webpage loads
document.addEventListener("DOMContentLoaded", handleRedirect);

  