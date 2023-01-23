import "./App.css";
import { useEffect, useState } from "react";
import { accessToken, getCurrentUserProfile, logout } from "./spotify/spotify";

import Login from "./pages/login";
import Playlists from "./components/playlists";

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    async function fetchData() {
      try {
        const { data } = await getCurrentUserProfile();
        setProfile(data);
      } catch (e) {
        console.error(e);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {!token ? (
          <Login />
        ) : (
          <>
            <h1>Logged In!</h1>
            <button onClick={logout}>Log Out</button>

            {profile && (
              <div>
                <h1>Hi {profile.display_name}</h1>
                <Playlists />
              </div>
            )}
          </>
        )}
      </header>
    </div>
  );
}

export default App;
