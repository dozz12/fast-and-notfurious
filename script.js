const player = document.getElementById("player");
const enemy = document.getElementById("enemy");
const scoreDisplay = document.getElementById("score");

let playerPos = 125;
let enemyTop = -100;
let enemySpeed = 2;
let score = 0;

const moveStep = 25;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && playerPos > 0) {
    playerPos -= moveStep;
  } else if (e.key === "ArrowRight" && playerPos < 250) {
    playerPos += moveStep;
  }
  player.style.left = playerPos + "px";
});

function resetEnemy() {
  enemyTop = -100;
  enemy.style.top = enemyTop + "px";
  enemy.style.left = Math.floor(Math.random() * 6) * 50 + "px";
  score++;
  scoreDisplay.textContent = "Skor: " + score;
}

function checkCollision() {
  const playerRect = player.getBoundingClientRect();
  const enemyRect = enemy.getBoundingClientRect();

  return !(
    playerRect.top > enemyRect.bottom ||
    playerRect.bottom < enemyRect.top ||
    playerRect.right < enemyRect.left ||
    playerRect.left > enemyRect.right
  );
}

function gameLoop() {
  enemyTop += enemySpeed;
  enemy.style.top = enemyTop + "px";

  if (enemyTop > 500) {
    resetEnemy();
  }

  if (checkCollision()) {
    alert("💥 Kena tabrak! Skormu: " + score);
    score = 0;
    scoreDisplay.textContent = "Skor: 0";
    resetEnemy();
  }

  requestAnimationFrame(gameLoop);
}

// Start game
resetEnemy();
gameLoop();
