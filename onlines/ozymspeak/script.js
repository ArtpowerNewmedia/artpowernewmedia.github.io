
const AppState = {
    currentContainer: null,
    isPlaying: false,
    audioClip: null,
    audioPath: null,
    subContainers: null,
    currentSubIndex: null,
};

function StopAudio() {
    AppState.audioClip.pause();
    AppState.audioClip.currentTime = 0; // 重置播放時間
    AppState.isPlaying = false;
}

function toggleAudio(fileName) {
    let newPath = fileName + '.mp3';

    if (AppState.audioPath != newPath) {
        if(AppState.audioClip) AppState.audioClip.pause();
        AppState.audioClip = new Audio(newPath);
        AppState.audioClip.play();
        AppState.isPlaying = true;
        AppState.audioPath = newPath;

        // 監測播放結束事件，重置按鈕狀態
        AppState.audioClip.onended = () => {
            AppState.isPlaying = false;
        };

    } else {
        if(AppState.isPlaying) {
            StopAudio();
        } else {
            AppState.audioClip.play();
            AppState.isPlaying = true;
        }
    }
}

function resizeScrollBackground(content) {
    // load 最先執行，再來才是 onload
    if(content == null) return;
    
    var background = content.querySelector('.background');
    
    // 只設定高度，讓寬度自然適應內容
    content.style.height = background.offsetHeight + 'px';
}

window.addEventListener('resize', () => {console.log('event: resize'); resizeScrollBackground(AppState.currentContainer); });
window.addEventListener('load', () => {console.log('event: load'); resizeScrollBackground(AppState.currentContainer); });
window.onload = function() {
    console.log('event: onload');

    const urlParams = new URLSearchParams(window.location.search);
    const pageIndex = urlParams.get('page') || '6';
    const page = document.getElementById('page-' + pageIndex);
    AppState.currentContainer = page;

    SetupSubContainers(page);

    // console.log(page.offsetHeight); 在hidden 時，可見高度為0
    page.classList.remove('hidden');
    console.log(page.offsetHeight); //解除hidden後，可見高度為視窗高度
    //console.log(page.style.height); //沒有特別設置高度數值，高度為空值
    resizeScrollBackground(page);
    console.log(page.style.height); //js設置高度後，高度為設置的數值
}

function SetupSubContainers(page) {
    AppState.subContainers = page.querySelectorAll('.sub-container');
    if(AppState.subContainers.length <= 0) return;

    console.log('has sub containers: ' + AppState.subContainers.length);
    
    AppState.currentSubIndex = 0;
    // const backgroundElement = AppState.currentContainer.querySelector('.background');
    // backgroundElement.src = AppState.subContainers[AppState.currentSubIndex].dataset.background;

    // console.log('background: ' + backgroundElement.src);

    AppState.subContainers[AppState.currentSubIndex].classList.remove('hidden');
}

function nextSubPage() {
    const nextContainer = AppState.subContainers[AppState.currentSubIndex + 1];
    if(nextContainer == null) return;

    const subBackgrounds = AppState.currentContainer.querySelectorAll('.sub-background');
    subBackgrounds[AppState.currentSubIndex].classList.remove('background');
    subBackgrounds[AppState.currentSubIndex].classList.add('noshow');
    subBackgrounds[AppState.currentSubIndex + 1].classList.remove('noshow');
    subBackgrounds[AppState.currentSubIndex + 1].classList.add('background');

    // const backgroundElement = AppState.currentContainer.querySelector('.background');
    // backgroundElement.src = nextContainer.dataset.background;

    // console.log('background: ' + backgroundElement.src);

    AppState.subContainers[AppState.currentSubIndex].classList.add('hidden');
    AppState.currentSubIndex++;
    
    setTimeout(() => {
        window.scrollTo(0, 0);
        resizeScrollBackground(AppState.currentContainer);
        nextContainer.classList.remove('hidden');

        if(AppState.isPlaying) StopAudio();
    }, 1);
}

function backSubPage() {
    const backContainer = AppState.subContainers[AppState.currentSubIndex - 1];
    if(backContainer == null) return;

    const subBackgrounds = AppState.currentContainer.querySelectorAll('.sub-background');
    subBackgrounds[AppState.currentSubIndex].classList.remove('background');
    subBackgrounds[AppState.currentSubIndex].classList.add('noshow');
    subBackgrounds[AppState.currentSubIndex - 1].classList.remove('noshow');
    subBackgrounds[AppState.currentSubIndex - 1].classList.add('background');

    // const backgroundElement = AppState.currentContainer.querySelector('.background');
    // backgroundElement.src = backContainer.dataset.background;

    // console.log('background: ' + backgroundElement.src);

    AppState.subContainers[AppState.currentSubIndex].classList.add('hidden');
    AppState.currentSubIndex--;
    
    setTimeout(() => {
        window.scrollTo(0, 0);
        resizeScrollBackground(AppState.currentContainer);
        backContainer.classList.remove('hidden');

        if(AppState.isPlaying) StopAudio();
    }, 1);
}
