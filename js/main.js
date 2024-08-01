
window.onload = function () {
	const canvas = document.getElementById("gameCanvas");
	const ctx = canvas.getContext("2d");
    const spritesheet = new SpriteSheet('assets/maps/01/land.png');
	const map = new Map(spritesheet);
	const player = new Player(0, 0, map);
	const camera = new Camera(canvas.width, canvas.height);

	console.dir(canvas, "canvas1");
	console.dir(camera, "camera1");

	function gameLoop() {
		// Efface le canevas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Met à jour les éléments
		player.update();
		camera.update(player);

		// Dessine les éléments
		map.draw(ctx, camera);
		player.draw(ctx, camera);

		requestAnimationFrame(gameLoop);
	}

	gameLoop();
};
