import React, {useRef ,useState} from "react";

// adding components
import Songs from "./components/Songs";
import Player from "./components/Player";
import Library from "./components/Library";
import Nav from "./components/Nav";

// import data
import Data from './Data'

//  import styles
import "./Styles/app.scss"

function App() { 
  // states
  const[songs,SetSongs] = useState(Data())
  const[currentSong , SetcurrentSong]= useState(songs[0]);
  const[isPlaying, setIsPlaying] = useState(false);
  const [SongInfo , SetSongInfo] = useState({currentTime:0 , Duration:0 , animationPercentage:0});
  const[LibraryStatus , setLibraryStatus] = useState(false);
  //ref
  const audioRef = useRef(null);


  const timeUpdateHandler = (e)=>{
    const currentTime = e.target.currentTime;
    const Duration = e.target.duration;

    //calculate percentage

    const  RoundedCurrent = Math.round(currentTime);
    const RoundedDuration = Math.round(Duration);
    const animatedpercent = Math.round((RoundedCurrent/RoundedDuration)*100);
    console.log(animatedpercent)
SetSongInfo({...SongInfo,currentTime , Duration , animationPercentage:animatedpercent})    }

const songEndHandler = async ()=>{
  let currentIndex = songs.findIndex((song)=> song.id === currentSong.id)
   await SetcurrentSong(songs[(currentIndex+1) % songs.length ])
   if(isPlaying) audioRef.current.play(); 
}

 return (
  <div className= {`App ${LibraryStatus ? "library-active" : ''}`}>
<Nav  LibraryStatus = {LibraryStatus} setLibraryStatus = {setLibraryStatus} />
<Songs currentSong = {currentSong}  isPlaying = {isPlaying} />

<Player currentSong = {currentSong}
audioRef = {audioRef} 
SongInfo = {SongInfo}
 SetSongInfo = {SetSongInfo} 
 isPlaying={isPlaying} 
 setIsPlaying ={setIsPlaying}  
 songs = {songs}
 SetSongs = {SetSongs}
 SetcurrentSong = {SetcurrentSong} />

<Library SetcurrentSong = {SetcurrentSong} SetSongs = {SetSongs} songs= {songs} audioRef = {audioRef} isPlaying= {isPlaying} LibraryStatus={LibraryStatus}/>
<audio onLoadedMetadata = {timeUpdateHandler} onTimeUpdate = {timeUpdateHandler} onEnded={songEndHandler} ref={audioRef}  src={currentSong.audio}></audio>
</div>
  );
}

export default App;
