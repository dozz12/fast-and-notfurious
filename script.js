const player = document.getElementById("player");
const enemy = document.getElementById("enemy");

let playerPos = 125; // Starting position
const moveStep = 25; // Movement step

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && playerPos > 0) {
    playerPos -= moveStep;
  } else if (e.key === "ArrowRight" && playerPos < 250) {
    playerPos += moveStep;
  }
  player.style.left = playerPos + "px";
});

let enemyTop = -100;
let enemySpeed = 2;

function resetEnemy() {
  enemyTop = -100;
  enemy.style.left = Math.floor(Math.random() * 6) * 50 + "px"; // Random lane
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
    alert("💥 Kena tabrak! Game over!");
    resetEnemy();
    enemy.style.top = "-100px";
    enemyTop = -100;
  }

  requestAnimationFrame(gameLoop);
}

// Start the game
resetEnemy();
gameLoop();
