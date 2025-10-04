/**
 * 777スロット天国 - ロト6ジャックポット制度
 * インタラクティブ機能とアニメーション
 */

// ページ読み込み完了時の初期化
document.addEventListener('DOMContentLoaded', function() {
    console.log('777スロット天国 - ジャックポットページが正常に読み込まれました！');
    
    // 各機能を初期化
    initJackpotAnimation();
    initScrollAnimations();
    initRippleEffects();
    initCountAnimation();
    initVideoOptimization();
    
    console.log('🎰 777スロット天国の全機能が正常に初期化されました！');
});

/**
 * ジャックポット金額のリアルタイム更新アニメーション
 */
function initJackpotAnimation() {
    const superJackpot = document.getElementById('superJackpot');
    const miniJackpot = document.getElementById('miniJackpot');
    const totalWinnings = document.getElementById('totalWinnings');
    
    // 初期値
    let superAmount = 456789000;
    let miniAmount = 12345000;
    let totalAmount = 24567890000;
    
    // 30秒ごとに金額を更新
    setInterval(() => {
        // スーパージャックポット: 10,000〜50,000円追加
        superAmount += Math.floor(Math.random() * 40000) + 10000;
        
        // ミニジャックポット: 1,000〜10,000円追加
        miniAmount += Math.floor(Math.random() * 9000) + 1000;
        
        // 総当選額: 100,000〜500,000円追加
        totalAmount += Math.floor(Math.random() * 400000) + 100000;
        
        // アニメーション付きで更新
        animateAmountUpdate(superJackpot, superAmount);
        animateAmountUpdate(miniJackpot, miniAmount);
        animateAmountUpdate(totalWinnings, totalAmount);
        
        console.log('💰 ジャックポット金額が更新されました');
    }, 30000); // 30秒間隔
}

/**
 * 金額更新アニメーション
 */
function animateAmountUpdate(element, newAmount) {
    if (!element) return;
    
    // カウントアップアニメーション
    const oldText = element.textContent;
    element.style.transform = 'scale(1.05)';
    element.style.color = '#ff6b6b';
    
    setTimeout(() => {
        element.textContent = '¥' + newAmount.toLocaleString();
        element.style.transform = 'scale(1)';
        element.style.color = '#e53e3e';
    }, 300);
}

/**
 * スクロール連動アニメーション
 */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // アニメーション対象要素を監視
    const animateElements = document.querySelectorAll('.feature-card, .step-card, .product-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    console.log('🎨 スクロールアニメーションが初期化されました');
}

/**
 * リップル効果の初期化
 */
function initRippleEffects() {
    const rippleButtons = document.querySelectorAll('.ripple-effect');
    
    rippleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });
    
    console.log('✨ リップル効果が初期化されました');
}

/**
 * リップル効果の作成
 */
function createRipple(event, element) {
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    `;
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * カウントアップアニメーション
 */
function initCountAnimation() {
    const countElements = document.querySelectorAll('.amount-value, .stats-amount');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    countElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * カウントアップ実行
 */
function animateCount(element) {
    const text = element.textContent;
    const match = text.match(/¥([\d,]+)/);
    if (!match) return;
    
    const finalValue = parseInt(match[1].replace(/,/g, ''));
    const duration = 2000; // 2秒
    const startTime = performance.now();
    
    function updateCount(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // イージング関数
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(finalValue * easeOut);
        
        element.textContent = '¥' + currentValue.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCount);
        }
    }
    
    requestAnimationFrame(updateCount);
}

/**
 * 動画最適化
 */
function initVideoOptimization() {
    const heroVideo = document.getElementById('heroVideo');
    
    if (heroVideo) {
        // モバイルデバイスでの最適化
        if (window.innerWidth <= 768) {
            heroVideo.setAttribute('preload', 'metadata');
        }
        
        // 動画読み込みエラー処理
        heroVideo.addEventListener('error', function() {
            console.warn('動画の読み込みに失敗しました。背景画像にフォールバック。');
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                heroSection.style.background = 'linear-gradient(45deg, #e53e3e, #9b2c2c)';
            }
        });
        
        // 動画読み込み完了
        heroVideo.addEventListener('loadeddata', function() {
            console.log('🎬 ヘッダー動画が正常に読み込まれました');
        });
    }
}

/**
 * スムーススクロール
 */
function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

/**
 * パーティクル背景効果（軽量版）
 */
function initParticleEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // パフォーマンスを考慮して軽量版のパーティクル
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            animation: float ${5 + Math.random() * 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            z-index: 0;
        `;
        hero.appendChild(particle);
    }
}

/**
 * フォーム検証（将来の機能拡張用）
 */
function validateForm(formData) {
    const errors = [];
    
    // メール検証
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.push('有効なメールアドレスを入力してください');
    }
    
    // 金額検証
    if (formData.amount && (formData.amount < 20000 || formData.amount % 20000 !== 0)) {
        errors.push('ベット金額は200,00円の倍数で入力してください');
    }
    
    return errors;
}

/**
 * ローカルストレージ管理
 */
const StorageManager = {
    setItem(key, value) {
        try {
            localStorage.setItem(`777slot_${key}`, JSON.stringify(value));
        } catch (e) {
            console.warn('ローカルストレージへの保存に失敗しました:', e);
        }
    },
    
    getItem(key) {
        try {
            const item = localStorage.getItem(`777slot_${key}`);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.warn('ローカルストレージからの読み込みに失敗しました:', e);
            return null;
        }
    },
    
    removeItem(key) {
        try {
            localStorage.removeItem(`777slot_${key}`);
        } catch (e) {
            console.warn('ローカルストレージからの削除に失敗しました:', e);
        }
    }
};

/**
 * パフォーマンス監視
 */
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loadTime = performance.now();
                console.log(`🚀 ページ読み込み時間: ${loadTime.toFixed(1)}ms`);
                
                // 3秒以上かかった場合は警告
                if (loadTime > 3000) {
                    console.warn('⚠️ ページの読み込み時間が長すぎます。最適化が必要です。');
                }
            }, 0);
        });
    }
}

/**
 * エラーハンドリング
 */
window.addEventListener('error', function(e) {
    console.error('JavaScriptエラーが発生しました:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('未処理のPromiseエラーが発生しました:', e.reason);
});

// CSS アニメーション用スタイルを動的に追加
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
            opacity: 0.3;
        }
        50% {
            transform: translateY(-20px);
            opacity: 0.8;
        }
    }
    
    .particle {
        pointer-events: none;
    }
`;
document.head.appendChild(style);

// パフォーマンス監視開始
monitorPerformance();

// グローバル関数として公開
window.scrollToSection = scrollToSection;
window.StorageManager = StorageManager;
