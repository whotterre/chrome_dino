/* Runner class */
class Runner {
    static px;
    static py;
    static runnerImg = new Image();
    static g = 0.3
    static groundLevel = 200
    static vy = 3
    static endOfScreen = 720;

    constructor() {
        Runner.runnerImg.src = "../assets/dino_right_run.png"
        Runner.px = 20
        Runner.py = 200
    }

    /*
        Draws the runner dinosaur in the world
    */
    initialDraw(ctx) {
        const scale = 0.8;
        let runnerImgWidth = Runner.runnerImg.naturalWidth * scale;
        let runnerImgHeight = Runner.runnerImg.naturalHeight * scale;
        ctx.drawImage(Runner.runnerImg, Runner.px, Runner.py, runnerImgWidth, runnerImgHeight)

    }

    // Update
    update() {
        Runner.vy += Runner.g;
        Runner.py += Runner.vy;

        if (Runner.py > Runner.groundLevel) {
            Runner.py = Runner.groundLevel;
            Runner.vy = 0;
        }
        console.log("py:", Runner.py, "vy:", Runner.vy);
    }
    // Move forward 
    run(ctx) {
        // Switch betw een state pics every 1s 
        Runner.px += 2
        if(Runner.px > Runner.endOfScreen){
            Runner.px = 20
        }
    }

    jump() {
        if (Runner.py === Runner.groundLevel) {
            Runner.vy = -8;
        }
    }
}

export default Runner