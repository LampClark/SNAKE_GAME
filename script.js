const boardGame = document.querySelector(".board-game")

let foodX, foodY;
let snakeX = 15, snakeY = 15;
let snakeMove = [];
let velocityX = 0, velocityY =0;

const changeFoodPosition = () => {
    // Random number from 0 - 30 value as food position
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

    // Hotkey buttons
const changeDirection = (b) => {
    if (
        b.key === "ArrowUp" ||
        b.key === "w" ||
        b.key === "W" ||
        b.key === "i" ||
        b.key === "I"
        ) {
            if (velocityY !== 1) {
                velocityX = 0;
                velocityY = -1;
            }
    } else if (
        b.key === "ArrowDown" ||
        b.key === "s" ||
        b.key === "S" ||
        b.key === "k" ||
        b.key === "K"
        ) {
            if (velocityY !== -1) {
                velocityX = 0;
                velocityY = 1;
            }
    } else if (
        b.key === "ArrowLeft" ||
        b.key === "a" ||
        b.key === "A" ||
        b.key === "j" ||
        b.key === "J"
        ) {
            if (velocityX !== 1) {
                velocityX = -1;
                velocityY = 0;
            }
    } else if (
        b.key === "ArrowRight" ||
        b.key === "d" ||
        b.key === "D" ||
        b.key === "l" ||
        b.key === "L"
        ) {
            if (velocityX !== -1) {
                velocityX = 1;
                velocityY = 0;
            }
    }
    initGame();
}

const initGame = () => {
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    

    snakeX += velocityX;
    snakeY += velocityY;

    htmlMarkup += `<div class="head" style="grid-area: ${snakeY} / ${snakeX}"></div>`;
    boardGame.innerHTML = htmlMarkup;
}
changeFoodPosition();
initGame();
document.addEventListener("keydown", changeDirection);