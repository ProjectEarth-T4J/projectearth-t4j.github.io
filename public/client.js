
let box = document.querySelector('.box');
let shadow = '';
// for (var i = 0; i< 50; i++){
//     shadow += (shadow? ',':'')+ i*-1+'px '+ i*1+'px 0 #423a57';
// }
// box.style.boxShadow = shadow;


let text = document.getElementById('text');
let bard1 = document.getElementById('bird1');
let bard2 = document.getElementById('bird2');
let forest = document.getElementById('forest');
let rocks = document.getElementById('rocks');
let water = document.getElementById('water');
let btn = document.getElementById('btn');
let header = document.getElementById('header');

window.addEventListener('scroll',function(){
    let value = window.scrollY;
    
    // HEADER ANIMATION
    text.style.top = 40 + value * -0.5 + '%';
    bird1.style.top = value * -1.5 + 'px';
    bird1.style.left = value * 0.1 + 'px';
    bird2.style.top = value * -1.5 + 'px';
    bird2.style.left = value * -5 + 'px';
    
    btn.style.marginTop = value * 1.5 + 'px';
    rocks.style.top = value * -0.12 + 'px';
    forest.style.top = value * -0.12 + 'px';
    // header.style.top = value * -0.5 + 'px';
    
})

mediumZoom('.zoom', {
    margin: 50,
    scrollOffset: 200,
    background: '#000',
    zIndex: 999
})

mediumZoom('.zoom-tmp', {
    margin: 24,
    scrollOffset: 0,
    template: '#zoom-template',
    container: '#zoom-container'
})

let tl = gsap.timeline({
    scrollTrigger: {
        trigger: '.dark',
        start: "center bottom"
    }
});

tl.from('.img_sub', { x: 200, opacity: 0, duration: 1.5 })
    .from(".content", { y: 300, opacity: 0, duration: 1 }, '-=1')


let t2 = gsap.timeline({
    scrollTrigger: {
        trigger: '.dark2',
        start: "center bottom"
    }
});

t2.from('.img_sub2', { x: 200, opacity: 0, duration: 1.5 })
    .from(".content2", { y: 300, opacity: 0, duration: 1 }, '-=1')


const wrapper = document.querySelector(".music_wrapper"),
    musicImg = wrapper.querySelector(".img-area img"),
    musicName = wrapper.querySelector(".song-details .music_name"),
    musicArtist = wrapper.querySelector(".song-details .artist"),
    mainAudio = wrapper.querySelector("#main_audio"),
    playPauseBtn = wrapper.querySelector('.play-pause'),
    prevBtn = wrapper.querySelector('#prev'),
    nextBtn = wrapper.querySelector('#next'),
    progressBar = wrapper.querySelector('.progress-bar2'),
    progressArea = wrapper.querySelector('.progress-area'),
    musicList = wrapper.querySelector('.music_list'),
    showMoreBtn = wrapper.querySelector('#more-music'),
    hideMusicBtn = musicList.querySelector('#close');

let musicIndex = Math.floor((Math.random()) * allMusic.length + 1);

window.addEventListener("load", () => {
    loadMusic(musicIndex);
    playingNow();
})

function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = allMusic[indexNumb - 1].img;
    mainAudio.src = './music/' + allMusic[indexNumb - 1].src + '.mp3';
}

function playMusic() {
    wrapper.classList.add("paused");
    playPauseBtn.querySelector('i').innerText = "pause";
    mainAudio.play();
}

function pauseMusic() {
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector('i').innerText = "play_arrow";
    mainAudio.pause();
}

function nextMusic() {
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}

function prevMusic() {
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}

playPauseBtn.addEventListener("click", () => {
    const isMusicPlayPause = wrapper.classList.contains("paused");
    isMusicPlayPause ? pauseMusic() : playMusic();
    playingNow();
});

nextBtn.addEventListener("click", () => {
    nextMusic();
});

prevBtn.addEventListener("click", () => {
    prevMusic();
});

mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = progressWidth + '%';

    let musicCurrentTime = wrapper.querySelector('.current'),
        musicDurationTime = wrapper.querySelector('.duration');
    
    mainAudio.addEventListener("loadeddata", () => {
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if (totalSec < 10) {
            totalSec = '0' + totalSec;
        }
        musicDurationTime.innerText = totalMin + ':' + totalSec;
    });
        let currentMin = Math.floor(currentTime / 60);
        let currentSec = Math.floor(currentTime % 60);
        if (currentSec < 10) {
            currentSec = '0' + currentSec;
        }
        musicCurrentTime.innerText = currentMin + ':' + currentSec;
    
});


progressArea.addEventListener("click", (e) => {
    let progressWidthval = progressArea.clientWidth;
    let clickedOffSetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
    playMusic();
});

const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", () => {
    
    let getText = repeatBtn.innerText;
    switch (getText) {
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song looped");
            break;
        case "repeat_one":
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Playback looped");
            break;
        case "shuffle":
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "Playlist lopped");
            break;
    }

});

mainAudio.addEventListener("ended", () => {
    
    let getText = repeatBtn.innerText;

    switch (getText) {
        case "repeat":
            nextMusic();
            break;
        case "repeat_one":
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break;
        case "shuffle":
            let randomIndex = Math.floor((Math.random()) * allMusic.length + 1);
            do {
                randomIndex = Math.floor((Math.random()) * allMusic.length + 1);
            } while (musicIndex == randomIndex);
            musicIndex = randomIndex;
            loadMusic(musicIndex);
            playMusic();
            playingNow();
            break;
    }

});

showMoreBtn.addEventListener("click", () => {
    musicList.classList.toggle("show");
});

hideMusicBtn.addEventListener("click", () => {
    showMoreBtn.click();
});

const ulTag = wrapper.querySelector("ul");

for (let i = 0; i < allMusic.length; i++) {
    let liTag = '<li li-index='+(i+1)+'><div class="music_row"><span>'
        + allMusic[i].name + '</span><p>'
        + allMusic[i].artist + '</p></div>'
        + '<audio class="' + allMusic[i].src + '" src="./music/' + allMusic[i].src + '.mp3"></audio>'
        + '<span id="' + allMusic[i].src + '" class="audio-duration">3:40</span></li>';
    
    ulTag.insertAdjacentHTML("beforeend", liTag);

    let liAudioDuration = ulTag.querySelector('#'+allMusic[i].src);
    let liAudioTag = ulTag.querySelector('.'+allMusic[i].src);

    liAudioTag.addEventListener("loadeddata", () => {
        let audioDuration = liAudioTag.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if (totalSec < 10) {
            totalSec = '0' + totalSec;
        }
        liAudioDuration.innerText = totalMin + ':' + totalSec;
        liAudioDuration.setAttribute("t-duration", totalMin + ':' + totalSec);
    });
}

const allLiTag = ulTag.querySelectorAll("li");

function playingNow() {
    for (let j = 0; j < allLiTag.length; j++) {
        let audioTag = allLiTag[j].querySelector(".audio-duration");

        if (allLiTag[j].classList.contains('playing')) {
            allLiTag[j].classList.remove("playing");
            let ad = audioTag.getAttribute("t-duration");
            audioTag.innerText = ad;
        }

        if (allLiTag[j].getAttribute("li-index") == musicIndex) {
            allLiTag[j].classList.add("playing");
            audioTag.innerText = "Playing";
        }

        allLiTag[j].setAttribute("onclick", "clicked(this)");
    }
}

function clicked(element) {
    let getLiindex = element.getAttribute("li-index");
    musicIndex = getLiindex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}

function fadeUp() {
    let x = document.getElementById("switch_music");
    let y = document.getElementById("switch");
    y.style.opacity = 0;
    y.style.transitionDuration = "0.5s";
    x.style.opacity = 1;
    x.style.transitionDuration = "0.5s";
    x.style.transform = "translateY(0%)";
}

function fadeDown() {
    let x = document.getElementById("switch_music");
    let y = document.getElementById("switch");
    y.style.opacity = 1;
    x.style.opacity = 0;
    x.style.transform = "translateY(110%)";
    x.style.transitionDuration = "0.5s";
}

function set_vol(val) {
    var player = document.getElementById('main_audio');
    player.volume = val / 100;
}

