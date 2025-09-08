import Runner from "../classes/runner.js"
let runner;

 // World level variables
    let score = 0;
    let hiScore = 0;

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector("canvas")
    const ctx = canvas.getContext("2d")

   

    // Place the score data at the top right of the canvas or the world
    ctx.font = '10px "Press Start 2P"';
    ctx.fillText(`Hi ${String(hiScore).padStart('5', 0)}`, 600, 30)
    ctx.fillText(`${String(score).padStart('5', 0)}`, 690, 30)

    // Draw the runner 
    runner = new Runner()
    runner.initialDraw(ctx)

    gameLoop(ctx)
})


// Events go here
document.addEventListener("keydown", (e) => {
  if(e.code === "Space"){
    if(runner) runner.jump();
  }
})

function gameLoop(ctx) {
    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Redraw score
    ctx.font = '10px "Press Start 2P"';
    ctx.fillText(`Hi ${String(hiScore).padStart('5', 0)}`, 600, 30);
    ctx.fillText(`${String(score).padStart('5', 0)}`, 690, 30);

    // Draw runner
    if (runner){
        runner.initialDraw(ctx);
    } 

    // Update game state here if needed
    runner.update()
    runner.run()
    requestAnimationFrame(() => gameLoop(ctx));
}

