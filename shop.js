// Логика магазина
document.addEventListener('DOMContentLoaded', () => {
    const shopBtn = document.getElementById('shopBtn');
    const closeShopBtn = document.getElementById('closeShopBtn');
    const shopOverlay = document.getElementById('shopOverlay');
    const shopTabs = document.querySelectorAll('.shop-tab');
    const shopContents = document.querySelectorAll('.shop-content');
    const buyButtons = document.querySelectorAll('.buy-btn');
    const applyPromoBtn = document.getElementById('applyPromoBtn');
    const promoCodeInput = document.getElementById('promoCode');
    const promoMessage = document.getElementById('promoMessage');
    const backgroundsGrid = document.getElementById('backgroundsGrid');
    const fontsGrid = document.getElementById('fontsGrid');
    
    // Загружаем данные пользователя
    let currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    let coins = currentUser.coins || 0;
    let hints = currentUser.hints || 0;
    let fireworks = currentUser.fireworks || 0;
    let backgrounds = currentUser.backgrounds || [];
    let fonts = currentUser.fonts || [];
    
    // Список фонов
    const backgroundList = [
        'linear-gradient(135deg, #6e8efb, #a777e3)',
        'linear-gradient(135deg, #5f2c82, #49a09d)',
        'linear-gradient(135deg, #ff758c, #ff7eb3)',
        'linear-gradient(135deg, #00c6ff, #0072ff)',
        'linear-gradient(135deg, #f46b45, #eea849)',
        'linear-gradient(135deg, #56ccf2, #2f80ed)',
        'linear-gradient(135deg, #b24592, #f15f79)',
        'linear-gradient(135deg, #c471f5, #fa71cd)',
        'linear-gradient(135deg, #43cea2, #185a9d)',
        'linear-gradient(135deg, #ff512f, #dd2476)',
        'linear-gradient(135deg, #4776e6, #8e54e9)',
        'linear-gradient(135deg, #1a2980, #26d0ce)',
        'linear-gradient(135deg, #614385, #516395)',
        'linear-gradient(135deg, #1d976c, #93f9b9)',
        'linear-gradient(135deg, #eb3349, #f45c43)',
        'linear-gradient(135deg, #1e3c72, #2a5298)',
        'linear-gradient(135deg, #ff8008, #ffc837)',
        'linear-gradient(135deg, #16222a, #3a6073)',
        'linear-gradient(135deg, #1f4037, #99f2c8)',
        'linear-gradient(135deg, #4b79a1, #283e51)',
        'linear-gradient(135deg, #834d9b, #d04ed6)',
        'linear-gradient(135deg, #009fff, #ec2f4b)',
        'linear-gradient(135deg, #654ea3, #eaafc8)',
        'linear-gradient(135deg, #1488cc, #2b32b2)',
        'linear-gradient(135deg, #f12711, #f5af19)',
        'linear-gradient(135deg, #7f00ff, #e100ff)',
        'linear-gradient(135deg, #11998e, #38ef7d)',
        'linear-gradient(135deg, #fc4a1a, #f7b733)',
        'linear-gradient(135deg, #1fa2ff, #12d8fa, #a6ffcb)',
        'linear-gradient(135deg, #ff00cc, #333399)',
        'linear-gradient(135deg, #de6161, #2657eb)',
        'linear-gradient(135deg, #abbaab, #ffffff)',
        'linear-gradient(135deg, #f79d00, #64f38c)',
        'linear-gradient(135deg, #03001e, #7303c0, #ec38bc, #fdeff9)',
        'linear-gradient(135deg, #3a7bd5, #00d2ff)',
        'linear-gradient(135deg, #c33764, #1d2671)',
        'linear-gradient(135deg, #ee9ca7, #ffdde1)',
        'linear-gradient(135deg, #2193b0, #6dd5ed)',
        'linear-gradient(135deg, #cc2b5e, #753a88)',
        'linear-gradient(135deg, #42275a, #734b6d)',
        'linear-gradient(135deg, #bdc3c7, #2c3e50)',
        'linear-gradient(135deg, #de6262, #ffb88c)',
        'linear-gradient(135deg, #06beb6, #48b1bf)',
        'linear-gradient(135deg, #eb5757, #000000)',
        'linear-gradient(135deg, #000428, #004e92)',
        'linear-gradient(135deg, #ddd6f3, #faaca8)',
        'linear-gradient(135deg, #7b4397, #dc2430)',
        'linear-gradient(135deg, #4e54c8, #8f94fb)',
        'linear-gradient(135deg, #f857a6, #ff5858)',
        'linear-gradient(135deg, #36d1dc, #5b86e5)',
        'linear-gradient(135deg, #c9d6ff, #e2e2e2)',
        'linear-gradient(135deg, #d3959b, #bfe6ba)',
        'linear-gradient(135deg, #00c9ff, #92fe9d)',
        'linear-gradient(135deg, #fd746c, #ff9068)',
        'linear-gradient(135deg, #a1c4fd, #c2e9fb)',
        'linear-gradient(135deg, #ffafbd, #ffc3a0)',
        'linear-gradient(135deg, #2196f3, #f44336)',
        'linear-gradient(135deg, #3f51b5, #9c27b0)',
        'linear-gradient(135deg, #03a9f4, #00bcd4)',
        'linear-gradient(135deg, #4caf50, #8bc34a)',
        'linear-gradient(135deg, #ff9800, #ff5722)',
        'linear-gradient(135deg, #9e9e9e, #607d8b)'
    ];
    
    // Список шрифтов
    const fontList = [
        "'Arial', sans-serif",
        "'Times New Roman', serif",
        "'Courier New', monospace",
        "'Georgia', serif",
        "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
        "'Garamond', serif",
        "'Comic Sans MS', cursive",
        "'Impact', Charcoal, sans-serif",
        "'Lucida Sans Unicode', 'Lucida Grande', sans-serif",
        "'Tahoma', Geneva, sans-serif",
        "'Trebuchet MS', Helvetica, sans-serif",
        "'Verdana', Geneva, sans-serif",
        "'Arial Black', Gadget, sans-serif",
        "'Lucida Console', Monaco, monospace",
        "'Brush Script MT', cursive",
        "'Copperplate', 'Copperplate Gothic Light', fantasy",
        "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
        "'Gill Sans', 'Gill Sans MT', Calibri, sans-serif",
        "'Century Gothic', sans-serif",
        "'Candara', sans-serif",
        "'Corbel', sans-serif",
        "'Constantia', serif",
        "'Cambria', serif",
        "'Calibri', sans-serif",
        "'Consolas', monospace",
        "'Baskerville', serif",
        "'Rockwell', serif",
        "'Futura', sans-serif",
        "'Myriad Pro', sans-serif",
        "'Optima', sans-serif",
        "'Segoe UI', sans-serif",
        "'Helvetica Neue', Helvetica, Arial, sans-serif",
        "'Roboto', sans-serif",
        "'Open Sans', sans-serif",
        "'Lato', sans-serif",
        "'Montserrat', sans-serif",
        "'Raleway', sans-serif",
        "'Oswald', sans-serif",
        "'Source Sans Pro', sans-serif",
        "'PT Sans', sans-serif",
        "'Ubuntu', sans-serif",
        "'Playfair Display', serif",
        "'Merriweather', serif",
        "'Arvo', serif",
        "'PT Serif', serif",
        "'Droid Serif', serif",
        "'Vollkorn', serif",
        "'Abril Fatface', cursive",
        "'Alfa Slab One', cursive",
        "'Bangers', cursive",
        "'Black Ops One', cursive",
        "'Cinzel', serif",
        "'Fredoka One', cursive",
        "'Lobster', cursive",
        "'Pacifico', cursive",
        "'Righteous', cursive",
        "'Satisfy', cursive",
        "'Sigmar One', cursive",
        "'Titan One', cursive",
        "'Bungee', cursive",
        "'Chewy', cursive",
        "'Fugaz One', cursive",
        "'Luckiest Guy', cursive",
        "'Permanent Marker', cursive",
        "'Rubik Mono One', sans-serif",
        "'Special Elite', cursive"
    ];
    
    // Инициализация магазина
    initShop();
    
    // Обработчики событий
    shopBtn.addEventListener('click', openShop);
    closeShopBtn.addEventListener('click', closeShop);
    
    shopTabs.forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });
    
    buyButtons.forEach(button => {
        button.addEventListener('click', () => buyItem(button.dataset.item));
    });
    
    applyPromoBtn.addEventListener('click', applyPromoCode);
    promoCodeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') applyPromoCode();
    });
    
    // Функции магазина
    function initShop() {
        // Загружаем фоны
        loadBackgrounds();
        
        // Загружаем шрифты
        loadFonts();
        
        // Обновляем инвентарь
        updateInventory();
    }
    
    function openShop() {
        shopOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Обновляем данные при открытии магазина
        currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
        coins = currentUser.coins || 0;
        hints = currentUser.hints || 0;
        fireworks = currentUser.fireworks || 0;
        backgrounds = currentUser.backgrounds || [];
        fonts = currentUser.fonts || [];
        
        updateInventory();
    }
    
    function closeShop() {
        shopOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    function switchTab(tabName) {
        // Скрываем все вкладки
        shopContents.forEach(content => {
            content.style.display = 'none';
        });
        
        // Убираем активный класс со всех кнопок
        shopTabs.forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Показываем выбранную вкладку
        document.getElementById(`${tabName}Tab`).style.display = 'block';
        
        // Добавляем активный класс к выбранной кнопке
        document.querySelector(`.shop-tab[data-tab="${tabName}"]`).classList.add('active');
    }
    
    function loadBackgrounds() {
        backgroundsGrid.innerHTML = '';
        
        backgroundList.forEach((bg, index) => {
            const bgItem = document.createElement('div');
            bgItem.className = 'grid-item';
            if (backgrounds.includes(index)) {
                bgItem.classList.add('selected');
            }
            
            bgItem.innerHTML = `
                <div class="bg-preview" style="background: ${bg}; width: 100%; height: 60px; border-radius: 5px; margin-bottom: 5px;"></div>
                <p>Фон #${index + 1}</p>
                ${backgrounds.includes(index) ? 
                    `<button class="btn select-btn" data-bg-index="${index}">Выбрать</button>` : 
                    `<button class="btn buy-btn" data-bg-index="${index}">Купить (50 🪙)</button>`}
            `;
            
            backgroundsGrid.appendChild(bgItem);
        });
        
        // Добавляем обработчики для кнопок фонов
        document.querySelectorAll('.bg-preview').forEach((preview, index) => {
            preview.addEventListener('click', () => {
                if (backgrounds.includes(index)) {
                    applyBackground(index);
                }
            });
        });
        
        document.querySelectorAll('[data-bg-index]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const bgIndex = parseInt(button.dataset.bgIndex);
                
                if (button.classList.contains('select-btn')) {
                    applyBackground(bgIndex);
                } else {
                    buyBackground(bgIndex);
                }
            });
        });
    }
    
    function loadFonts() {
        fontsGrid.innerHTML = '';
        
        fontList.forEach((font, index) => {
            const fontItem = document.createElement('div');
            fontItem.className = 'grid-item';
            if (fonts.includes(index)) {
                fontItem.classList.add('selected');
            }
            
            fontItem.innerHTML = `
                <p style="font-family: ${font}; margin-bottom: 5px;">Пример текста</p>
                <p>Шрифт #${index + 1}</p>
                ${fonts.includes(index) ? 
                    `<button class="btn select-btn" data-font-index="${index}">Выбрать</button>` : 
                    `<button class="btn buy-btn" data-font-index="${index}">Купить (75 🪙)</button>`}
            `;
            
            fontsGrid.appendChild(fontItem);
        });
        
        // Добавляем обработчики для кнопок шрифтов
        document.querySelectorAll('[data-font-index]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const fontIndex = parseInt(button.dataset.fontIndex);
                
                if (button.classList.contains('select-btn')) {
                    applyFont(fontIndex);
                } else {
                    buyFont(fontIndex);
                }
            });
        });
    }
    
    function buyItem(item) {
        let cost, successMessage;
        
        switch(item) {
            case 'hint':
                cost = 25;
                successMessage = 'Подсказка куплена!';
                break;
            case 'firework':
                cost = 15;
                successMessage = 'Фейерверк куплен!';
                break;
            default:
                return;
        }
        
        if (coins >= cost) {
            coins -= cost;
            
            if (item === 'hint') {
                hints++;
            } else if (item === 'firework') {
                fireworks++;
            }
            
            updateUserData();
            showShopMessage(successMessage, 'success');
        } else {
            showShopMessage('Недостаточно монет!', 'error');
        }
    }
    
    function buyBackground(index) {
        const cost = 50;
        
        if (coins >= cost) {
            coins -= cost;
            backgrounds.push(index);
            currentUser.backgrounds = backgrounds;
            
            updateUserData();
            showShopMessage('Фон куплен! Теперь вы можете выбрать его.', 'success');
            loadBackgrounds();
        } else {
            showShopMessage('Недостаточно монет!', 'error');
        }
    }
    
    function buyFont(index) {
        const cost = 75;
        
        if (coins >= cost) {
            coins -= cost;
            fonts.push(index);
            currentUser.fonts = fonts;
            
            updateUserData();
            showShopMessage('Шрифт куплен! Теперь вы можете выбрать его.', 'success');
            loadFonts();
        } else {
            showShopMessage('Недостаточно монет!', 'error');
        }
    }
    
    function applyBackground(index) {
        currentUser.background = backgroundList[index];
        updateUserData();
        showShopMessage('Фон применён!', 'success');
        
        // Применяем фон на странице
        document.querySelector('.background-container').style.background = backgroundList[index];
    }
    
    function applyFont(index) {
        currentUser.font = fontList[index];
        updateUserData();
        showShopMessage('Шрифт применён!', 'success');
        
        // Применяем шрифт на странице
        document.body.style.fontFamily = fontList[index];
    }
    
    function applyPromoCode() {
        const code = promoCodeInput.value.trim().toLowerCase();
        let reward = null;
        
        switch(code) {
            case '777':
                reward = { coins: 777 };
                break;
            case 'noob':
                reward = { hints: 10 };
                break;
            case 'mathgenius':
                reward = { fireworks: 5 };
                break;
            case 'background':
                reward = { randomBackgrounds: 3 };
                break;
            case 'font':
                reward = { randomFonts: 3 };
                break;
            default:
                showShopMessage('Неверный промокод', 'error');
                return;
        }
        
        // Применяем награду
        if (reward.coins) {
            coins += reward.coins;
            showShopMessage(`Получено ${reward.coins} монет!`, 'success');
        }
        
        if (reward.hints) {
            hints += reward.hints;
            showShopMessage(`Получено ${reward.hints} подсказок!`, 'success');
        }
        
        if (reward.fireworks) {
            fireworks += reward.fireworks;
            showShopMessage(`Получено ${reward.fireworks} фейерверков!`, 'success');
        }
        
        if (reward.randomBackgrounds) {
            const count = reward.randomBackgrounds;
            let added = 0;
            
            for (let i = 0; i < count; i++) {
                const randomIndex = Math.floor(Math.random() * backgroundList.length);
                if (!backgrounds.includes(randomIndex)) {
                    backgrounds.push(randomIndex);
                    added++;
                }
            }
            
            showShopMessage(`Получено ${added} новых фонов!`, 'success');
        }
        
        if (reward.randomFonts) {
            const count = reward.randomFonts;
            let added = 0;
            
            for (let i = 0; i < count; i++) {
                const randomIndex = Math.floor(Math.random() * fontList.length);
                if (!fonts.includes(randomIndex)) {
                    fonts.push(randomIndex);
                    added++;
                }
            }
            
            showShopMessage(`Получено ${added} новых шрифтов!`, 'success');
        }
        
        // Обновляем данные
        updateUserData();
        loadBackgrounds();
        loadFonts();
        promoCodeInput.value = '';
    }
    
    function updateUserData() {
        currentUser.coins = coins;
        currentUser.hints = hints;
        currentUser.fireworks = fireworks;
        currentUser.backgrounds = backgrounds;
        currentUser.fonts = fonts;
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Обновляем данные в списке пользователей
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.username === currentUser.username);
        if (userIndex !== -1) {
            users[userIndex] = currentUser;
            localStorage.setItem('users', JSON.stringify(users));
        }
        
        // Обновляем UI
        updateInventory();
        document.getElementById('coinsCount').textContent = coins;
        document.getElementById('hintsCount').textContent = hints;
    }
    
    function updateInventory() {
        document.getElementById('invHints').textContent = hints;
        document.getElementById('invFireworks').textContent = fireworks;
        document.getElementById('invBackgrounds').textContent = backgrounds.length;
        document.getElementById('invFonts').textContent = fonts.length;
    }
    
    function showShopMessage(message, type = 'error') {
        promoMessage.textContent = message;
        promoMessage.style.color = type === 'error' ? '#f44336' : '#4CAF50';
        
        if (type === 'success') {
            promoMessage.classList.add('animate__animated', 'animate__bounceIn');
            setTimeout(() => {
                promoMessage.classList.remove('animate__animated', 'animate__bounceIn');
            }, 1000);
        }
    }
});

