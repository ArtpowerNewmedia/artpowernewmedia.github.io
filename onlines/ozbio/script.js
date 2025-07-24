// ========================================
// 全域變數
// ========================================
//const socket  = io('https://192.168.50.28:3000');
const socket  = io('https://nodeozbio-production.up.railway.app/');
var formData = {};
var captureData = {};

// ========================================
// 頁面初始化
// ========================================
window.onload = function() {
    // 預載入背景圖片,與html preload 選用其一
    //preloadBackgroundImages();
    
    switchPage('form');
    //switchPage('result');

    //loadImageToResultImg('dummy_result.png');
    
    // 初始化長按保存功能
    //setupLongPressSave();
}

// 預載入背景圖片
function preloadBackgroundImages() {
    const imageUrls = [
        '01.jpg',
        '02.png', 
        '03.png',
        '04.png'
    ];
    
    const preloadedImages = [];
    
    imageUrls.forEach((url, index) => {
        const img = new Image();
        img.onload = function() {
            console.log('圖片預載入完成:', url);
            preloadedImages[index] = img;
        };
        img.onerror = function() {
            console.error('圖片預載入失敗:', url);
        };
        img.src = url;
    });
    
    return preloadedImages;
}

// ========================================
// 頁面切換功能
// ========================================
// 頁面切換器
function switchPage(pageName) {
    const backgroundContainer = document.querySelector('.background-container');
    const formContainer = document.querySelector('.form-container');
    const cameraWorkContainer = document.querySelector('.camera-work-container');
    const confirmContainer = document.querySelector('.camera-confirm-container');

    const canvas = document.getElementById('canvas');
    
    // 重置所有顯示狀態
    formContainer.style.display = 'none';
    cameraWorkContainer.style.display = 'none';
    confirmContainer.style.display = 'none';

    // 重置相機元素狀態
    canvas.classList.add('hidden');
    
    // 預先設定背景圖片，避免載入延遲
    const backgroundImages = {
        'form': '01.jpg',
        'camera': '02.png',
        'confirm': '03.png',
        'result': '04.png'
    };
    
    // 立即設定背景圖片
    if (backgroundImages[pageName]) {
        backgroundContainer.style.backgroundImage = `url(${backgroundImages[pageName]})`;
    }
    
    switch(pageName) {
        case 'form':
            formContainer.style.display = 'block';
            break;
            
        case 'camera':
            cameraWorkContainer.style.display = 'block';
            break;
            
        case 'confirm':
            confirmContainer.style.display = 'block';
            canvas.classList.remove('hidden');
            break;
            
        case 'result':
            const resultContainer = document.querySelector('.result-container');
            resultContainer.style.display = 'block';
            break;
            
        default:
            console.error('未知的頁面名稱:', pageName);
    }
}

// ========================================
// 表單處理功能
// ========================================
// 送出表單
function submitForm() {
    // 只有在formData沒有值時才從input獲取值
    if (!formData.name) {
        formData.name = document.querySelectorAll('.form-input')[0].value;
        formData.company = document.querySelectorAll('.form-input')[1].value;
        formData.phone = document.querySelectorAll('.form-input')[2].value;
    }

    switchPage('camera');
    startCamera();
}

// ========================================
// 相機功能
// ========================================
// 啟動前鏡頭
async function startCamera() {
    try {
        const video = document.getElementById('camera');
        
        // 檢查是否支援 getUserMedia
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error('瀏覽器不支援相機功能');
        }
        
        // 先嘗試前鏡頭
        let stream = await navigator.mediaDevices.getUserMedia({
            video: { 
                facingMode: 'user'
            },
            audio: false
        });
        
        video.srcObject = stream;
        video.play();
        
    } catch (err) {
        console.error('相機存取錯誤:', err);
        
        // 如果是權限錯誤，提供替代方案
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
            alert('相機權限被拒絕。\n\n解決方案：\n1. 重新整理頁面並允許權限\n2. 不要透過通訊軟體(Line、FB)開啟連結\n3. 若是電腦版，點擊網址列左側的鎖頭圖示，允許相機權限');
            return;
        }
        
        // 如果是 HTTPS 錯誤，提供替代方案
        if (err.name === 'NotSupportedError' && location.protocol === 'http:') {
            alert('相機功能需要 HTTPS 連線。\n\n解決方案：\n1. 使用自簽憑證建立node https server');
            return;
        }
        
        // 如果前鏡頭失敗，嘗試後鏡頭
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { 
                    facingMode: 'environment'
                },
                audio: false
            });
            
            const video = document.getElementById('camera');
            video.srcObject = stream;
            video.play();
            
        } catch (err2) {
            console.error('後鏡頭也失敗:', err2);
            alert('無法存取相機，請確認已授權相機權限。\n錯誤：' + err.message);
        }
    }
}

