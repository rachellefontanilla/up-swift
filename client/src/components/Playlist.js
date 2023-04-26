import { useState } from "react";
import { getPlaylistSongs } from "../spotify/spotify";

const Playlist = ({playlist}) => {
    const [songs, setSongs] = useState([]);

    function handleClick () {
        const fetchData = async () => {
            try {
                console.log(playlist.id)
                // playlist.id becomes undefined
                const { data } = await getPlaylistSongs(playlist.id);
                setSongs(data.items);
            } catch (e) {
                console.error(e);
            }
        }
      
        fetchData();
    }

    return (
        <div key={playlist.id}>
            <img src={playlist.images[0].url} alt={playlist.name + " Playlist Cover"} width="100" height="100"></img>
            <p>{playlist.name}</p>
            <button onClick={handleClick}>Get playlist songs</button>
            { songs && songs.map(song => 
            <li key={song.track.id}>{song.track.name}</li>
            ) }
        </div>
    )
}

export default Playlist;