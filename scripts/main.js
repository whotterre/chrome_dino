import Runner from "../classes/runner.js"
let runner;

// World level variables
let score = 0;
let hiScore = 0;
let groundLevel = 200; 
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas")
  const ctx = canvas.getContext("2d")



  // Place the score data at the top right of the canvas or the world
  ctx.font = '10px "Press Start 2P"';
  ctx.fillText(`Hi ${String(hiScore).padStart('5', 0)}`, 900, 30)
  ctx.fillText(`${String(score).padStart('5', 0)}`, 990, 30)

  // Draw the runner 
  runner = new Runner()
  runner.initialDraw(ctx)

  gameLoop(ctx)
})


// Events go here
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    if (runner) runner.jump();
  }

  if(e.code === "ArrowDown") {
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

  // Redraw score
  ctx.font = '10px "Press Start 2P"';
  ctx.fillText(`Hi ${String(hiScore).padStart('5', 0)}`, 900, 30);
  ctx.fillText(`${String(score).padStart('5', 0)}`, 990, 30);

  // Draw runner
  if (runner) {
    runner.initialDraw(ctx);
  }

  // Update game state here if needed
  drawGround(ctx, ctx.canvas.width, 250);
  runner.update()
  runner.run()
  requestAnimationFrame(() => gameLoop(ctx));
}

