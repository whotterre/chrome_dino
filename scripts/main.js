import Enemy from "../classes/enemy.js";
import Runner from "../classes/runner.js"
let runner;
// World level variables
let groundLevel = 200;
let enemies = [];
let lastSpawnTime = 0;
const SPAWN_INTERVAL = 2000; // Spawn every 2 seconds
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas")
  const ctx = canvas.getContext("2d")

  // Draw the runner 
  runner = new Runner()
  runner.initialDraw(ctx)


  // Draw the enemies 
  enemies = [];


  // Place the score data at the top right of the canvas or the world
  ctx.font = '10px "Press Start 2P"';
  ctx.fillText(`Hi ${String(runner.hiScore).padStart('5', 0)}`, 900, 30)
  ctx.fillText(`${String(runner.score).padStart('5', 0)}`, 990, 30)



  gameLoop(ctx)
})


// Events go here
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    if (runner) runner.jump();
    // Play burp sound
    const burpSound = new Audio("../assets/sounds/burp.mp3");
    burpSound.play();
  }

  if (e.code === "ArrowDown") {
    if (runner) runner.duck();
  }
})

// Draw ground pattern at the bottom of the canvas
function drawGround(ctx, canvasWidth, groundY) {
  ctx.save();
  ctx.strokeStyle = "#888";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, groundY);
  ctx.lineTo(canvasWidth, groundY);
  ctx.stroke();
  ctx.setLineDash([]); // Reset dash
  ctx.restore();
}

function gameLoop(ctx) {
  // Clear canvas
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Draw ground first
  drawGround(ctx, ctx.canvas.width, 250);

  // Spawn enemies
  const currentTime = Date.now();
  if (currentTime - lastSpawnTime > SPAWN_INTERVAL) {
      const type = Math.random() < 0.5 ? "pterodacyl" : "cactus";
      const y = type === "cactus" ? 200 : 150;
      enemies.push(new Enemy(type, ctx.canvas.width, y));
      lastSpawnTime = currentTime;
  }

  // Update and draw enemies
  enemies = enemies.filter(enemy => {
      enemy.update();
      enemy.draw(ctx);
      return enemy.x > -50; 
  });

  // Draw runner last (on top)
  if (runner) {
      runner.update();
      runner.run();
      runner.initialDraw(ctx);
  }

  // Draw score on top
  ctx.font = '10px "Press Start 2P"';
  ctx.fillText(`Hi ${String(Runner.hiScore).padStart(5, '0')}`, 900, 30);
  ctx.fillText(`${String(Runner.score).padStart(5, '0')}`, 990, 30);

  requestAnimationFrame(() => gameLoop(ctx));
}

