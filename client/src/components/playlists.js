import { useEffect, useState } from "react";
import { getCurrentUserPlaylists } from "../spotify/spotify";

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userPlaylists = await getCurrentUserPlaylists();
        setPlaylists(userPlaylists.data.items);
      } catch (e) {
        console.error(e);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {playlists && (
        <>
          <h1>Your Playlists</h1>
          <ul>
          {playlists.map((playlist) => (
            <li key={playlist.id}>{playlist.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Playlists;