function stopCamera() {
    const video = document.getElementById('camera');
    video.srcObject.getTracks().forEach(track => track.stop());
    video.srcObject = null;
    video.classList.add('hidden');
}

function takeSnapshot () {
    const video = document.getElementById('camera');
    const canvas = document.createElement('canvas');
    canvas.width  = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    return canvas.toDataURL('image/png');           // 產生 base64
}

function submitCamera() {
    const canvas = document.getElementById('canvas');
    const video = document.getElementById('camera');
    
    // 設定 canvas 尺寸
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    
    // 繪製當前視訊畫面到 canvas
    ctx.drawImage(video, 0, 0);

    captureData = canvas.toDataURL('image/jpeg');
    
    // 顯示截圖的 canvas
    canvas.classList.remove('hidden');
    
    switchPage('confirm');
}

function submitOK() {
    // 將影像和表單資料傳送到伺服器
    socket.emit('photo', { 
        dataUrl: captureData,
        name: formData.name,
        company: formData.company,
        phone: formData.phone
    });
    
    switchPage('result');
    stopCamera();
}

function submitNG() {
    // 隱藏 canvas
    const canvas = document.getElementById('canvas');
    canvas.classList.add('hidden');
    
    switchPage('camera');
}

// ========================================
// 圖片處理功能
// ========================================
// 讀取並顯示 PNG 影像到 result-image
function loadImageToResultImg(imagePath) {
    const myImg = document.getElementById('result-image');
    
    // 設定影像來源
    myImg.src = imagePath;
}

// ========================================
// Socket 事件處理
// ========================================
// 接收照片事件
socket.on('masterAction', (data) => {
    try {
        console.log(`收到照片，UUID: ${data.uuid}`);
        console.log('接收到的資料類型:', typeof data.imageData);
        console.log('接收到的資料結構:', data.imageData);
        console.log('資料長度:', data.imageData ? data.imageData.length : 'undefined');
        
        // 處理不同可能的資料格式
        let imageArray;
        
        if (Array.isArray(data.imageData)) {
            // 如果已經是陣列，直接使用
            imageArray = data.imageData;
            console.log('使用陣列格式');
        } else if (data.imageData && typeof data.imageData === 'object') {
            // 如果是物件，可能是序列化後的格式
            // 嘗試轉換為陣列
            imageArray = Object.values(data.imageData);
            console.log('轉換物件為陣列');
        } else if (typeof data.imageData === 'string') {
            // 如果是字串，可能是 base64 格式
            console.log('檢測到字串格式，可能是 base64');
            const imageUrl = `data:image/jpeg;base64,${data.imageData}`;
            document.getElementById('result-image').src = imageUrl;
            return;
        } else {
            throw new Error(`不支援的資料格式: ${typeof data.imageData}`);
        }
        
        // 確保所有元素都是數字
        if (!imageArray.every(item => typeof item === 'number' && item >= 0 && item <= 255)) {
            throw new Error('陣列包含無效的位元組值');
        }
        
        // 將 byte array 轉換為 base64
        let base64String;
        try {
            // 方法1: 使用 apply (適用於較小的陣列)
            if (imageArray.length <= 65536) {
                base64String = btoa(String.fromCharCode.apply(null, imageArray));
            } else {
                // 方法2: 對於大陣列，分段處理
                const chunks = [];
                for (let i = 0; i < imageArray.length; i += 65536) {
                    const chunk = imageArray.slice(i, i + 65536);
                    chunks.push(String.fromCharCode.apply(null, chunk));
                }
                base64String = btoa(chunks.join(''));
            }
        } catch (applyError) {
            // 方法3: 如果 apply 失敗，使用 Uint8Array
            console.log('apply 方法失敗，使用 Uint8Array 方法');
            const uint8Array = new Uint8Array(imageArray);
            const binaryString = Array.from(uint8Array, byte => String.fromCharCode(byte)).join('');
            base64String = btoa(binaryString);
        }
        
        const imageUrl = `data:image/jpeg;base64,${base64String}`;
        
        // 顯示照片
        document.getElementById('result-image').src = imageUrl;
        console.log('照片處理完成');
        
    } catch (error) {
        console.log(`處理照片時發生錯誤: ${error.message}`);
        console.error('完整錯誤:', error);
        console.error('錯誤堆疊:', error.stack);
    }
});

// ========================================
// 事件監聽器
// ========================================
// 測試快捷鍵：按 q 鍵切換 background-container 顯示/隱藏
document.addEventListener('keydown', function(event) {
    if (event.key === 'q' || event.key === 'Q') {
        const backgroundContainer = document.querySelector('.background-container');
        if (backgroundContainer.style.display === 'none') {
            backgroundContainer.style.display = 'block';
            console.log('background-container 已顯示');
        } else {
            backgroundContainer.style.display = 'none';
            console.log('background-container 已隱藏');
        }
    }
});
