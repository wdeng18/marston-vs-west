console.log("bootstate reached");
var bootState={

	create: function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
		if(game.device.android || game.device.iOS)
		{
		  game.scale.startFullScreen();
		  game.scale.fullScreenScaleMode = EXACT_FIT;
		  console.log("This only logs for mobile, and will NEVER log for desktop")
		}

		game.state.start ('load');


	}
};
