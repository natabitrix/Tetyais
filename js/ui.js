let score = 0;
let lines = 0;
let level = 1;

const scoreElement = document.getElementById('score');
const linesElement = document.getElementById('lines');
const levelElement = document.getElementById('level');

export function getScore() {
    return { score, lines, level };
}

export function resetScore() {
    score = 0;
    lines = 0;
    level = 1;
    updateUI();
}

export function updateScore(clearedLines) {
    const linePoints = [40, 100, 300, 1200];
    score += linePoints[clearedLines - 1] * level;
    lines += clearedLines;

    if (lines >= level * 10) {
        level++;
    }

    updateUI();
}

function updateUI() {
    scoreElement.innerText = score;
    linesElement.innerText = lines;
    levelElement.innerText = level;
}