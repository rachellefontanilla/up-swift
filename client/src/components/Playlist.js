import { useState } from "react";
import { getPlaylistSongs } from "../spotify/spotify";

const Playlist = ({playlist}) => {
    const [songs, setSongs] = useState([]);
    const [stolenSongs, setStolenSongs] = useState([]);

    function handleClick () {
        const fetchData = async () => {
            try {
                const { data } = await getPlaylistSongs(playlist.id);
                if (data.items) {
                    const filteredSongs = data.items.filter(item => item.track && item.track.name);
                    setSongs(filteredSongs);
                }
            } catch (e) {
                console.error(e);
            }
        }
      
        fetchData();
    }

    function getStolenSongs () {
        const fetchData = async () => {
            try {
                const { data } = await getPlaylistSongs(playlist.id);
                if (data.items) {
                    const filteredSongs = data.items.filter(item => item.track && item.track.name);
                    const stolenSongs = filteredSongs.filter(song => isStolenAlbum(song.track.album.name) && isStolenSong(song.track.name));
                    setStolenSongs(stolenSongs);
                }
            } catch (e) {
                console.error(e);
            }
        }
      
        fetchData();
    }

    // 1: check if from stolen album
    // 2: check if song is rerecorded 
    // check if an album has been rerecorded, but is not the new (Taylor's Version)
    function isStolenAlbum(albumName) {
        const rerecordedAlbums = ["Red", "Speak Now", "Fearless"]
        return (
            !albumName.endsWith("(Taylor's Version)") &&
            rerecordedAlbums.some(reRecordedAlbum => albumName.startsWith(reRecordedAlbum))
            );
        }
        
    // check if song has a rerecorded version
    function isStolenSong(songName) {
        // song does NOT end in (From The Vault)
        return !songName.endsWith("(From The Vault");
    }

    return (
        <div>
            <img src={playlist.images[0].url} alt={playlist.name + " Playlist Cover"} width="100" height="100"></img>
            <p>{playlist.name}</p>
            <button onClick={handleClick}>Get playlist songs</button>
            { songs && songs.map(song => 
                <li key={song.track.id}>{song.track.name}</li>
            ) }

            <button onClick={getStolenSongs}>Get stolen songs</button>
            { stolenSongs && stolenSongs.map(stolenSong => 
                <li key={stolenSong.track.id}>{stolenSong.track.name}</li>
            ) }
        </div>
    )
}

export default Playlist;