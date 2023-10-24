import { getAlbumTracks } from "../spotify/spotify";

async function createURIMapping(oldAlbums, newAlbums) {
  const uriMapping = {};

  for (let index = 0; index < oldAlbums.length; index++) {
    const oldAlbumURI = oldAlbums[index];
    const newAlbumURI = newAlbums[index];
    console.log("Old Albums: ", oldAlbums);
    console.log("New Albums: ", newAlbums);


    try {
        const { data: oldAlbumTracks } = await getAlbumTracks(oldAlbumURI);
        const { data: newAlbumTracks } = await getAlbumTracks(newAlbumURI);

        if (oldAlbumTracks.items && newAlbumTracks.items) {
            // Create a mapping by matching track names
            oldAlbumTracks.items.forEach((oldTrack) => {
                const oldTrackName = oldTrack.name;

                const matchingNewTrack = newAlbumTracks.items.find((newTrack) => {
                    const newName = newTrack.name;
                    const oldNameWithApostrophe = `${oldTrackName} (Taylor's Version)`; // for albums such as Red, Speak Now
                    const oldNameWithFancyApostrophe = `${oldTrackName} (Taylor’s Version)`; // for albums such as Fearless

                    return newName === oldNameWithApostrophe || newName === oldNameWithFancyApostrophe;
                });

                if (matchingNewTrack) {
                    console.log(oldTrack.name)
                    uriMapping[oldTrack.uri] = matchingNewTrack.uri;
                }
            });
        }
    } catch (error) {
        console.error("Error fetching album tracks:", error);
    }
    }

    console.log(uriMapping);
    return uriMapping;
}

export { createURIMapping };
