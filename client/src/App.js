import "./App.css";
import { useEffect, useState } from "react";
import { accessToken, getCurrentUserProfile, logout } from "./spotify/spotify";

import Login from "./pages/login";

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    async function fetchData() {
      // getUserProfile returns a promise so use try first
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
                <p>Followers: {profile.followers.total}</p>
                <img src={profile.images[0].url} alt="Avatar"></img>
              </div>
            )}
          </>
        )}
      </header>
    </div>
  );
}

export default App;
