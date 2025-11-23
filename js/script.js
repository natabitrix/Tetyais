import { init, playerDrop, playerMove, playerRotate, pause, reset } from './game.js';
import { setupInput } from './input.js';

// Инициализация игры
init();

// Подключение управления
setupInput(
    // передаём функции для вызова из input.js
    null, // player не нужен в input.js
    null, // board не нужен
    playerDrop,
    (dir) => playerMove(dir),
    playerRotate
);

// Обработка кнопок
document.getElementById('start-btn').addEventListener('click', init);
document.getElementById('pause-btn').addEventListener('click', pause);