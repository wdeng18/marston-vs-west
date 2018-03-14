console.log("loadstate reached");
var loadState={

	preload: function(){
		var loadingLabel= game.add.text(80,150,'Loading...',{font: '30px Courier',fill: '#ffffff'});


				//game.load.image('sky', 'https://ufosc.github.io/marston-vs-west/States/assets/sky.png');
				game.load.image('sky', 'https://ufosc.github.io/marston-vs-west/States/assets/TestStage2.png');
				//game.load.image('ground', 'assets/platform.png');
				//game.load.image('ground', 'assets/platform2.png');
				game.load.image('ground', 'https://ufosc.github.io/marston-vs-west/States/assets/floorblock.png');
				game.load.image('star', 'https://ufosc.github.io/marston-vs-west/States/assets/star.png');
				//game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

				game.load.spritesheet('dude', 'https://ufosc.github.io/marston-vs-west/States/assets/Fighter1master.png', 36, 42);
				game.load.spritesheet('chick', 'https://ufosc.github.io/marston-vs-west/States/assets/Fighter2master.png', 36, 42);

				game.load.image('hitboxTest', 'https://ufosc.github.io/marston-vs-west/States/assets/testHitbox.png');
				game.load.spritesheet('baddie', 'https://ufosc.github.io/marston-vs-west/States/assets/baddie.png', 32, 32 );
				game.load.spritesheet('slash', 'https://ufosc.github.io/marston-vs-west/States/assets/slash (1).png', 64, 64 );
				game.load.spritesheet('slash2', 'https://ufosc.github.io/marston-vs-west/States/assets/slash.png', 32, 32 );
				game.load.spritesheet('helmet', 'https://ufosc.github.io/marston-vs-west/States/assets/helmet.png', 32, 32 );
				game.load.spritesheet('bottle', 'https://ufosc.github.io/marston-vs-west/States/assets/bottle.png', 32, 32 );
				game.load.spritesheet('book', 'https://ufosc.github.io/marston-vs-west/States/assets/book.png', 32, 32 );
				game.load.spritesheet('Sandbag', 'https://ufosc.github.io/marston-vs-west/States/assets/sandbag.png', 32, 32 );
				game.load.image('startButton', 'https://ufosc.github.io/marston-vs-west/States/assets/startButton.png');
				game.load.image('optionsButton', 'https://ufosc.github.io/marston-vs-west/States/assets/optionsButton.png');
				game.load.image('quitButton', 'https://ufosc.github.io/marston-vs-west/States/assets/quitButton.png');
				game.load.image('creditsButton', 'https://ufosc.github.io/marston-vs-west/States/assets/creditsButton.png');
				game.load.image('menuButton', 'https://ufosc.github.io/marston-vs-west/States/Assets/menuButton.png');
				this.game.load.audio('creditsMusic', 'https://ufosc.github.io/marston-vs-west/States/assets/creditsTestMusic.ogg');
				this.game.load.audio('menuMusic', 'https://ufosc.github.io/marston-vs-west/States/assets/menuTestMusic.ogg');
				this.game.load.audio('allstar', 'https://ufosc.github.io/marston-vs-west/States/assets/allstar.ogg');
				game.load.image('marstonPic', 'https://ufosc.github.io/marston-vs-west/States/assets/thegreatestlibrary.jpeg');
				game.load.image('westPic', 'https://ufosc.github.io/marston-vs-west/States/assets/theworstlibrary.jpg');
				game.load.image('fullScreenButton', 'https://ufosc.github.io/marston-vs-west/States/assets/fullScreenButton.png');
				game.load.image('displayButton1', 'https://ufosc.github.io/marston-vs-west/States/assets/displayButton1.png');
				game.load.image('displayButton2', 'https://ufosc.github.io/marston-vs-west/States/assets/displayButton2.png');
				game.load.image('displayButton3', 'https://ufosc.github.io/marston-vs-west/States/assets/displayButton3.png');
				game.load.image('displayButton4', 'https://ufosc.github.io/marston-vs-west/States/assets/displayButton4.png');
				game.load.image('player1cssIcon', 'https://ufosc.github.io/marston-vs-west/States/assets/player1cssIcon.png');
				game.load.image('player2cssIcon', 'https://ufosc.github.io/marston-vs-west/States/assets/player2cssIcon.png');
				game.load.spritesheet('crowd', 'https://ufosc.github.io/marston-vs-west/States/assets/dude.png', 32, 48);
				//game.load.audio('playMusic', 'assets/playTestMusic.ogg');

		},
	create: function(){
		music = game.add.audio('menuMusic');
		music.loopFull();
		game.state.start('menu');

	}
};
