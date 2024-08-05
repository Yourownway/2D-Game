class SpriteSheet {
	constructor(imageSrc) {
		this.image = new Image();
		this.image.src = imageSrc;
		this.spritesConfig = [
			{
				name: "tree1",
				sx: 0,
				sy: 195,
				sWidth: 48,
				sHeight: 64,
				width: 64,
				height: 64,
				dWidth: 48,
				dHeight: 64,
				dx: 8,
			},
			{
				name: "tree2",
				sx: 0,
				sy: 350,
				sWidth: 48,
				sHeight: 48,
				width: 64,
				height: 64,
				dWidth: 48,
				dHeight: 52,
				dx: (64 - 48) / 2,
				dy: (64 - 48) / 2,
			},
			{
				name: "fir1",
				sx: 0,
				sy: 265,
				sWidth: 64,
				sHeight: 64,
				width: 64,
				height: 64,
				dWidth: 64,
				dHeight: 64,
			},
			// Ajoutez autant de sprites que nécessaire
		];
		this.sprites = [];
	}

	// Charger les sprites en fonction des coordonnées personnalisées
	loadSprites(callback) {
		this.image.onload = () => {
			for (let spriteConfig of this.spritesConfig) {
				let {
					name,
					width,
					height,
					sx,
					sy,
					sWidth,
					sHeight,
					dWidth,
					dHeight,
					dx = 0,
					dy = 0,
				} = spriteConfig;
				let canvas = document.createElement("canvas");
				canvas.width = width;
				canvas.height = height;
				let ctx = canvas.getContext("2d");
				ctx.drawImage(
					this.image,
					sx,
					sy,
					sWidth,
					sHeight,
					dx,
					dy,
					dWidth,
					dHeight
				);
				ctx.strokeStyle = "red"; // Couleur de la bordure
				ctx.lineWidth = 2; // Épaisseur de la bordure
				ctx.strokeRect(dx, dy, dWidth, dHeight);
				
				let src = canvas.toDataURL();
				this.sprites.push({ name, src, sWidth, sHeight, dWidth, dHeight,dx,dy });
			}
			callback(this.sprites);
		};
	}


}
