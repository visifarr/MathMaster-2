// Система авторизации
document.addEventListener('DOMContentLoaded', () => {
    const authContainer = document.getElementById('authContainer');
    const mainContainer = document.getElementById('mainContainer');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const authMessage = document.getElementById('authMessage');
    const logoutBtn = document.getElementById('logoutBtn');
    const usernameDisplay = document.getElementById('usernameDisplay');

    // Проверяем, авторизован ли пользователь
    checkAuthStatus();

    // Обработчики событий
    loginBtn.addEventListener('click', login);
    registerBtn.addEventListener('click', register);
    logoutBtn.addEventListener('click', logout);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') login();
    });

    // Проверка статуса авторизации
    function checkAuthStatus() {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            authContainer.style.display = 'none';
            mainContainer.style.display = 'block';
            usernameDisplay.textContent = JSON.parse(currentUser).username;
        } else {
            authContainer.style.display = 'flex';
            mainContainer.style.display = 'none';
        }
    }

    // Вход пользователя
    function login() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!username || !password) {
            showAuthMessage('Пожалуйста, введите имя пользователя и пароль');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            checkAuthStatus();
        } else {
            showAuthMessage('Неверное имя пользователя или пароль');
        }
    }

    // Регистрация пользователя
    function register() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!username || !password) {
            showAuthMessage('Пожалуйста, введите имя пользователя и пароль');
            return;
        }

        if (username.length < 3) {
            showAuthMessage('Имя пользователя должно содержать минимум 3 символа');
            return;
        }

        if (password.length < 4) {
            showAuthMessage('Пароль должен содержать минимум 4 символа');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        if (users.some(u => u.username === username)) {
            showAuthMessage('Имя пользователя уже занято');
            return;
        }

        const newUser = {
            username,
            password,
            coins: 50, // Начальное количество монет
            hints: 3,  // Начальное количество подсказок
            fireworks: 2, // Начальное количество фейерверков
            backgrounds: [], // Купленные фоны
            fonts: [], // Купленные шрифты
            background: '', // Выбранный фон
            font: '' // Выбранный шрифт
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        showAuthMessage('Регистрация успешна!', 'success');
        setTimeout(() => {
            checkAuthStatus();
        }, 1000);
    }

    // Выход пользователя
    function logout() {
        localStorage.removeItem('currentUser');
        checkAuthStatus();
        usernameInput.value = '';
        passwordInput.value = '';
        authMessage.textContent = '';
    }

    // Показать сообщение авторизации
    function showAuthMessage(message, type = 'error') {
        authMessage.textContent = message;
        authMessage.style.color = type === 'error' ? '#f44336' : '#4CAF50';
        
        if (type === 'success') {
            authMessage.classList.add('animate__animated', 'animate__bounceIn');
            setTimeout(() => {
                authMessage.classList.remove('animate__animated', 'animate__bounceIn');
            }, 1000);
        }
    }
});
