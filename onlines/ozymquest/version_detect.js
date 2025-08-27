// 瀏覽器相容性檢測
function checkBrowserCompatibility() {
    var isCompatible = true;
    var missingFeatures = [];
    
    // 檢測 CSS 變數支援
    // if (!CSS.supports('--custom-property', 'value')) {
    //     isCompatible = false;
    //     missingFeatures.push('CSS 變數');
    // }
    
    // 檢測 Flexbox 支援
    if (!CSS.supports('display', 'flex')) {
        isCompatible = false;
        missingFeatures.push('Flexbox 佈局');
    }
    
    // 檢測 object-fit 支援
    if (!CSS.supports('object-fit', 'contain')) {
        isCompatible = false;
        missingFeatures.push('object-fit 屬性');
    }
    
    // 檢測 transform-origin 支援
    if (!CSS.supports('transform-origin', 'center center')) {
        isCompatible = false;
        missingFeatures.push('transform-origin 屬性');
    }
    
    // 檢測 filter 支援 (drop-shadow)
    if (!CSS.supports('filter', 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4))')) {
        isCompatible = false;
        missingFeatures.push('CSS filter 效果');
    }
    
    // 如果檢測到不相容，顯示警告
    if (!isCompatible) {
        var message = '您的瀏覽器版本過舊，不支援以下功能：\n\n';
        message += missingFeatures.join('\n');
        message += '\n\n請更新您的瀏覽器到 2016 年之後的版本，以獲得最佳體驗。';
        
        alert(message);
        
        // 可選：在頁面上顯示警告訊息
        showCompatibilityWarning(missingFeatures);
    }
    
    return isCompatible;
}

// 在頁面上顯示相容性警告
function showCompatibilityWarning(missingFeatures) {
    var warningDiv = document.createElement('div');
    warningDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background-color: #ff6b6b;
        color: white;
        padding: 15px;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        z-index: 9999;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    `;
    
    warningDiv.innerHTML = `
        ⚠️ 瀏覽器相容性警告：您的瀏覽器已不支援此網站，可能無法正確顯示<br>
        建議更新到 2016 年之後的瀏覽器版本
    `;
    
    document.body.appendChild(warningDiv);
}

// 頁面載入時執行相容性檢測
window.addEventListener('load', function() {
    checkBrowserCompatibility();
});
