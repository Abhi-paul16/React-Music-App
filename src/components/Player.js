import React  from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPlay , faAngleLeft, faAngleRight , faPause} from "@fortawesome/free-solid-svg-icons"


const Player = ({ currentSong , SetcurrentSong, songs ,setIsPlaying , isPlaying , audioRef , SongInfo , SetSongInfo , SetSongs })=>{
   

const activeLibraryHandler = (nextprev)=>{
       const newSongs = songs.map((song)=>{
        
    if(song.id === nextprev.id){
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
}
    //Event Handler
    const playSongHandler = ()=>{
        if(isPlaying){
            audioRef.current.pause();     
            setIsPlaying(!isPlaying)       
        }
        else{
            audioRef.current.play();
            setIsPlaying(!isPlaying)     
        }

    }

    

  const GetTime = (time)=>{
     return (
         Math.floor(time/60) + ":" + ("0"+Math.floor(time%60)).slice(-2)
)  }

const DragHandler = (e)=>{
    audioRef.current.currentTime = e.target.value
SetSongInfo({ ...SongInfo,currentTime: e.target.value})
}

const skipTrackHandler = async (direction)=>{
let currentIndex = songs.findIndex((song)=> song.id === currentSong.id)
if(direction === "skip-forward"){
 await SetcurrentSong(songs[(currentIndex+1) % songs.length ])
 activeLibraryHandler(songs[(currentIndex+1) % songs.length] );
}

if(direction === "skip-back"){
    if((currentIndex-1) % songs.length  === -1){
      await  SetcurrentSong(songs[songs.length - 1])
      activeLibraryHandler(songs[songs.length - 1] );
       if(isPlaying) audioRef.current.play();
        return;
    }
  await  SetcurrentSong(songs[(currentIndex-1) % songs.length ])
  activeLibraryHandler(songs[(currentIndex-1) % songs.length] );
}

if(isPlaying) audioRef.current.play();
}
   
// style
const trackAnim = {
    transform: `translateX(${SongInfo.animationPercentage}%)`}

    return(
        <div className="player">
  
            <div className="time-control">
                <p>{GetTime(SongInfo.currentTime)}</p>
                <div style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }} className="track">
                <input  onChange = {DragHandler} min="0" max ={SongInfo.Duration || 0} value = {SongInfo.currentTime} type="range"  />
                <div style={trackAnim} className="animate-track"></div>
                </div>
                
                <p>{ SongInfo.Duration ? GetTime(SongInfo.Duration): "0:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={()=> skipTrackHandler("skip-back")} className= "Skip-back icon" size="2x" icon = {faAngleLeft} />
                <FontAwesomeIcon onClick={playSongHandler} className= "play icon" size="2x" icon = {isPlaying ? faPause:faPlay} />
                <FontAwesomeIcon onClick={()=> skipTrackHandler("skip-forward")} className= "Skip-forward icon" size="2x" icon = {faAngleRight} />
            </div>
          
        </div>
    
    
    )

    
}

export default Player;