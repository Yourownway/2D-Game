
window.onload = function () {
	const canvas = document.getElementById("gameCanvas");
	const ctx = canvas.getContext("2d");
	const imageUrls = [
		'assets/maps/01/land.png',
		'assets/maps/01/house2D.png',
	];
	
	const spritesheet = new SpriteSheet(imageUrls);
	const map = new Map(spritesheet);
	const player = new Player(map);
	const camera = new Camera(canvas.width, canvas.height);


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
