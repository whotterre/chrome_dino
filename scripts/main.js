import Runner from "../classes/runner.js"
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector("canvas")
    const ctx = canvas.getContext("2d")

    // World level variables
    let score = 0;
    let hiScore = 0;
    let g = 3


    // Place the score data at the top right of the canvas or the world
    ctx.font = '10px "Press Start 2P"';
    ctx.fillText(`Hi ${String(hiScore).padStart('5', 0)}`, 600, 30)
    ctx.fillText(`${String(score).padStart('5', 0)}`, 690, 30)

    // Draw the runner 
    const runner = new Runner()
    runner.initialDraw(ctx)

})

function main() {
    requestAnimationFrame();
}