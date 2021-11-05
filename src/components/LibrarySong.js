import React from "react";



const LibrarySong = ( {song , SetcurrentSong ,songs, SetSongs, audioRef , isPlaying , id} )=>{

    const SelectSongHandler = async ()=>{
        await SetcurrentSong(song)

   //add Active state 
   const newSongs =  songs.map((song)=>{
        
       if(song.id === id){
           return{
               ...song,
               active: true,
           }
       }else{
           return{
               ...song,
               active: false,
           }
       }
   }) ; 
   
 SetSongs(newSongs)
   
  if(isPlaying) audioRef.current.play();


    }

    return(
        <div onClick = {SelectSongHandler} className={`Library-song ${song.active ? 'selected' : ''}`}>
        
            <img src = {song.cover} alt="cover" ></img>

            <div className="song-discription">
            <h3>{song.name}</h3>
            <h4>{song.artist} </h4>
    
            </div>

        </div>
    )
}

export default LibrarySong;