import Runner from './runner.js';
class Enemy {
    constructor(type, x, y) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.image = new Image();
        
        // Set image based on type
        if (this.type === 'cactus') {
            this.image.src = '../assets/cactus.png';
            this.speed = 6;
        } else {
            this.image.src = '../assets/pterodactyl.png';
            this.speed = 8;
            this.flapFrame = 0;
        }
    }

    draw(ctx) {
        const scale = 0.8;
        const width = this.image.naturalWidth * scale;
        const height = this.image.naturalHeight * scale;
        ctx.drawImage(this.image, this.x, this.y, width, height);
    }

    update() {
        // Move enemy left
        this.x -= this.speed;
    }

    handleCollision(runner){
        // Get the current sprite dimensions
        const scale = 0.8;
        const hitboxReduction = Runner.isDucking ? 0.5 : 1.0; // Reduce hitbox height by 50% when ducking
        
        // Get the actual dimensions from the current images
        const dinoWidth = Runner.runnerImg.width * scale;
        const dinoHeight = Runner.runnerImg.height * scale * hitboxReduction;
        const enemyWidth = this.image.width * scale;
        const enemyHeight = this.image.height * scale;
        
        // When ducking, raise the bottom of the hitbox to match the visual ducking height
        const dinoY = Runner.isDucking ? 
            Runner.py + (Runner.runnerImg.height * scale * (1 - hitboxReduction)) : 
            Runner.py;

        // Log collision info for debugging
        if (this.type === 'pterodacyl') {
            console.log('Collision Check:', {
                isDucking: Runner.isDucking,
                dinoPos: { x: Runner.px, y: dinoY },
                dinoSize: { width: dinoWidth, height: dinoHeight },
                enemyPos: { x: this.x, y: this.y },
                enemySize: { width: enemyWidth, height: enemyHeight }
            });
        }

        // Reduce the hitbox size slightly to be more forgiving
        const hitboxPadding = 10;
        
        // AABB collision detection with adjusted hitbox
        if (
            Runner.px + hitboxPadding < this.x + enemyWidth - hitboxPadding &&
            Runner.px + dinoWidth - hitboxPadding > this.x + hitboxPadding &&
            dinoY + hitboxPadding < this.y + enemyHeight - hitboxPadding &&
            dinoY + dinoHeight - hitboxPadding > this.y + hitboxPadding
        ) {
            return true;
        } 
        return false;
    }
}

export default Enemy;

