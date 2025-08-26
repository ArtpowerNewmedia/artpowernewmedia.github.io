// ========================================
// 狀態管理
// ========================================
const AppState = {
  language: 'zh',
  currentDiv: null,
  currentAnswer: null,
  currentQuestion: 1,
  isAnswering: false,
};

// ========================================
// 常數配置
// ========================================
const LANGUAGE_PATHS = {
    zh: 'ui/chinese/',
    en: 'ui/english/'
};

const PAGE_BACKGROUNDS = {
    howto: 'howto.jpg',
    menu: 'menu.jpg',
    finished: 'finished.jpg',
    q1: 'quest/01/01Q.jpg',
    q2: 'quest/02/02Q.jpg',
    q3: 'quest/03/03Q.jpg',
    q4: 'quest/04/04Q.jpg',
    q5: 'quest/05/05Q.jpg',
    q6: 'quest/06/06Q.jpg',
    q7: 'quest/07/07Q.jpg',
    q8: 'quest/08/08Q.jpg',
    q9: 'quest/09/09Q.jpg',
    q10: 'quest/10/10Q.jpg',
    q11: 'quest/11/11Q.jpg',
    q12: 'quest/12/12Q.jpg',
    q13: 'quest/13/13Q.jpg',
    q14: 'quest/14/14Q.jpg',
    q15: 'quest/15/15Q.jpg',
    q16: 'quest/16/16Q.jpg',
    q17: 'quest/17/17Q.jpg',
    q18: 'quest/18/18Q.jpg',
    q19: 'quest/19/19Q.jpg',
    q20: 'quest/20/20Q.jpg',
    q21: 'quest/21/21Q.jpg',
    q22: 'quest/22/22Q.jpg',
    q23: 'quest/23/23Q.jpg',
    q24: 'quest/24/24Q.jpg',
    q25: 'quest/25/25Q.jpg',
    a1: 'quest/01/01A.jpg',
    a2: 'quest/02/02A.jpg',
    a3: 'quest/03/03A.jpg',
    a4: 'quest/04/04A.jpg',
    a5: 'quest/05/05A.jpg',
    a6: 'quest/06/06A.jpg',
    a7: 'quest/07/07A.jpg', 
    a8: 'quest/08/08A.jpg',
    a9: 'quest/09/09A.jpg',
    a10: 'quest/10/10A.jpg',
    a11: 'quest/11/11A.jpg',
    a12: 'quest/12/12A.jpg',
    a13: 'quest/13/13A.jpg',
    a14: 'quest/14/14A.jpg',
    a15: 'quest/15/15A.jpg',
    a16: 'quest/16/16A.jpg',
    a17: 'quest/17/17A.jpg',
    a18: 'quest/18/18A.jpg',
    a19: 'quest/19/19A.jpg',
    a20: 'quest/20/20A.jpg',
    a21: 'quest/21/21A.jpg',
    a22: 'quest/22/22A.jpg',
    a23: 'quest/23/23A.jpg',
    a24: 'quest/24/24A.jpg',
    a25: 'quest/25/25A.jpg',
};

const QUESTION_ANSWER = {
    1: 'B',
    2: 'A',
    3: 'A',
    4: 'A',
    5: 'B',
    6: 'C',
    7: 'A',
    8: 'B',
    9: 'C',
    10: 'C',
    11: 'B',
    12: 'C',
    13: 'B',
    14: 'A',
    15: 'B',
    16: 'A',
    17: 'A',
    18: 'B',
    19: 'C',
    20: 'A',
    21: 'B',
    22: 'C',
    23: 'A',
    24: 'B',
    25: 'C',
};

// ========================================
// 狀態更新函數
// ========================================

/**
 * 更新語言狀態
 * @param {string} lang - 語言代碼 ('zh' 或 'en')
 */
function updateLanguage(lang) {
    AppState.language = lang;
    console.log('語言變數已更新為:', lang);
}

/**
 * 更新當前DOM元素狀態
 * @param {HTMLElement} div - DOM元素
 */
function updateCurrentDiv(div) {
    AppState.currentDiv = div;
}

