const image = document.getElementById('cover'),
      title = document.getElementById('music-title'),
      artist = document.getElementById('music-artist'),
      currentTimeEl = document.getElementById('current-time'),
      durationEl =document.getElementById('duration'),
      progress = document.getElementById('progress'),
      playerProgress = document.getElementById('player-progress'),
      prevBtn = document.getElementById('prev'),
      nextBtn = document.getElementById('next'),
      playBtn = document.getElementById('play'),
      background = document.getElementById('bg-img');
      showSongsBtn = document.getElementById('show-songs');
      songListContainer = document.getElementById('song-list');
      songsListEl = document.getElementById('songs');


const music = new Audio();
const songs =[
    {
        path: 'assets/eibiday.mp3',
        displayName: 'Ei Bidaye',
        cover:'assets/biday.jpg',
        artist:'Artcell'
    },
    {
        path: 'assets/jatra.mp3',
        displayName: 'Jatra',
        cover:'assets/jatra.jpg',
        artist:'MiNERVA'
    },
    {
        path: 'assets/black.mp3',
        displayName: 'Ekhono',
        cover:'assets/black.jpg',
        artist:'Black'
    },
    {
        path: 'assets/amar_prithibi.mp3',
        displayName: 'Amar Prithibi',
        cover:'assets/black.jpg',
        artist:'Black'
    },
    {
        path: 'assets/Porahoto.mp3',
        displayName: 'Porahoto',
        cover:'assets/por.jpg',
        artist:'Black'
    },
    {
        path: 'assets/irsha.mp3',
        displayName: 'Irsha',
        cover:'assets/irsha.jpg',
        artist:'Tahsan'
    },
    {
        path: 'assets/neela.mp3',
        displayName: 'Neela',
        cover:'assets/n.jpg',
        artist:'Miles'
    },
    {
        path: 'assets/Roder_Kinaray.mp3',
        displayName: 'Roder Kinaray',
        cover:'assets/r.jpg',
        artist:'Arbovirus'
    },
    {
        path: 'assets/Odbhut_Shei_Cheleti.mp3',
        displayName: 'Odbhut Shei Cheleti',
        cover:'assets/o.jpg',
        artist:'Aurthothin'
    },
    {
        path: 'assets/Obak_Bhalobasha.mp3',
        displayName: 'Obak Bhalobasha',
        cover:'assets/obak.jpg',
        artist:'Warfaze'
    },
    {
        path: 'assets/Hariye_Jao.mp3',
        displayName: 'Hariye Jao',
        cover:'assets/r.jpg',
        artist:'Arbovirus'
    },
    {
        path: 'assets/Dukhya_Bilas.mp3',
        displayName: 'Dukhya Bilas',
        cover:'assets/dd.jpg',
        artist:'Artcell'
    },
    {
        path: 'assets/Cholo_Brishtite_Bhiji.mp3',
        displayName: 'Cholo Brishtite Bhiji',
        cover:'assets/cholo.jpg',
        artist:'Habib Wahid'
    },
    {
        path: 'assets/Dhupchaya.m4a',
        displayName: 'Dhupchaya',
        cover:'assets/dup.jpg',
        artist:'Warfaze'
    },
    {
        path: 'assets/Tomar_Jonno.mp3',
        displayName: 'Tomar Jonno',
        cover:'assets/tt.jpg',
        artist:'Arnob'
    }

];

let musicIndex = 0;
let isplaying = false;

function togglePlay(){
    if(isplaying){
        pauseMusic();
    }else{
        playMusic();
    }
}

function playMusic(){
    isplaying=true;

    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause');
    music.play();
}

function pauseMusic(){
    isplaying=false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
    music.pause();
}

function loadMusic(song){
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction){
    musicIndex = (musicIndex + direction + songs.length ) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar(){
    const {duration, currentTime} = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2,'0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
    
}

function setProgressBar(e){
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime =(clickX/width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended',() => changeMusic(1));
music.addEventListener('timeupdate',updateProgressBar);
playerProgress.addEventListener('click',setProgressBar);

loadMusic(songs[musicIndex]);

