console.log("bootstate reached");
var bootState={

	create: function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
		if(game.device.android || game.device.iOS)
		{
		  game.scale.fullScreenScaleMode = EXACT_FIT;
		  game.scale.scaleMode = Phaser.ScaleManager.forceOrientation(forceLandscape);
		  game.scale.setMaximum();
		  game.scale.setScreenSize(true);
		  game.scale.refresh();
		  //game.scale.startFullScreen();
		  console.log("This only logs for mobile, and will NEVER log for desktop")
		}

		game.state.start ('load');


	}
};