// ========================================
// 核心功能函數
// ========================================

/**
 * 切換語言
 * @param {string} lang - 語言代碼 ('zh' 或 'en')
 */
function switchLanguage(lang) {
    updateLanguage(lang);
    updateImagePaths(lang);
    console.log('語言已切換為:', lang);
}

/**
 * 更新所有圖片的語言路徑
 * @param {string} lang - 語言代碼 ('zh' 或 'en')
 */
function updateImagePaths(lang) {
    const targetPath = lang === 'zh' ? 'ui/chinese/' : 'ui/english/';
    const currentPath = lang === 'zh' ? 'ui/english/' : 'ui/chinese/';
    
    // 更新所有 img 標籤的 src 屬性
    const images = document.querySelectorAll('img[src*="ui/chinese/"], img[src*="ui/english/"]');
    images.forEach(img => {
        if (img.src.includes(currentPath)) {
            img.src = img.src.replace(currentPath, targetPath);
        }
    });
}

/**
 * 更新所有頁面的背景圖片
 */
function updateBackgrounds() {
    const mainContainer = document.querySelector('.main-container');
    const langPath = LANGUAGE_PATHS[AppState.language];
    const pageName = PAGE_BACKGROUNDS[AppState.currentDiv.dataset.page];
    const imagePath = langPath + pageName;

    mainContainer.style.backgroundImage = `url('${imagePath}')`;
}

/**
 * 頁面顯示時的處理
 */
function on_page_show() {
    updateBackgrounds();

    if(AppState.currentDiv.dataset.page == 'menu') {
        if(AppState.currentQuestion > 5) {
            let btn_next = document.getElementById('next_btn');
            btn_next.classList.add('hidden');
            let btn_congrats = document.getElementById('congrats_btn');
            btn_congrats.classList.remove('hidden');

            setTimeout(() => {
                goto_page('page-finished');
            }, 2500);
        }
    }
}

/**
 * 切換到指定頁面
 * @param {string} page - 頁面ID
 */
function goto_page(page) {
    try {
        if (!page) {
            throw new Error('頁面ID不能為空');
        }

        const targetDiv = document.getElementById(page);
        if (!targetDiv) {
            throw new Error(`找不到頁面: ${page}`);
        }

        // 隱藏當前頁面
        if (AppState.currentDiv) {
            AppState.currentDiv.classList.add('hidden');
        }

        // 顯示目標頁面
        targetDiv.classList.remove('hidden');
        updateCurrentDiv(targetDiv);
        
        on_page_show();
        
        console.log(`成功切換到頁面: ${page}`);
    } catch (error) {
        console.error('頁面切換失敗:', error);
    }
}

// ========================================
// 按鈕事件函數
// ========================================

function enter_chinese() {
    switchLanguage('zh');
    console.log('進入中文版');
    goto_page('page-howto');
}

function enter_english() {
    switchLanguage('en');
    console.log('Enter English version');
    goto_page('page-howto');
}

function btn_test() {
    let c_page = AppState.currentDiv.id;
    let next_page = c_page.replace(/q(\d+)/, (match, num) => 'q' + (parseInt(num) + 1));

    goto_page(next_page);

    // 檢查是否有test_btn，如果有則移動到新頁面
    const testBtn = document.getElementById('test_btn');
    if (testBtn) {
        let targetDiv = document.getElementById(next_page);
        targetDiv.appendChild(testBtn);
    }
}

function btn_answer(answer, buttonElement) {
    if (AppState.isAnswering) return; // 防止重複點擊
    console.log('玩家回答了:', answer);
    AppState.isAnswering = true;
    AppState.currentAnswer = answer;
    
    // 在按鈕前方顯示 O 或 X 圖片
    showAnswerIndicator(buttonElement, answer);
    
    document.getElementById('page-answer').dataset.page = 'a' + AppState.currentQuestion;
    setTimeout(() => {
        goto_page('page-answer');
        AppState.isAnswering = false; // 重置狀態
    }, 1000);
}

function btn_answerA() {
    // 獲取被點擊的按鈕元素
    const buttonElement = event.target.closest('.oz-btn');
    btn_answer('A', buttonElement);
}

