export const playAudio =(isPlaying,audioRef)=>{

 if(isPlaying){
    const Playpromise = audioRef.current.play();
    if(Playpromise !== undefined){
        Playpromise.then((audio)=>{audioRef.current.play()})
    }
     }

    }