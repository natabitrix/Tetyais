import { BLOCK_SIZE, COLORS } from './constants.js';
import { createBoard, mergePiece, sweepLines } from './board.js';
import { createPiece, collide, rotate } from './piece.js';
import { getScore, updateScore, resetScore } from './ui.js';

const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

let board = createBoard();
let player = {
    pos: {x: 0, y: 0},
    matrix: null,
};

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;

let gameActive = true;

export function init() {
    playerReset();
    gameLoop();
}

export function pause() {
    gameActive = !gameActive;
}

export function reset() {
    board = createBoard();
    resetScore();
    playerReset();
}

function playerReset() {
    player.matrix = createPiece().matrix;
    player.pos.y = 0;
    player.pos.x = Math.floor(10 / 2) - Math.floor(player.matrix[0].length / 2);

    if (collide(board, player.matrix, player.pos)) {
        alert('Game Over!');
        reset();
    }
}

export function playerDrop() {
    player.pos.y++;
    if (collide(board, player.matrix, player.pos)) {
        player.pos.y--;
        mergePiece(board, player);
        sweepLines(board, updateScore);
        playerReset();
    }
    dropCounter = 0;
}

export function playerMove(dir) {
    player.pos.x += dir;
    if (collide(board, player.matrix, player.pos)) {
        player.pos.x -= dir;
    }
}

export function playerRotate() {
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix, offset);
    if (collide(board, player.matrix, player.pos)) {
        rotate(player.matrix, -offset);
    }
}

function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawMatrix(board, {x: 0, y: 0});
    drawMatrix(player.matrix, player.pos);
}

function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = COLORS[value];
                context.fillRect(x * BLOCK_SIZE + offset.x * BLOCK_SIZE, y * BLOCK_SIZE + offset.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                context.strokeStyle = '#000';
                context.strokeRect(x * BLOCK_SIZE + offset.x * BLOCK_SIZE, y * BLOCK_SIZE + offset.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            }
        });
    });
}

function gameLoop(time = 0) {
    if (!gameActive) {
        requestAnimationFrame(gameLoop);
        return;
    }

    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
    }

    draw();
    requestAnimationFrame(gameLoop);
}