function btn_answerB() {
    // 獲取被點擊的按鈕元素
    const buttonElement = event.target.closest('.oz-btn');
    btn_answer('B', buttonElement);
}

function btn_answerC() {
    // 獲取被點擊的按鈕元素
    const buttonElement = event.target.closest('.oz-btn');
    btn_answer('C', buttonElement);
}

/**
 * 在按鈕前方顯示答案指示器（O 或 X）
 * @param {HTMLElement} buttonElement - 被點擊的按鈕元素
 * @param {string} answer - 玩家的答案
 */
function showAnswerIndicator(buttonElement, answer) {
    if (!buttonElement) return;
    
    // 檢查答案是否正確
    const isCorrect = answer === QUESTION_ANSWER[AppState.currentQuestion];
    const imageSrc = isCorrect ? 'ui/o.png' : 'ui/x.png';
    
    // 創建 O 或 X 圖片元素
    const indicator_img = document.getElementById('answer_indicator_img');
    indicator_img.src = imageSrc;
    const indicator = document.getElementById('answer_indicator');
    indicator.classList.remove('hidden');
    let targetDiv = document.getElementById(AppState.currentDiv.id);
    if(targetDiv) targetDiv.appendChild(indicator);
    indicator.classList.add('blink');
    
    // 獲取按鈕的位置
    const buttonRect = buttonElement.getBoundingClientRect();
    const containerRect = buttonElement.closest('.page-container').getBoundingClientRect();
    
    // 計算 O/X 圖片的位置（在按鈕左側）
    const left = buttonRect.left - containerRect.left;
    const top = buttonRect.top - containerRect.top + (buttonRect.height / 2); // 按鈕垂直中心
    
    indicator.style.left = left + 'px';
    indicator.style.top = top + 'px';
    
    // 動畫結束後移除閃爍類別
    setTimeout(() => {
        indicator.classList.remove('blink');
    }, 600);
}

function enter_game() {
    AppState.currentQuestion = 1;
    let random = Math.floor(Math.random() * 5) * 5;
    goto_page('page-q' + (AppState.currentQuestion + random));
}
function btn_continue() {
    document.getElementById('lock_' + AppState.currentQuestion).classList.add('hidden');

    if(AppState.currentAnswer == QUESTION_ANSWER[AppState.currentQuestion]) {
        document.getElementById('stamp_' + AppState.currentQuestion).src = 'ui/stamp_0' + AppState.currentQuestion + '_unlocked.png';
        document.getElementById('unlocker_' + AppState.currentQuestion).classList.remove('hidden');
    } else {
        document.getElementById('stamp_' + AppState.currentQuestion).src = 'ui/stamp_0' + AppState.currentQuestion + '_failed.png';
        document.getElementById('lockfail_' + AppState.currentQuestion).classList.remove('hidden');
    }
    AppState.currentQuestion++;
    goto_page('page-menu');
}
function next_question() {
    if (AppState.currentQuestion <= 5) {
        let random = Math.floor(Math.random() * 5) * 5;
        goto_page('page-q' + (AppState.currentQuestion + random));
    } else {
        goto_page('page-finished');
    }
}
function btn_redeem() {
    // 初始化點擊計數器（如果不存在）
    if (!AppState.redeemClickCount) {
        AppState.redeemClickCount = 0;
    }
    
    // 增加點擊次數
    AppState.redeemClickCount++;
    
    // 檢查是否達到5次點擊
    if (AppState.redeemClickCount >= 5) {
        document.getElementById('redeem_btn').classList.add('hidden');
        document.getElementById('redeemed').classList.remove('hidden');
        // 重置計數器
        AppState.redeemClickCount = 0;
    }
}

// ========================================
// 事件處理
// ========================================

window.onload = function() {
    const homePage = document.getElementById('page-home');
    updateCurrentDiv(homePage);

    // 測試跳頁頁面
    // AppState.currentQuestion = 1;
    // AppState.language = 'en';
    // updateImagePaths(AppState.language);
    // goto_page('page-q' + AppState.currentQuestion);
    // goto_page('page-q1');
};