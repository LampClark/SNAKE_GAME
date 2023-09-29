const boardGame = document.querySelector(".board-game")

let foodX, foodY;

const changeFoodPosition = () => {
    // Random number from 0 - 30 value as food position
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const initGame = () => {
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    boardGame.innerHTML = htmlMarkup;
}
changeFoodPosition();
initGame();