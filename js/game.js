class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.map = new Map();
        this.player = new Player(100, 0);
        this.camera = new Camera(canvas.width, canvas.height);
        this.ui = new UI();
        this.buildings = new Buildings();
        this.zombies = new Zombies();
        this.bots = new Bots();
        this.network = new Network();

        this.network.connect();  // Connect to the server
    }

    start() {
        this.loop();
    }

    loop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.loop());
    }

    update() {
        this.player.update();
        this.camera.update(this.player);
        this.zombies.update();
        this.bots.update();
        this.network.update();  // Sync game state with the server
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.map.draw(this.ctx, this.camera);
        this.buildings.draw(this.ctx, this.camera);
        this.player.draw(this.ctx, this.camera);
        this.zombies.draw(this.ctx, this.camera);
        this.bots.draw(this.ctx, this.camera);
        this.ui.draw(this.ctx);
    }
}
