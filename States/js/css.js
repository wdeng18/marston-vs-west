console.log("winstate reached");

var cssState={
  create: function(){
    marstonPicture = game.add.sprite(game.world.width * .5 - 200, game.world.height * .5 + 50, 'marstonPic');
    marstonPicture.anchor.setTo(.5,.5);
    marstonPicture.scale.setTo(.25,.25);
    game.physics.arcade.enable(marstonPicture);

    player1Icon = game.add.sprite(game.world.width * .5 -50, game.world.height * .5, 'player1cssIcon');
    player2Icon = game.add.sprite(game.world.width * .5 +50, game.world.height * .5, 'player2cssIcon');
    player1Icon.inputEnabled = true;
    player2Icon.inputEnabled = true;
    player1Icon.input.enableDrag(true);
    player2Icon.input.enableDrag(true);
    game.physics.arcade.enable(player1Icon);
    player1Icon.enableBody = true;
    player1Icon.events.onDragStop.add(this.onDragStop, this);
    game.physics.arcade.enable(player2Icon);
    player2Icon.enableBody = true;
    marstonPicture.enableBody = true;
    var startLabel=game.add.text(80,game.world.height-80,'Press "W" key to play game!',{font: '25px Arial',fill:'#ffffff'});
    var wkey= game.input.keyboard.addKey(Phaser.Keyboard.W);
    wkey.onDown.addOnce(this.start,this);

  },
  start: function(){
    music.stop();
    console.log("overlap")
   game.state.start('play');
 },
 update: function() {


   game.physics.arcade.collide(player1Icon, player2Icon);
 },
 onDragStop: function() {
   if(game.physics.arcade.overlap(player1Icon, marstonPicture))
   {
     console.log("You selected Marston, they are overlapping and it was dropped");
   }

 }
};
