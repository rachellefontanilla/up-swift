import "./App.css";
import { useEffect, useState } from "react";
import { accessToken, getCurrentUserProfile, logout } from "./spotify/spotify";

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      // getUserProfile returns a promise so use try first
      try {
        const { data } = await getCurrentUserProfile();
        setProfile(data);

        console.log(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {!token ? (
          <a href="http://localhost:8888/login">Log in to Spotify</a>
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
