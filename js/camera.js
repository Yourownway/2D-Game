class Camera {
    constructor(width, height, scale = 1) {
        this.width = width;
        this.height = height;
        this.x = 0;
        this.y = 0;
        this.scale = scale;
    }

    update(player) {
        this.x = player.x - this.width / 2 / this.scale;
        this.y = player.y - this.height / 2 / this.scale;
    }
}
