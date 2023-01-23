

const Playlist = ({playlist}) => {

    return (
        <div key={playlist.id}>
            <img src={playlist.images[0].url} alt={playlist.name + " Playlist Cover"} width="100" height="100"></img>
            <p>{playlist.name}</p>
        </div>
    )
}

export default Playlist;