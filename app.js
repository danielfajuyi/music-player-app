// All neccessary elements from the DOM
const playBtn = document.querySelector('#btnPlay');
const audio = document.querySelector('#audio');
const btnPrev = document.querySelector('#btnPrev');
const btnNext = document.querySelector('#btnNext');
const trackTitle = document.querySelector('.track-title');
const artistName = document.querySelector('.artist-name');
const cover = document.querySelector('.cover');
const slider = document.querySelector('.slider');
const thumb = document.querySelector('.slider-thumb');
const progress = document.querySelector('.progress');
const time = document.querySelector('.time');
const fullTime = document.querySelector('.fulltime');
const volumeSlider = document.querySelector('.volume-slider .slider');
const volumeProgress = document.querySelector('.volume-slider .progress');
const volumeIcon = document.querySelector('.volume-icon');


//Global Variables 
//Is the track playing

let trackPlaying = false;
//Is the volume muted
let volumeMuted = false;
/* Which track is currently loaded (based on the numerical id)*/
let trackId = 0;

/* Data */
// track name 

const tracks = [ 
    "Immortal",
    "No Talk",
    "Enough",
    "Skylines",
    "Get Through", 
    "Lofi Mallet",
    "Winning",
    "I'm a Mess",
    "Watawi",
    "No Crime",
    "Avoid-Things",
    "Longtime",
    "Free Mind"

];

//Artist names 

const artists = [
    "NEFFEX",
    "VYEN",
    "NEFFEX",
    "Know",
    "NEFFEX",
    "BEATI",
    "IMMORTALS",
    "OMAR LAY",
    "CKAY FT DAVIDO & FOCALISTIC",
    "Nonso Amadi",
    "Tems",
    "Wizkid feat Spekta",
    "Tems",

    
];

//Covers 
const covers = [
    "cover1",
    "cover2",
    "cover3",
    "cover4",
    "cover5",
    "cover6",
    "cover7",
    "cover8",
    "cover9",
    "cover10",
    "cover11",
    "cover12",
    "cover13"

]

// Click event on the play button 
playBtn.addEventListener('click', playTrack);

//Play Track Function 
function playTrack() {

    if(trackPlaying === false) {
        // play the audio
        audio.play()
        
        // add a pause icon inside the button 
        playBtn.innerHTML = `<span class="material-symbols-outlined"> pause </span>`
        /* set the trackPlaying to true, because the track is now playing */
        trackPlaying = true; 
    }  /* otherwise, if it is playing */

    else {
        //pause the audio
        audio.pause();
        //Add a play icon inside the button 
        playBtn.innerHTML = `<span class="material-symbols-outlined"> play_arrow </span>`
        /* Set the trackPlaying to false, because the track is now paused again */
        trackPlaying = false;
    }

}


//Switching tracks function 
function switchTrack() {
    //if audio is playing
    if(trackPlaying === true) {
        //keep playing the audio
        audio.play();
    }
}

//Get the track source 
const trackSrc = './tracks/' + tracks[trackId] + ".mp3";

//Load track function 
function loadTrack() {
    //set the audio track source 
    audio.src = './tracks/' + tracks[trackId] + ".mp3";
    audio.load();
    
    // set the track titlee
    trackTitle.innerHTML = tracks[trackId];
    // set artist name 
    artistName.innerHTML = artists[trackId];
    // set the cover image 
    cover.src = './players/' + covers[trackId] + ".jpg";
    
    // set the timeline slider to the beginning 
    progress.style.width = 0;
    thumb.style.left = 0;

    //wait for the audio data to load 
    audio.addEventListener('loadeddata', () => {
        setTime(fullTime, audio.duration);
        //Set max value to slider
        slider.setAttribute("max", audio.duration);
    });
}

// initialize the load track 
loadTrack();

// Sets click event to previous button 
btnPrev.addEventListener('click', () => {
    //Decrement track id 
    trackId-- 
    //If the track id goes below 0
    if(trackId < 0) {
        // Go to the last track 
        trackId = tracks.length - 1 ;
    }
    //load the track 
    loadTrack();
    //Run the switchTrack function 
    switchTrack();
    
});

// Set click event to next button 

btnNext.addEventListener('click', nextTrack);

