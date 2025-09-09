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
}

export default Enemy;

