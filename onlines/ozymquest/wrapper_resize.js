function resizeContain() {
    var content = document.querySelector('.main-container');
    
    // 讀取css版面比例
    //var aspectRatio = eval(getComputedStyle(document.documentElement).getPropertyValue('--canvas-width-height-ratio'));
    var aspectRatio = 9/16; // 直接寫入數值
    
    var mobileWidth = window.innerWidth;
    var mobileHeight = window.innerHeight;
    
    // 計算 contain 效果：確保內容完全顯示在視窗內
    var contentWidth, contentHeight;
    
    // 以視窗較窄的情況為基準
    contentWidth = Math.min(mobileWidth, mobileHeight * aspectRatio);
    contentHeight = Math.min(mobileHeight, mobileWidth / aspectRatio);
    
    // 設定 content 的尺寸
    content.style.width = contentWidth + 'px';
    content.style.height = contentHeight + 'px';
    content.style.opacity = 1;
}

window.addEventListener('resize', resizeContain);
window.addEventListener('load', resizeContain);