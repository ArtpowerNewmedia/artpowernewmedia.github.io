// ========================================
// 狀態管理
// ========================================
const AppState = {
  language: 'zh',
  currentDiv: null,
  currentAnswer: null,
  currentQuestion: 1,
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

// ========================================
// 狀態更新函數
// ========================================

/**
 * 更新語言狀態
 * @param {string} lang - 語言代碼 ('zh' 或 'en')
 */
function updateLanguage(lang) {
    AppState.language = lang;
    console.log('語言已切換為:', lang);
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

function btn_answerA() {
    AppState.currentAnswer = 'A';
    document.getElementById('page-answer').dataset.page = 'a' + AppState.currentQuestion;
    goto_page('page-answer');
    
}
function btn_answerB() {
    AppState.currentAnswer = 'B';
    document.getElementById('page-answer').dataset.page = 'a' + AppState.currentQuestion;
    goto_page('page-answer');
}
function btn_answerC() {
    AppState.currentAnswer = 'C';
    document.getElementById('page-answer').dataset.page = 'a' + AppState.currentQuestion;
    goto_page('page-answer');
}
function enter_game() {
    AppState.currentQuestion = 1;
    let random = Math.floor(Math.random() * 5) * 5;
    goto_page('page-q' + (AppState.currentQuestion + random));
}
function btn_continue() {
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
    let btn_redeem = document.getElementById('redeem_btn');
    btn_redeem.classList.add('hidden');
}

// ========================================
// 事件處理
// ========================================

window.onload = function() {
    const homePage = document.getElementById('page-home');
    updateCurrentDiv(homePage);

    // 測試跳頁頁面
    // AppState.currentQuestion = 5;
    // goto_page('page-q5');
};