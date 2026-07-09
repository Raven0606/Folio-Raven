console.log("welcome");
let songIndex = 0;
let audioElement = new Audio('songs/Despacito_song.mp3');
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');
let masterPlay = document.getElementById('masterPlay');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs2 = [
    {songName: "Luis Fonsi- Despacito", filePath: "songs/Despacito_song.mp3", coverPath: "covers/Despacito.jpg"},
    {songName: "The Weeknd ft.PB Carti- Timeless", filePath: "songs/The Weeknd  Timeless with Playboi Carti (Official Music Video).mp3", coverPath: "covers/Weeknd_timless.jpg"},
    {songName: "Flor Rida- Right Round", filePath: "songs/Flo Rida - Right Round (feat. Ke$ha) (Official Video) [HD].mp3", coverPath: "covers/Florida-RightRound.jpg"},
    {songName: "Bryan-Martin- We Ride", filePath: "songs/Bryan Martin - We Ride (Official Lyric Video).mp3", coverPath: "covers/Bryan_Martin_We_Ride.jpg"},
    {songName: "CYREX- Afterlife", filePath: "songs/CYREX - AFTERLIFE.mp3", coverPath: "covers/Afterlife.jpg"},
    {songName: "Tobi- Bad girls like you", filePath: "songs/bad girls like you, tobii.mp3", coverPath: "covers/tobi.jpg"},
    {songName: "EXO-Ko Ko Bop", filePath: "songs/EXO 엑소 'Ko Ko Bop' MV.mp3", coverPath: "covers/kokobop.jpg"},
    {songName: "Macklemore- Thrift Shop", filePath: "songs/MACKLEMORE & RYAN LEWIS - THRIFT SHOP.mp3", coverPath: "covers/ThriftShop.jpg"},
    {songName: "One Direction-Night Changes", filePath: "songs/One Direction-Night Changes.mp3", coverPath: "covers/OneDirection.jpg"},
    {songName: "Fifth Harmony-Work from Home.mp3", filePath: "songs/Fifth Harmony - Work from Home.mp3", coverPath: "covers/WorkFrom.jpg"}
]
songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs2[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs2[i].songName; 
})

audioElement.addEventListener('timeupdate', ()=>{ 
    let progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        makeAllPlays();
    }
});

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
        
        audioElement.src = songs2[songIndex].filePath;
        masterSongName.innerText = songs2[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = songs2[songIndex].filePath;
    masterSongName.innerText = songs2[songIndex].songName;
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
    
    audioElement.src = songs2[songIndex].filePath;
    masterSongName.innerText = songs2[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
const searchInput = document.getElementById('music');

searchInput.addEventListener('input', (e) => {
    const searchValue = e.target.value.toLowerCase();
    
    const allSongItems = Array.from(document.getElementsByClassName('songItem'));
    
    
    allSongItems.forEach((element) => {
        
        const songName = element.getElementsByClassName('songName')[0].innerText.toLowerCase();
        
        
        if (songName.includes(searchValue)) {
            element.style.display = 'flex'; 
        } else {
            element.style.display = 'none';
        }
    });
});