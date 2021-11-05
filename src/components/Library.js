
import React from 'react'

import LibrarySong from './LibrarySong';

const Library= ({songs , SetcurrentSong , audioRef , isPlaying ,key, SetSongs , LibraryStatus})=> {
    return (
        <div className={`library ${LibraryStatus ? "active-library" : ""} `}> 
            <h2>Library</h2>
            <div className="library-songs">
     {songs.map((song)=>(
    
    <LibrarySong 
    SetcurrentSong = {SetcurrentSong} 
    song={song} 
    id = {song.id}
    key = {song.id}
    songs = {songs} 
    audioRef = {audioRef} 
    isPlaying={isPlaying} 
    SetSongs = {SetSongs} />
))}
            </div>
        </div>
    )
}


export default Library;