// Генераторы математических задач (дополнение к основному script.js)
function generateBasicProblem() {
    const a = Math.floor(Math.random() * 50) + 1;
    const b = Math.floor(Math.random() * 50) + 1;
    const operations = ['+', '-'];
    const op = operations[Math.floor(Math.random() * operations.length)];
    
    let answer, text;
    if (op === '+') {
        answer = a + b;
        text = `${a} + ${b} = ?`;
    } else {
        // Убедимся, что результат положительный
        if (a >= b) {
            answer = a - b;
            text = `${a} - ${b} = ?`;
        } else {
            answer = b - a;
            text = `${b} - ${a} = ?`;
        }
    }
    
    return { text, answer };
}

function generateIntermediateProblem() {
    const a = Math.floor(Math.random() * 12) + 1;
    const b = Math.floor(Math.random() * 12) + 1;
    const operations = ['×', '÷'];
    const op = operations[Math.floor(Math.random() * operations.length)];
    
    let answer, text;
    if (op === '×') {
        answer = a * b;
        text = `${a} × ${b} = ?`;
    } else {
        // Убедимся, что деление без остатка
        const product = a * b;
        answer = a;
        text = `${product} ÷ ${b} = ?`;
    }
    
    return { text, answer };
}

function generateAdvancedProblem() {
    const type = Math.random() < 0.5 ? 'square' : 'squareRoot';
    
    let answer, text;
    if (type === 'square') {
        const a = Math.floor(Math.random() * 12) + 1;
        answer = a * a;
        text = `${a}² = ?`;
    } else {
        const a = Math.floor(Math.random() * 10) + 1;
        answer = a;
        text = `√${a * a} = ?`;
    }
    
    return { text, answer };
}

function generateExpertProblem() {
    const operations = [
        { text: '|', fn: Math.abs },
        { text: 'округлить до целого', fn: Math.round }
    ];
    const op = operations[Math.floor(Math.random() * operations.length)];
    const a = (Math.random() * 20 - 10).toFixed(1);
    
    let answer = op.fn(parseFloat(a));
    let text = `${op.text} ${a}`;
    
    return { text, answer };
}

function generateMasterProblem() {
    const problems = [
        generateBasicProblem,
        generateIntermediateProblem,
        generateAdvancedProblem,
        generateExpertProblem
    ];
    
    const selectedProblem = problems[Math.floor(Math.random() * problems.length)];
    return selectedProblem();
}
