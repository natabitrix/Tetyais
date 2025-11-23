import { SHAPES } from './constants.js';

export function createPiece() {
    const rand = Math.floor(Math.random() * SHAPES.length);
    return {
        pos: {x: Math.floor(10 / 2) - 1, y: 0},
        matrix: SHAPES[rand],
        type: rand + 1
    };
}

export function collide(board, matrix, pos) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] !== 0 &&
                (board[y + pos.y] &&
                 board[y + pos.y][x + pos.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

export function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
        }
    }

    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}