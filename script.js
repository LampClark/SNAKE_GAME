const boardGame = document.querySelector(".board-game");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

let gameOver = false;
let foodX, foodY;
let snakeX = 15, snakeY = 15;
let snakeMove = [];
let velocityX = 0, velocityY =0;
let setIntervalId;
let score = 0;
let isAudioPlaying = false;
let isGameOverSoundPlaying = false;

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const changeFoodPosition = () => {
    // Random number from 0 - 30 value as food position
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    if (!isGameOverSoundPlaying) {
        const gameOverSound = document.getElementById("gameOverSound");
        gameOverSound.volume = 0.5;
        gameOverSound.play();
        isGameOverSoundPlaying = true;
    }
    alert("GAME OVER !");
    location.reload();
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
}

const initGame = () => {
    if(gameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if(snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeMove.push([foodX, foodY]);
        // Added sound effect
        const eatSound = document.getElementById("eatSound");

        if (!isAudioPlaying) {
            eatSound.volume = 0.5;
            eatSound.play();
        } else {

            eatSound.currentTime = 0;
        }

        isAudioPlaying = true;

        eatSound.addEventListener("ended", () => {
            isAudioPlaying = false;
        });
        
        
        // console.log(snakeMove);
        score++; // Increase score by 1

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }

    for (let index = snakeMove.length - 1; index > 0; index--) {
        snakeMove[index] = snakeMove[index - 1];
        
    }

    snakeMove[0] = [snakeX, snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30 ) {
        gameOver = true;
        console.log("GAME OVER")
    }

    for (let index = 0; index < snakeMove.length; index++) {
        htmlMarkup += `<div class="head" style="grid-area: ${snakeMove[index][1]} / ${snakeMove[index][0]}"></div>`;
        
        if(index !== 0 && snakeMove[0][1] === snakeMove[index][1] && snakeMove[0][0] === snakeMove[index][0]) {
            gameOver = true;
        }

    }

    // htmlMarkup += `<div class="head" style="grid-area: ${snakeY} / ${snakeX}"></div>`;
    boardGame.innerHTML = htmlMarkup;
}
changeFoodPosition();
setIntervalId = setInterval(initGame, 68);
document.addEventListener("keydown", changeDirection);
