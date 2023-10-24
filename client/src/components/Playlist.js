import { useState } from "react";
import { getPlaylistSongs, removePlaylistSongs, addPlaylistSongs } from "../spotify/spotify";
import { uriMapping } from "../resources/uriMapping";

const Playlist = ({playlist}) => {
    const [songs, setSongs] = useState([]);
    const [stolenUris, setStolenUris] = useState([]);
    const [stolenSongs, setStolenSongs] = useState([]);

    async function fetchData() {
        try {
          const { data } = await getPlaylistSongs(playlist.id);
          if (data.items) {
            const filteredSongs = data.items.filter(
              (item) => item.track && item.track.name
            );
            console.log(filteredSongs);
            setSongs(filteredSongs);
          }
        } catch (e) {
          console.error(e);
        }
      }

    function handleGetSongs () {   
        fetchData();
    }

    function handleGetStolenSongs () {
        if (songs.length > 0) {
            const stolenSongs = songs.filter(
                (song) => {
                    // console.log("Album name:", song.track.album.name);
                    // console.log("Is stolen album?", isStolenAlbum(song.track.album.name));
                    // console.log("Is stolen song?", isStolenSong(song.track.name));
                    return isStolenAlbum(song.track.album.name) && isStolenSong(song.track.name)
                }
            );
            setStolenSongs(stolenSongs);
            // transform stolenSongs into an array of objects with "uri" property for spotify endpoint
            const stolenUris = stolenSongs.map((song) => ({
                uri: song.track.uri,
            }));
            setStolenUris(stolenUris);
        } else {
            // If songs state is empty, fetch the songs
            fetchData();
        }
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

    function handleRemoveStolenSongs(){

        if (stolenUris.length > 0){
            // use stolenUris to create array of newUris from map
            const newUris = stolenUris.map((stolenUri) => {
                const newUri = uriMapping[stolenUri.uri];
                return { uri: newUri };
            });

            // use DELETE playlist tracks endpoint with stolenUris
            removePlaylistSongs(playlist.id, stolenUris);

            // use POST playlist tracks endpoint with newUris
            addPlaylistSongs(playlist.id, newUris);
        }
    }

    return (
        <div>
            <img src={playlist.images[0].url} alt={playlist.name + " Playlist Cover"} width="100" height="100"></img>
            <p>{playlist.name}</p>
            <button onClick={handleGetSongs}>Get playlist songs</button>
            { songs && songs.map(song => 
                <li key={song.track.id}>{song.track.name}</li>
            ) }

            <button onClick={handleGetStolenSongs}>Get stolen songs</button>
            { stolenSongs && stolenSongs.map(stolenSong => 
                <li key={stolenSong.track.id}>{stolenSong.track.name}</li>
            ) }

            <button onClick={handleRemoveStolenSongs}>Remove stolen songs</button>
        </div>
    )
}

export default Playlist;