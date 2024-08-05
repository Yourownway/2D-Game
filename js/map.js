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
			[1, 2, 1, 0, 0, 0, 0, 0, 0, 0],
			[2, 2, 2, 1, 1, 1, 1, 1, 1, 0],
			[2, 1, 1, 1, 0, 0, 0, 0, 1, 0], // 2 correspond à une tuile du deuxième tileset
			[2, 2, 2, 1, 1, 1, 1, 0, 1, 0],
			[2, 1, 0, 1, 0, 0, 1, 0, 1, 0],
			[0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
			[0, 1, 0, 1, 1, 1, 1, 0, 1, 0],
			[0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
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
		// Assurez-vous que la natureMatrix a la même dimension que la map
		this.natureMatrix = this.createEmptyMatrix(this.rows, this.cols);
		this.natureMatrix[0][1] = "tree1";
		// this.natureMatrix[1][1] = 'fir1';
		this.natureMatrix[2][1] = "tree2";
		// Ajoutez la configuration de votre natureMatrix
	}

	isObstacle(x, y) {
		const col = Math.floor(x / this.displayTileSize);
		const row = Math.floor(y / this.displayTileSize);

		// Vérifier si les indices sont valides avant d'accéder à la matrice
		if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
			return true; // Considérer les indices hors limites comme obstacles
		}
		// Considérer les tuiles de type 0 comme des obstacles
		if (this.map[row][col] === 0) return true;

		// Vérifier les obstacles dans la natureMatrix
		let natureTile = this.natureMatrix[row][col];
		if (natureTile) {
			let sprite = this.sprites.find((s) => s.name === natureTile);
			if (sprite) {
				let { dWidth, dHeight, dx = 0, dy = 0 } = sprite;
				let tileX = col * this.displayTileSize;
				let tileY = row * this.displayTileSize;

				if (
					x >= tileX + dx + dWidth / 2 &&
					x < (col + 1) * this.displayTileSize - dWidth + 2 * dx &&
					y >= tileY + 2 * dy &&
					y < (row + 1) * this.displayTileSize - dy - 8
				) {
					return true;
				}
				// Vérifier si les coordonnées se trouvent dans les limites de l'élément
				//     if (x > (tileX  + dWidth/2)  && x < (col + 1)* this.displayTileSize + dx + 8 - dWidth
				//     && y >= tileY + 8  && y < (row + 1)* this.displayTileSize - dy -8
				// ) {
				//         return true;
				//     }
			}
		}

		return false;
	}

	canMoveTo(x, y, width, height) {
		// Vérifier les quatre coins du joueur
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
				// Sélectionner le tileset approprié en fonction de la valeur de la tuile
				let tilesetIndex = Math.floor(tile / 2); // Par exemple, les tuiles 0 et 1 proviennent du premier tileset, 2 et 3 du deuxième, etc.
				let tileset = this.tilesets[tilesetIndex];

				// Calculer les coordonnées de la tuile dans le tileset
				let sx = (tile % 2) * this.tileSize; // 2 est le nombre de colonnes de tuiles dans le tileset
				let sy = 0;

				// Dessiner la tuile
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

				// Dessiner l'élément naturel s'il y en a un
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
