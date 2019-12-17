(function(){
    const PREVIEW_COUNT = 20;
    const PREVIEW_INTERVAL = 750;
    const VIDEO_WIDTH = 700;

    let index = 0;
    let timeout = null;

    function init(){
        document.querySelectorAll('video[data-handler="DaboxVideo"]').forEach(function(pVideo){
            pVideo.addEventListener('loadeddata', dataHandler);
            pVideo.addEventListener('mouseover', overHandler);
            pVideo.addEventListener('mouseout', outHandler);
            pVideo.addEventListener('click', clickHandler);
        });
    }

    function dataHandler(e){
        let duration = e.currentTarget.duration;
        let minutes = Math.floor(duration / 60);
        let secondes = Math.round((duration-(minutes*60)));
        let container = e.currentTarget.parentNode;
        container.style.width = e.currentTarget.offsetWidth+"px";
        container.style.height = e.currentTarget.offsetHeight+"px";
        let span = document.createElement("span");
        span.classList.add("duration");
        span.innerHTML = minutes+":"+secondes;
        container.appendChild(span);
    }

    function clickHandler(e){
        let width = Number(e.currentTarget.dataset.videoWidth||VIDEO_WIDTH);
        Dabox.onClose(function(){document.querySelector('#dabox_current_video').pause();});
        Dabox.display('<video width="'+width+'" controls autoplay id="dabox_current_video"><source src="'+e.currentTarget.currentSrc+'"></video>');
    }

    function overHandler(e){
        let video = e.currentTarget;
        let count = Number(e.currentTarget.dataset.previewCount||PREVIEW_COUNT);
        let interval = Number(e.currentTarget.dataset.previewInterval||PREVIEW_INTERVAL);
        let distance = e.currentTarget.duration / (count + 1);
        timeout = setInterval(()=>{
            if(index===count){
                index = 0;
            }else{
                index++;
            }
            video.currentTime = index * distance;

        }, interval);
    }

    function outHandler(e){
        clearInterval(timeout);
        e.currentTarget.currentTime = 0;
        index = 0;
    }

    window.addEventListener('DOMContentLoaded', init, false);
})();

NodeList.prototype.forEach = Array.prototype.forEach;