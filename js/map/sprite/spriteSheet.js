class SpriteSheet {
	constructor(imageSrcArray) {
		this.imageSrcArray = imageSrcArray;
		this.spritesConfig = [
			{
				name: "tree1",
				sx: 0,
				sy: 195,
				sWidth: 48,
				sHeight: 56,
				width: 160,
				height: 160,
				dWidth: 108,
				dHeight: 118,
				 dx: (160-108)/2,
				 dy:(160-118)/2,
				imageIndex: 0,
			},
			{
				name: "tree2",
				sx: 2,
				sy: 353,
				sWidth: 44,
				sHeight: 44,
				width: 160,
				height: 160,
				dWidth: 90,
				dHeight: 90,
				dx: (160-90)/2,
				dy:(160-90)/2,
				// dy: (64 - 48) / 2,
				imageIndex: 0, // Ajoutez un index d'image pour spécifier l'image à partir de laquelle ce sprite doit être chargé
			},
			{
				name: "fir1",
				sx: 0,
				sy: 265,
				sWidth: 64,
				sHeight: 64,
				width: 160,
				height: 160,
				dWidth: 90,
				dHeight: 90,
				dx: (160-90)/2,
				dy:(160-90)/2,
				imageIndex: 0,
			},
			{
				name: "house1",
				sx: 36,
				sy: 525,
				sWidth: 256,
				sHeight: 210,
				width: 256,
				height: 256,
				dWidth: 256,
				dHeight: 210,
				imageIndex: 1,
				dy:46
			},	{
				name: "house2",
				sx: 298,
				sy: 525,
				sWidth: 222,
				sHeight: 210,
				width: 256,
				height: 256,
				dWidth: 222,
				dHeight: 210,
				imageIndex: 1,
				dy:46,
				dx: 18
			},	{
				name: "house3",
				sx: 550,
				sy: 500,
				sWidth: 222,
				sHeight: 235,
				width: 256,
				height: 256,
				dWidth: 222,
				dHeight: 235,
				imageIndex: 1,
				dx: 16,
				dy: 22
			},
			// Ajoutez autant de sprites que nécessaire
		];
		this.sprites = [];
	}

	// Charger les sprites en fonction des coordonnées personnalisées pour chaque image
	loadSprites(callback) {
		let loadedImages = 0;
		for (let [index, imageSrc] of this.imageSrcArray.entries()) {
			let image = new Image();
			image.src = imageSrc;

			image.onload = () => {
				for (let spriteConfig of this.spritesConfig) {
					if (spriteConfig.imageIndex !== undefined && spriteConfig.imageIndex !== index) {
						continue; // Si l'index de l'image ne correspond pas, passer au sprite suivant
					}
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
						image,
						sx,
						sy,
						sWidth,
						sHeight,
						dx,
						dy,
						dWidth,
						dHeight
					);
					// ctx.strokeStyle = "red"; // Couleur de la bordure
					// ctx.lineWidth = 2; // Épaisseur de la bordure
					// ctx.strokeRect(dx, dy, dWidth, dHeight);

					let src = canvas.toDataURL();
					this.sprites.push({ name, src, sWidth, sHeight, dWidth, dHeight, dx, dy });
				}
				loadedImages++;
				if (loadedImages === this.imageSrcArray.length) {
					callback(this.sprites);
				}
			};
		}
	}
}

