/*
 * This function is used to get the access token from Spotify using the authorization code flow.
 * It sends a POST request to the Spotify API with the authorization code.
 * If successful, it returns the access token.
 */

export const getToken = async (code) => {
    const codeVerifier = localStorage.getItem('code_verifier');
    const clientId = 'd20e9e734bfb4d128096bb863a075dac'; 
    const redirectUri = 'http://localhost:5173/home'; // Should match a valid redirect URI for the app
  
    const url = "https://accounts.spotify.com/api/token";
    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    };
  
    const body = await fetch(url, payload);
    const response = await body.json();
    return(response.access_token);
    //localStorage.setItem('access_token', response.access_token);
  }
  