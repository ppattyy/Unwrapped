import { startAuthFlow, handleRedirect } from "./spotify-api/main.js";
import './ConnectButton.css';

function ConnectButton() {
    return (
            <button onClick={startAuthFlow}>
                Connect Spotify
            </button>
    );
}

export default ConnectButton;