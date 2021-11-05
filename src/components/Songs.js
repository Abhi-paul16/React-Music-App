import React from "react";

const Songs = ( {currentSong,isPlaying} )=>{
    return(
        <div className="song-container">
        
            <img className={isPlaying ? "rotateSong" : ""} src = {currentSong.cover} alt="cover" ></img>
            <h2>{currentSong.name}</h2>
            <h3>{currentSong.artist} </h3>
    
        </div>
    )
}

export default Songs;