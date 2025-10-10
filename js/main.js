// スロット天国アフィリエイトページのメインJavaScript
document.addEventListener('DOMContentLoaded', function() {
    // カウンターアニメーション
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const increment = target / 200; // 200フレームで完了
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        
                        // フォーマット
                        if (counter.textContent.includes('¥')) {
                            counter.textContent = `¥${Math.floor(current).toLocaleString()}`;
                        } else if (counter.textContent.includes('名')) {
                            counter.textContent = `${Math.floor(current)}名`;
                        } else {
                            counter.textContent = `${Math.floor(current)}件`;
                        }
                    }, 10);
                    
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
    
    // 収益計算機
    function initCalculator() {
        const usersInput = document.getElementById('users');
        const betAmountInput = document.getElementById('bet-amount');
        const vipLevelSelect = document.getElementById('vip-level');
        const monthlyIncomeEl = document.getElementById('monthly-income');
        const yearlyIncomeEl = document.getElementById('yearly-income');
        
        function calculateIncome() {
            const users = parseInt(usersInput.value) || 0;
            const betAmount = parseInt(betAmountInput.value) || 0;
            const vipRate = parseFloat(vipLevelSelect.value) || 0;
            
            const monthlyIncome = users * betAmount * vipRate;
            const yearlyIncome = monthlyIncome * 12;
            
            monthlyIncomeEl.textContent = `¥${Math.floor(monthlyIncome).toLocaleString()}`;
            yearlyIncomeEl.textContent = `¥${Math.floor(yearlyIncome).toLocaleString()}`;
            
            updateChart(monthlyIncome);
        }
        
        // イベントリスナー
        usersInput.addEventListener('input', calculateIncome);
        betAmountInput.addEventListener('input', calculateIncome);
        vipLevelSelect.addEventListener('change', calculateIncome);
        
        // 初期計算
        calculateIncome();
    }
    
    // チャート初期化
    function initChart() {
        const ctx = document.getElementById('incomeChart');
        if (!ctx) return;
        
        window.incomeChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['1ヶ月', '3ヶ月', '6ヶ月', '9ヶ月', '12ヶ月'],
                datasets: [{
                    label: '累積収益',
                    data: [6000, 18000, 36000, 54000, 72000],
                    borderColor: '#e91e63',
                    backgroundColor: 'rgba(233, 30, 99, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#e91e63',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            font: {
                                family: 'Noto Sans JP',
                                size: 14,
                                weight: '600'
                            },
                            color: '#2c3e50'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '¥' + value.toLocaleString();
                            },
                            font: {
                                family: 'Noto Sans JP',
                                size: 12
                            },
                            color: '#495057'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                family: 'Noto Sans JP',
                                size: 12
                            },
                            color: '#495057'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                },
                elements: {
                    point: {
                        hoverBackgroundColor: '#e91e63'
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }
    
    // チャート更新
    function updateChart(monthlyIncome) {
        if (window.incomeChart) {
            const data = [];
            for (let i = 1; i <= 12; i++) {
                data.push(monthlyIncome * i);
            }
            
            window.incomeChart.data.datasets[0].data = [
                data[0], data[2], data[5], data[8], data[11]
            ];
            window.incomeChart.update('active');
        }
    }
    
    // スムーススクロール
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // ボタンリップル効果
    function initRippleEffect() {
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    // フェードインアニメーション
    function initFadeInAnimation() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // アニメーション対象要素
        document.querySelectorAll('.feature-card, .tool-card, .stat-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    // 画像エラーハンドリング
    function initImageErrorHandling() {
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('error', function() {
                // フォールバック処理
                if (this.src.includes('arquel-character') || this.src.includes('4d68d7c9fcf7048ac80576020e8579a9')) {
                    this.style.display = 'none';
                    const placeholder = document.createElement('div');
                    placeholder.className = 'image-placeholder arquel-placeholder';
                    placeholder.innerHTML = `
                        <div class="placeholder-content">
                            <i class="fas fa-user-circle"></i>
                            <span>アークエル</span>
                        </div>
                    `;
                    this.parentNode.appendChild(placeholder);
                } else if (this.src.includes('slot-heaven-logo') || this.src.includes('85349a9d9768bcc7f596f6b3dcea5a1c')) {
                    this.style.display = 'none';
                    const placeholder = document.createElement('div');
                    placeholder.className = 'image-placeholder logo-placeholder';
                    placeholder.innerHTML = `
                        <div class="placeholder-content">
                            <i class="fas fa-crown"></i>
                            <span>スロット天国</span>
                        </div>
                    `;
                    this.parentNode.appendChild(placeholder);
                }
            });
        });
    }
    
    // モバイルメニュー（小画面用）
    function initMobileMenu() {
        if (window.innerWidth <= 768) {
            const nav = document.querySelector('.nav');
            const menuToggle = document.createElement('div');
            menuToggle.className = 'mobile-menu-toggle';
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            
            const navMenu = document.querySelector('.nav-menu');
            
            menuToggle.addEventListener('click', function() {
                navMenu.classList.toggle('mobile-active');
            });
            
            nav.appendChild(menuToggle);
        }
    }
    
    // パーティクル効果
    function initParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        document.body.appendChild(particlesContainer);
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
            particlesContainer.appendChild(particle);
        }
    }
    
    // 全ての初期化を実行
    animateCounters();
    initCalculator();
    initChart();
    initSmoothScroll();
    initRippleEffect();
    initFadeInAnimation();
    initImageErrorHandling();
    initMobileMenu();
    initParticles();
    
    // パフォーマンス監視
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            if (loadTime > 3000) {
                console.warn('ページの読み込み時間が3秒を超えています:', loadTime + 'ms');
            }
        });
    }
});

// リサイズ時の処理
window.addEventListener('resize', function() {
    if (window.incomeChart) {
        window.incomeChart.resize();
    }
});

// スクロール時の処理
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// CSS アニメーション用のスタイルを動的に追加
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .image-placeholder {
        width: 100%;
        max-width: 400px;
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #ffb6c1 0%, #e0f6ff 100%);
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        margin: 0 auto;
    }
    
    .logo-placeholder {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        max-width: 50px;
    }
    
    .placeholder-content {
        text-align: center;
        color: #2c3e50;
    }
    
    .placeholder-content i {
        font-size: 3rem;
        margin-bottom: 1rem;
        color: #e91e63;
    }
    
    .logo-placeholder .placeholder-content i {
        font-size: 1.5rem;
        margin-bottom: 0;
    }
    
    .placeholder-content span {
        display: block;
        font-weight: 600;
        font-size: 1.2rem;
    }
    
    .logo-placeholder .placeholder-content span {
        font-size: 0.6rem;
    }
    
    .particles {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    }
    
    .particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(233, 30, 99, 0.3);
        border-radius: 50%;
        animation: float 5s infinite linear;
    }
    
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .mobile-menu-toggle {
        display: none;
        font-size: 1.5rem;
        color: #2c3e50;
        cursor: pointer;
        padding: 0.5rem;
    }
    
    @media (max-width: 768px) {
        .mobile-menu-toggle {
            display: block;
        }
        
        .nav-menu {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.98);
            flex-direction: column;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
            border-radius: 0 0 20px 20px;
            padding: 1rem;
            gap: 1rem;
        }
        
        .nav-menu.mobile-active {
            display: flex;
        }
    }
`;
document.head.appendChild(style);