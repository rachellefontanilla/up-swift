import { useEffect, useState } from "react";
import { getCurrentUserPlaylists } from "../spotify/spotify";
import Playlist from "./Playlist";


const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getCurrentUserPlaylists();
        setPlaylists(data.items);
      } catch (e) {
        console.error(e);
      }
    }

    fetchData();
  }, []);


  return (
    <div>
      {playlists ? (
        playlists.map(playlist =>
          <Playlist playlist={playlist}/>
      )) : (
        <h2>You have no playlists that can be updated!</h2>
      )}
    </div>
  );
};

export default Playlists;
