/* Runner class */
class Runner {
    static px;
    static py;

    constructor(){

    }   

    /*
        Draws the runner dinosaur in the world
    */
    initialDraw(ctx){
        const scale = 0.8;
        const runnerImg = new Image();
        runnerImg.src = "../assets/dino_right_run.png"
        let runnerImgWidth = runnerImg.naturalWidth * scale;
        let runnerImgHeight = runnerImg.naturalHeight * scale;
        runnerImg.onload = () => {
            ctx.drawImage(runnerImg, 20, 200, runnerImgWidth, runnerImgHeight)
        }
    }
}

export default Runner