// Основной игровой код
document.addEventListener('DOMContentLoaded', () => {
    // Элементы интерфейса
    const levelSelector = document.getElementById('levelSelector');
    const gameContainer = document.getElementById('gameContainer');
    const levelComplete = document.getElementById('levelComplete');
    const problemElement = document.getElementById('problem');
    const answerInput = document.getElementById('answer');
    const submitBtn = document.getElementById('submitBtn');
    const hintBtn = document.getElementById('hintBtn');
    const resultMessage = document.getElementById('resultMessage');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const levelTitle = document.getElementById('levelTitle');
    const earnedCoins = document.getElementById('earnedCoins');
    const nextLevelBtn = document.getElementById('nextLevelBtn');
    const returnBtn = document.getElementById('returnBtn');
    const levelButtons = document.querySelectorAll('.level-btn');
    
    // Игровые переменные
    let currentLevel = 1;
    let currentProblem = null;
    let correctAnswers = 0;
    let totalProblems = 10;
    let coins = 0;
    let hints = 0;
    let fireworks = 0;
    let selectedBackground = '';
    let selectedFont = '';
    
    // Награды за уровни
    const levelRewards = {
        1: 15,
        2: 20,
        3: 25,
        4: 30,
        5: 40
    };
    
    // Сложности уровней
    const levels = {
        1: {
            name: "Новичок",
            description: "Сложение и вычитание",
            generateProblem: generateBasicProblem
        },
        2: {
            name: "Ученик",
            description: "Умножение и деление",
            generateProblem: generateIntermediateProblem
        },
        3: {
            name: "Мастер",
            description: "Степени и квадратные корни",
            generateProblem: generateAdvancedProblem
        },
        4: {
            name: "Гуру",
            description: "Комбинированные операции",
            generateProblem: generateExpertProblem
        },
        5: {
            name: "Легенда",
            description: "Случайные сложные задачи",
            generateProblem: generateMasterProblem
        }
    };
    
    // Инициализация игры
    function initGame() {
        loadUserData();
        setupEventListeners();
    }
    
    // Загрузка данных пользователя
    function loadUserData() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            document.getElementById('usernameDisplay').textContent = user.username;
            coins = user.coins || 0;
            hints = user.hints || 0;
            fireworks = user.fireworks || 0;
            selectedBackground = user.background || '';
            selectedFont = user.font || '';
            
            updateUI();
            
            // Применяем выбранные фон и шрифт
            if (selectedBackground) {
                applyBackground(selectedBackground);
            }
            
            if (selectedFont) {
                applyFont(selectedFont);
            }
        }
    }
    
    // Обновление интерфейса
    function updateUI() {
        document.getElementById('coinsCount').textContent = coins;
        document.getElementById('hintsCount').textContent = hints;
        document.getElementById('invHints').textContent = hints;
        document.getElementById('invFireworks').textContent = fireworks;
    }
    
    // Настройка обработчиков событий
    function setupEventListeners() {
        // Выбор уровня
        levelButtons.forEach(button => {
            button.addEventListener('click', () => {
                currentLevel = parseInt(button.dataset.level);
                startLevel(currentLevel);
            });
        });
        
        // Проверка ответа
        submitBtn.addEventListener('click', checkAnswer);
        answerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkAnswer();
            }
        });
        
        // Использование подсказки
        hintBtn.addEventListener('click', useHint);
        
        // Кнопки завершения уровня
        nextLevelBtn.addEventListener('click', () => {
            currentLevel = Math.min(currentLevel + 1, 5);
            startLevel(currentLevel);
        });
        
        returnBtn.addEventListener('click', () => {
            levelComplete.style.display = 'none';
            levelSelector.style.display = 'block';
        });
    }
    
    // Начало уровня
    function startLevel(level) {
        correctAnswers = 0;
        updateProgress();
        
        levelSelector.style.display = 'none';
        gameContainer.style.display = 'block';
        levelComplete.style.display = 'none';
        
        const levelData = levels[level];
        levelTitle.textContent = `Уровень ${level}: ${levelData.name} (${levelData.description})`;
        
        generateNewProblem();
    }
    
    // Генерация новой задачи
    function generateNewProblem() {
        const levelData = levels[currentLevel];
        currentProblem = levelData.generateProblem();
        problemElement.textContent = currentProblem.text;
        answerInput.value = '';
        answerInput.focus();
        resultMessage.textContent = '';
    }
    
    // Проверка ответа
    function checkAnswer() {
        const userAnswer = parseFloat(answerInput.value);
        
        if (isNaN(userAnswer)) {
            resultMessage.textContent = "Пожалуйста, введите число!";
            resultMessage.className = "result-message incorrect";
            return;
        }
        
        if (Math.abs(userAnswer - currentProblem.answer) < 0.0001) {
            // Правильный ответ
            correctAnswers++;
            updateProgress();
            resultMessage.textContent = "Правильно! 👍";
            resultMessage.className = "result-message correct";
            
            // Анимация правильного ответа
            problemElement.classList.add('animate__animated', 'animate__tada');
            setTimeout(() => {
                problemElement.classList.remove('animate__animated', 'animate__tada');
            }, 1000);
            
            // Проверка завершения уровня
            if (correctAnswers >= totalProblems) {
                completeLevel();
            } else {
                setTimeout(generateNewProblem, 1500);
            }
        } else {
            // Неправильный ответ
            resultMessage.textContent = `Неверно! Правильный ответ: ${currentProblem.answer}`;
            resultMessage.className = "result-message incorrect";
            
            // Анимация неправильного ответа
            problemElement.classList.add('animate__animated', 'animate__shakeX');
            setTimeout(() => {
                problemElement.classList.remove('animate__animated', 'animate__shakeX');
            }, 1000);
            
            setTimeout(generateNewProblem, 2000);
        }
    }
    
    // Обновление прогресса
    function updateProgress() {
        const progress = (correctAnswers / totalProblems) * 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${correctAnswers}/${totalProblems}`;
    }
    
    // Завершение уровня
    function completeLevel() {
        const reward = levelRewards[currentLevel];
        coins += reward;
        
        // Сохраняем данные пользователя
        saveUserData();
        
        // Показываем экран завершения
        gameContainer.style.display = 'none';
        levelComplete.style.display = 'block';
        earnedCoins.textContent = reward;
        
        // Запускаем фейерверк, если есть
        if (fireworks > 0) {
            launchFireworks();
            fireworks--;
            updateUI();
            saveUserData();
        }
        
        // Анимация завершения
        levelComplete.classList.add('animate__animated', 'animate__bounceIn');
        setTimeout(() => {
            levelComplete.classList.remove('animate__animated', 'animate__bounceIn');
        }, 1000);
    }
    
    // Использование подсказки
    function useHint() {
        if (hints > 0) {
            answerInput.value = currentProblem.answer;
            hints--;
            updateUI();
            saveUserData();
            
            // Анимация подсказки
            hintBtn.classList.add('animate__animated', 'animate__heartBeat');
            setTimeout(() => {
                hintBtn.classList.remove('animate__animated', 'animate__heartBeat');
            }, 1000);
        } else {
            alert("У вас нет подсказок! Купите их в магазине.");
        }
    }
    
    // Запуск фейерверка
    function launchFireworks() {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
        
        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }
        
        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();
            
            if (timeLeft <= 0) {
                return clearInterval(interval);
            }
            
            const particleCount = 50 * (timeLeft / duration);
            
            // Случайные цвета
            const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: [color]
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: [color]
            });
        }, 250);
    }
    
    // Сохранение данных пользователя
    function saveUserData() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            user.coins = coins;
            user.hints = hints;
            user.fireworks = fireworks;
            user.background = selectedBackground;
            user.font = selectedFont;
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            // Обновляем данные в списке пользователей
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userIndex = users.findIndex(u => u.username === user.username);
            if (userIndex !== -1) {
                users[userIndex] = user;
                localStorage.setItem('users', JSON.stringify(users));
            }
        }
    }
    
    // Применение фона
    function applyBackground(bg) {
        const bgContainer = document.querySelector('.background-container');
        bgContainer.style.background = bg;
        selectedBackground = bg;
        saveUserData();
    }
    
    // Применение шрифта
    function applyFont(font) {
        document.body.style.fontFamily = font;
        selectedFont = font;
        saveUserData();
    }
    
    // Генераторы задач для разных уровней
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
                text = `${a} -
