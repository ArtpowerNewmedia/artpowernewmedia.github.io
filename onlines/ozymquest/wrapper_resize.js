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

    // 寬度或高度可能會有小數點，導致畫面沒塞滿有縫，因此CSS一定要使用Cover模式
    // console.log(`mobileWidth: ${mobileWidth} , contentWidth: ${contentWidth}`);
    // console.log(`mobileHeight: ${mobileHeight} , contentHeight: ${contentHeight}`);
}

function resizeCoverOverflow() {
    var content = document.querySelector('.main-container');

    // 讀取css版面比例
    var aspectRatio = 9/16; // 直接寫入數值
    
    var mobileWidth = window.innerWidth;
    var mobileHeight = window.innerHeight;
    
    // 計算 cover 效果：確保內容完全顯示在視窗內
    var contentWidth, contentHeight;
    
    // 以視窗寬度為基準, 但也不能過寬(例如平板)，限制比例為1.2，這個值可以調整
    contentWidth = Math.min(mobileWidth, (mobileHeight * aspectRatio) * 1.2);
    contentHeight = contentWidth / aspectRatio;
    
    // 設定 content 的尺寸
    content.style.width = contentWidth + 'px';
    content.style.height = contentHeight + 'px';
    content.style.opacity = 1;
}

function resizeCoverScale() {
    var content = document.querySelector('.main-container');

    // 讀取css版面比例
    var aspectRatio = 9/16; // 直接寫入數值
    
    var mobileWidth = window.innerWidth;
    var mobileHeight = window.innerHeight;
    
    // 計算 cover 效果：確保內容完全顯示在視窗內
    var contentWidth, contentHeight;
    
    contentWidth = Math.max(mobileWidth, mobileHeight * aspectRatio) * 1.05;
    contentHeight = Math.max(mobileHeight, mobileWidth / aspectRatio) * 1.05;
    
    // 設定 content 的尺寸
    content.style.width = contentWidth + 'px';
    content.style.height = contentHeight + 'px';
    content.style.opacity = 1;
}

window.addEventListener('resize', resizeCoverScale);
window.addEventListener('load', resizeCoverScale);