//Next track function 
function nextTrack() {
    //Increment track id
    trackId++;
    
    /* Finally the undefined bug was 
    cause by misspelling length as (lenght) */
    // Fixed after 2hours of debugging 
    if(trackId > tracks.length - 1) {
        //Go to the first track
        trackId = 0;
    }
    //Load the track 
    loadTrack();
    //Run the switchTrack function 
    switchTrack();
}

//when the audio ends, switch to next track 
audio.addEventListener('ended', nextTrack);

//Format the time 
function setTime(output, input) {
    //Calculate minutes from input
    const minutes = Math.floor(input / 60);
    //Calculate seconds from input 
    const seconds = Math.floor(input % 60);

    //If the seconds are under 10 
    if(seconds < 10) {
        //Add a zero before the first number
        output.innerHTML = minutes + ":0" + seconds;
    }
    //If the second is over 10
    else {
        //Output the time without a zero
        output.innerHTML = minutes + ":" + seconds;
    }
}; 

//Output the audio track duration 
setTime(fullTime, audio.duration);

// OMO 4days!!! I'm tired asf!!! 

//When the time changes on the audio track
audio.addEventListener('timeupdate', () => {
    //Get the current audio time 
    const currentAudioTime = Math.floor(audio.currentTime);
    //Get the percentage
    const timePercentage = (currentAudioTime / audio.duration) * 100 + "%";
    //Output the current audio time
    setTime(time, currentAudioTime);
    //Set the slider progress to the percentage
    progress.style.width = timePercentage;
    thumb.style.left = timePercentage;
});


//Function for handling the slider values
function customSlider() {
    //Get the percentage
    const val = (slider.value / audio.duration) * 100 + "%";
    //Set the thumb and progress to the current value
    progress.style.width = val;
    thumb.style.left = val;
    //Output the audio current time
    setTime(time, slider.value);
    //Set audio current time to slider value
    audio.currentTime = slider.value;
}


//Call function initially 
customSlider();
// Repeat the function when the slider is selected 
slider.addEventListener("input", customSlider);


//Functionality for volume slider 

let val;

// Volume Slider 
 function customVolumeSlider() {
    //Get max attribute value from slider
    const maxval = volumeSlider.getAttribute("max")
    //Get the percentage
    val = (volumeSlider.value / maxval ) * 100 + "%"
    //Set the thumb and progress to the current value
    volumeProgress.style.width = val;
    //Set the audio volume to current value
    audio.volume = volumeSlider.value / 100;

    //Change volume icons//

    //If the volume is high 
    if(audio.volume > 0.5) {
        //set the volume up icon
        volumeIcon.innerHTML = `
       <span class="material-symbols-outlined">
       volume_up </span>
        `
    } 

    //If the volume is muted 
    else if(audio.volume === 0) {
       //Set the mute icon
       volumeIcon.innerHTML = `
        <span class="material-symbols-outlined">
       volume_off </span>
       `
   }
    //if the volume is low
   else {
        //Set the volume down icon
        volumeIcon.innerHTML = `
       <span class="material-symbols-outlined">
       volume_down
        </span>
     `
   }
}

//Run the volume slider function 
customVolumeSlider();

/* Run the function again on when the volume slider is selected */
volumeSlider.addEventListener("input", customVolumeSlider);

//Add a click event to the volume icon
volumeIcon.addEventListener('click', () => {
    //If the volume is not muted
    if(volumeMuted === false) {
        //Set the muted volume icon
        volumeIcon.innerHTML = `
        <span class="material-symbols-outlined">
        volume_off
         </span>
      `
      //Mute the audio 
      audio.volume = 0;
      //Set the volume slider to zero
      volumeProgress.style.width = 0;
      /*Set the volumeMuted to true, 
      because the volume is now muted */
      volumeMuted = true;
    }

    //If the volume is muted 
    else  
        {
        //Set the volume down icon
        volumeIcon.innerHTML = `
        <span class="material-symbols-outlined">
        volume_down
         </span>
        `
        /* Unmute the volume by setting it to anything above zero */
        audio.volume = 0.5;
        /* Set the volume progress slider to the current value */
        volumeProgress.style.width = val;
        /* Set the volumeMuted to false, because the volume is no longer muted */
        volumeMuted = false
    }

});


/* Finally!!!!!!!!!!!!!!! */





