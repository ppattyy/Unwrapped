import { useEffect } from "react";
import { startAuthFlow, handleRedirect } from "./spotify-api/main.js";
import './ConnectButton.css';

function ConnectButton() {
    useEffect(() => {
        handleRedirect(); // runs once on load
      }, []);

    return (
            <button onClick={startAuthFlow}>
                Connect Spotify
            </button>
    );
}

export default ConnectButton;