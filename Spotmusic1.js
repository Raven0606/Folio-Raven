console.log("Welcome to SpotMusic");
let songIndex = 0;
let audioElement = new Audio('songs/Despacito_song.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let currentsong = Array.from(document.getElementsByClassName('songItemPlay'));
let songs = [
    {songName: "Luis Fonsi- Despacito", filePath: "songs/Despacito_song.mp3", coverPath: "covers/Despacito.jpg"},
    {songName: "The Weeknd ft.PB Carti- Timeless", filePath: "songs/The Weeknd  Timeless with Playboi Carti (Official Music Video).mp3", coverPath: "covers/Weeknd_timless.jpg"},
    {songName: "Flor Rida- Right Round", filePath: "songs/Flo Rida - Right Round (feat. Ke$ha) (Official Video) [HD].mp3", coverPath: "covers/Florida-RightRound.jpg"},
    {songName: "Bryan-Martin- We Ride", filePath: "songs/Bryan Martin - We Ride (Official Lyric Video).mp3", coverPath: "covers/Bryan_Martin_We_Ride.jpg"},
    {songName: "CYREX- Afterlife", filePath: "songs/CYREX - AFTERLIFE.mp3", coverPath: "covers/Afterlife.jpg"}
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 
// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    console.log("Trying to play file at path: ", audioElement.src); // ADD THIS LINE
if(audioElement.paused || audioElement.currentTime<=0){
        let playPromise = audioElement.play();
        
        // This catches silent audio loading errors
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
            }).catch(error => {
                console.error("Audio failed to play. The browser cannot find the file!", error);
            });
        }
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    let progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        
        audioElement.play()
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=4){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})