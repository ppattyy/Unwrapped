export async function fetchProfile(token) {
    try{
        const result = await fetch("https://api.spotify.com/v1/me", {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) {
            sessionStorage.setItem('loading', "false");

        }
        } catch (error) {
            sessionStorage.setItem('loading', "false");
        }
        return await response.json();
    }

export async function fetchCurrentTrack(token) {
    const result = await fetch("https://api.spotify.com/v1/me/player/recently-played", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}

export async function fetchTopTracks(token, limit, time_range) {
    try{
        const result = await fetch(`https://api.spotify.com/v1/me/top/tracks?offset=0&limit=${limit}&time_range=${time_range}`, {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        });


        if (!response.ok) {
            sessionStorage.setItem('loading', "false");

        }
        } catch (error) {
            sessionStorage.setItem('loading', "false");
        }

        return await response.json();
    }
    

export async function fetchTopArtists(token, limit, time_range) {
    try {
        const response = await fetch(
            `https://api.spotify.com/v1/me/top/artists?offset=0&limit=${limit}&time_range=${time_range}`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` }
            }
        );

        if (!response.ok) {
            sessionStorage.setItem('loading', "false");

        }
        } catch (error) {
            sessionStorage.setItem('loading', "false");
        }

        return await response.json();
    }

export async function fetchArtist(token, id) {
    const result = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}