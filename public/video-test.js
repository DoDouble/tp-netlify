const videoPlayer = document.getElementById("vid1");

const annotationBox = document.getElementById('annotation-box');

const playBtns = document.querySelectorAll(".playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const seekBar = document.getElementById('seek-bar');

let timecodesBySeconds = [];

function hmsToSecondsOnly(str) {
    var p = str.split(':'),
        s = 0, m = 1;

    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
    }

    return s;
}

playBtns.forEach((el) => {
    el.addEventListener('click', () => {
        videoPlayer.play();
    });
});

pauseBtn.addEventListener('click', () => {
    videoPlayer.pause();
});

let throttle = 0;

// Update seek bar as video plays
videoPlayer.addEventListener('timeupdate', () => {
    const currentTime = videoPlayer.currentTime;
    const duration = videoPlayer.duration;
    const progress = (currentTime / duration) * 100;
    seekBar.value = progress;
    throttle++;
    // console.log('throttle:', throttle, 'currentTime:', currentTime);
    // if (throttle == 10) {
    //     console.log('timecodesBySeconds:', timecodesBySeconds);
    //     throttle = 0;
    // }

    timecodesBySeconds.forEach((timecode) => {
        if (currentTime < timecode[0])
            timecode[2] = false;

        if (currentTime >= timecode[0] && ! timecode[2]) {
            timecode[2] = true;
            videoPlayer.pause();
            displayTimecodeAnnotation(timecode[1]);
        }
    });
});

const timecodes = document.querySelectorAll('.timecode');

function displayTimecodeAnnotation(timecodeId) {
    const timecode = document.getElementById(timecodeId);
    const time = hmsToSecondsOnly(timecode.dataset.time);
    const annotation = timecode.querySelector('.timecode_details').innerText;
    annotationBox.innerText = annotation;
}

timecodes.forEach((el) => {
    if (! el.dataset || typeof el.dataset === 'undefined' || el.dataset === null)
        return;

    let time = el.dataset.time;

    if (typeof time === 'undefined' || time === null)
        return;

    time = hmsToSecondsOnly(time);

    timecodesBySeconds.push([time, el.id, false]);

    el.addEventListener('click', (e) => {
        videoPlayer.pause();
        // videoPlayer.fastSeek(time);
        videoPlayer.currentTime = time;
        displayTimecodeAnnotation(el.id);
    }, true);
});