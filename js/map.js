class Map {
	constructor(spriteSheet) {
		this.tilesets = []; // Tableau pour stocker plusieurs images de tileset

		// Charger la première image de tileset
		let tileset1 = new Image();
		tileset1.src = "assets/maps/01/Brick_01.png";
		this.tilesets.push(tileset1);

		// Charger la deuxième image de tileset
		let tileset2 = new Image();
		tileset2.src = "assets/maps/01/Brick_03.png"; // Remplacez par le chemin de votre deuxième image de tileset
		this.tilesets.push(tileset2);

		this.spriteSheet = spriteSheet;
		this.sprites = [];
		this.tileSize = 250; // Taille logique de la tuile
		this.displayTileSize = 128; // Taille affichée de la tuile
		this.rows = 10;
		this.cols = 10;

		this.map = [
			// Exemple de carte avec différentes tuiles provenant de différents tilesets
			[1, 2, 1, 2, 1, 2, 2, 0, 0, 0],
			[2, 2, 2, 1, 1, 1, 1, 1, 1, 0],
			[2, 1, 1, 1, 0, 0, 0, 0, 1, 0], // 2 correspond à une tuile du deuxième tileset
			[2, 2, 2, 1, 1, 1, 1, 0, 1, 0],
			[2, 1, 1, 1, 0, 0, 1, 0, 1, 0],
			[0, 1, 1, 1, 0, 0, 1, 0, 1, 0],
			[0, 1, 1, 1, 1, 1, 1, 0, 1, 0],
			[0, 1, 1, 0, 0, 0, 0, 0, 1, 0],
			[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		];

		this.natureMatrix = this.createEmptyMatrix(this.rows, this.cols); // Initialiser une matrice vide

		this.spriteSheet.loadSprites((sprites) => {
			this.sprites = sprites;
			this.initializeNatureMatrix();
		});
	}

	createEmptyMatrix(rows, cols) {
		let matrix = [];
		for (let i = 0; i < rows; i++) {
			let row = [];
			for (let j = 0; j < cols; j++) {
				row.push("");
			}
			matrix.push(row);
		}
		return matrix;
	}

	initializeNatureMatrix() {
		this.natureMatrix = this.createEmptyMatrix(this.rows, this.cols);

		this.natureMatrix[2][1] = "tree2";
		this.natureMatrix[2][2] = "tree2";
		this.natureMatrix[3][1] = "tree2";
		this.natureMatrix[3][2] = "tree2";
		this.natureMatrix[4][1] = "tree2";
		this.natureMatrix[4][2] = "tree2";
		this.natureMatrix[0][1] = "house1";
		this.natureMatrix[0][2] = "house2";
		this.natureMatrix[0][3] = "house3";
	    this.natureMatrix[2][0] = "fir1";
		this.natureMatrix[0][5] = "tree1";
	}

	isObstacle(x, y) {
		const col = Math.floor(x / this.displayTileSize);
		const row = Math.floor(y / this.displayTileSize);

		if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
			return true;
		}

		if (this.map[row][col] === 0) return true;

		let natureTile = this.natureMatrix[row][col];
		if (natureTile) {
			let sprite = this.sprites.find((s) => s.name === natureTile);
			if (sprite) {
				let { dWidth, dHeight, dx = 0, dy = 0 } = sprite;
				let tileX = col * this.displayTileSize;
				let tileY = row * this.displayTileSize;

				if (
					x >= tileX + dx &&
					x < tileX + dWidth &&
					y >= tileY + dy &&
					y < tileY + dHeight
				) {
					return true;
				}
			}
		}

		return false;
	}

	canMoveTo(x, y, width, height) {
		const canMove = !(
			this.isObstacle(x, y) ||
			this.isObstacle(x + width, y) ||
			this.isObstacle(x, y + height) ||
			this.isObstacle(x + width, y + height)
		);
		return canMove;
	}

	draw(ctx, camera) {
		for (let row = 0; row < this.rows; row++) {
			for (let col = 0; col < this.cols; col++) {
				let tile = this.map[row][col];
				if (tile === 0) {
					tile = 1;
				} else if (tile === 1) {
					tile = 0;
				}
				let tilesetIndex = Math.floor(tile / 2);
				let tileset = this.tilesets[tilesetIndex];

				let sx = (tile % 2) * this.tileSize;
				let sy = 0;

				ctx.drawImage(
					tileset,
					sx,
					sy,
					this.tileSize,
					this.tileSize,
					col * this.displayTileSize - camera.x,
					row * this.displayTileSize - camera.y,
					this.displayTileSize,
					this.displayTileSize
				);

				let natureTile = this.natureMatrix[row][col];
				if (natureTile) {
					let sprite = this.sprites.find((s) => s.name === natureTile);
					if (sprite) {
						let img = new Image();
						img.src = sprite.src;
						ctx.drawImage(
							img,
							col * this.displayTileSize - camera.x,
							row * this.displayTileSize - camera.y,
							this.displayTileSize,
							this.displayTileSize
						);
					}
				}
			}
		}
	}
}
