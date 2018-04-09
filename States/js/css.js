var cssState={
  create: function(){
    //Reset values to default so if player wants to play again, it does not start off "ready" to play
    charSelected1 = false;
    charSelected2 = false;
    charName1 = "";
    charName2 = "";


    key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    dudeIcon = game.add.sprite(game.world.width * .5 - 200, game.world.height * .25 + 50, 'dudeIcon');
    dudeIcon.anchor.setTo(.5,.5);
    dudeIcon.scale.setTo(.5,.5);
    game.physics.arcade.enable(dudeIcon);
    dudeIcon.tint =  0xffffff;

    chickIcon = game.add.sprite(game.world.width * .5 + 200, game.world.height * .25 + 50, 'chickIcon');
    chickIcon.anchor.setTo(.5,.5);
    chickIcon.scale.setTo(.5,.5);
    game.physics.arcade.enable(chickIcon);
    chickIcon.tint =  0xffffff;

    //TEST:COMPUTER icon
    computerIcon = game.add.sprite(game.world.width * .5, game.world.height * .5  - 100, 'computerIcon');
    computerIcon.anchor.setTo(.5,.5);
    computerIcon.scale.setTo(.25,.25);
    game.physics.arcade.enable(computerIcon);
    computerIcon.tint =  0xffffff;

    player1Icon = game.add.sprite(game.world.width * .5 -50, game.world.height * .5, 'player1cssIcon');
    player2Icon = game.add.sprite(game.world.width * .5 +50, game.world.height * .5, 'player2cssIcon');

    player1Icon.inputEnabled = true;
    player2Icon.inputEnabled = true;

    player1Icon.input.enableDrag(true);
    player2Icon.input.enableDrag(true);

    game.physics.arcade.enable(player1Icon);
    game.physics.arcade.enable(player2Icon);

    player1Icon.enableBody = true;
    player2Icon.enableBody = true;

    player1Icon.events.onDragStop.add(this.onDragStop, this);
    player1Icon.events.onDragStart.add(this.onDragStart, this);
    player2Icon.events.onDragStop.add(this.onDragStop, this);
    player2Icon.events.onDragStart.add(this.onDragStart, this);

    dudeIcon.enableBody = true;
    chickIcon.enableBody = true;

    buttonSound = game.add.audio('buttonSound');

    var startLabel=game.add.text(80,game.world.height-40,'Press "1" key to play game after selecting characters!',{font: '25px Arial',fill:'#ffffff'});
    gameReadyText = game.add.text(game.world.width * .5,game.world.height-300,'',{font: '50px Arial',fill:'#ffffff'});
    gameReadyText.anchor.setTo(.5,.5);

    player1Text = game.add.text(80,game.world.height-60,'Character 1 selected: ',{font: '25px Arial',fill:'#ffffff'});
    player2Text = game.add.text(80,game.world.height-80,'Character 2 selected: ',{font: '25px Arial',fill:'#ffffff'});

    player1BodyIcon = game.add.sprite(game.world.width * .25, game.world.height * .75, '');
    player2BodyIcon = game.add.sprite(game.world.width * .75, game.world.height * .75, '');
    player1BodyIcon.scale.setTo(1.5,1.5);
    player2BodyIcon.scale.setTo(1.5,1.5);

//TODO:Incorperate dragUpdate function event system into current system. I think it's needed to fix bugs/add dynamic features like spawning the character when hovering over while still dragging.
//TODO:
//find a way to change text, show sprite and name with alpha applied when hovering but NOT selecting character, SOLUTION: probably above comment

  },
  start: function(){
    gameReadyText.text = `Game Start!`;
    music.stop();
    game.state.start('sss');
 },
 update: function() {
   player1Text.text = `Character selected 1: ${charName1}`;
   player2Text.text = `Character selected 2: ${charName2}`;
//If the character is selected, play the selected animation
   game.physics.arcade.collide(player1Icon, player2Icon);
   if(player1BodyIcon.animations)
   {
     player1BodyIcon.animations.play('idle');
   }

   if(player2BodyIcon.animations)
   {
     player2BodyIcon.animations.play('idle');
   }

   if(charSelected1 && charSelected2 && key1.isDown)
   {
     //Eventually allow the player to start game;
     gameReadyText.text = `Game Start!`;
     game.state.start('sss');
   }
   else if(charSelected1 && charSelected2)
   { //Allow the player to tap game ready to start game
     gameReadyText.text = `Game ready:\nClick to start!`;
     gameReadyText.inputEnabled = true;
     gameReadyText.events.onInputUp.addOnce(function() {
       music.stop();
      game.state.start('sss');
     });

   }
   else {
     {
       gameReadyText.text = ``;
        gameReadyText.inputEnabled = false;
     }

   }
 },
 onDragStop: function() {

//If you drop the cursor on the icon
   if(game.physics.arcade.overlap(player1Icon, dudeIcon))
   {
     buttonSound.play();
     //Determine's what's spawned, and lets you start game
     charName1 = "dude";
     charSelected1 = true;
      //"select" dude, and change color of pic
     dudeIcon.tint =  0xffff00;
     //destroys the old sprite so when you create a new one only one exists
     player1BodyIcon.kill();

     player1BodyIcon = game.add.sprite(game.world.width * .25 - 100, game.world.height * .5, 'dude');

     player1BodyIcon.scale.setTo(3.5,3.5);
     player1BodyIcon.animations.add('idle', [1, 2], 5, true);
     player1BodyIcon.animations.add('kick', [6], 5, true);
     if(player1BodyIcon.animations)
     {
       player1BodyIcon.alpha = 1;
     }
   }
   else
   {
    // player1BodyIcon.kill();
   }

   //If you drop the icon on the chick Picture
   if(game.physics.arcade.overlap(player1Icon, chickIcon))
   {
     buttonSound.play();
     charName1 = "chick";
     charSelected1 = true;
     chickIcon.tint =  0xffff00;
     player1BodyIcon.kill();

     player1BodyIcon = game.add.sprite(game.world.width * .25 - 100, game.world.height * .5, 'chick');

     player1BodyIcon.scale.setTo(3.5,3.5);
     player1BodyIcon.animations.add('idle', [1, 2], 5, true);
     player1BodyIcon.animations.add('kick', [6], 5, true);
     if(player1BodyIcon.animations)
     {
       player1BodyIcon.alpha = 1;
     }
   }



   if(game.physics.arcade.overlap(player2Icon,dudeIcon))
   {
     buttonSound.play();
     charName2 = "dude";
     charSelected2 = true;
     dudeIcon.tint =  0xffff00;
     player2BodyIcon.kill();

     player2BodyIcon = game.add.sprite(game.world.width * .75 - 100, game.world.height * .5, 'dude');
     player2BodyIcon.scale.setTo(3.5,3.5);
     player2BodyIcon.animations.add('idle', [1, 2], 5, true);
     player2BodyIcon.animations.add('kick', [6], 5, true);
     player2BodyIcon.visible = true;


     if(player2BodyIcon.animations)
     {
       player2BodyIcon.alpha = 1;
     }
   }
   else
   {
     //player2BodyIcon.kill();
   }



   if(game.physics.arcade.overlap(player2Icon,chickIcon))
   {
     buttonSound.play();
     charName2 = "chick";
     charSelected2 = true;
     chickIcon.tint =  0xffff00;
     player2BodyIcon.kill();

     player2BodyIcon = game.add.sprite(game.world.width * .75 - 100, game.world.height * .5, 'chick');
     player2BodyIcon.scale.setTo(3.5,3.5);
     player2BodyIcon.animations.add('idle', [1, 2], 5, true);
     player2BodyIcon.animations.add('kick', [6], 5, true);

     if(player2BodyIcon.animations)
     {
       player2BodyIcon.alpha = 1;
     }
   }
   else
   {
    // player2BodyIcon.kill();
   }

   if(game.physics.arcade.overlap(player2Icon,computerIcon))
   {
     buttonSound.play();
     charName2 = "chick";
     charSelected2 = true;
     computerIcon.tint =  0xffff00;
     player2BodyIcon.kill();
     controlOptionAI = -2; //Temporary till we have the AI logic, then replace this with a -2 instead,using vpad to test functionality
     console.log("controlOptionAI: " + controlOptionAI);
     player2BodyIcon = game.add.sprite(game.world.width * .75 - 100, game.world.height * .5, 'chick');
     player2BodyIcon.scale.setTo(3.5,3.5);
     player2BodyIcon.animations.add('idle', [1, 2], 5, true);
     player2BodyIcon.animations.add('kick', [6], 5, true);

     if(player2BodyIcon.animations)
     {
       player2BodyIcon.alpha = 1;
     }
   }
   else
   {
    // player2BodyIcon.kill();
   }

   if(!game.physics.arcade.overlap(player1Icon,dudeIcon) && !game.physics.arcade.overlap(player1Icon,chickIcon))
   {
     player1BodyIcon.kill();
   }

   if(!game.physics.arcade.overlap(player2Icon,dudeIcon) && !game.physics.arcade.overlap(player2Icon,chickIcon) && !game.physics.arcade.overlap(player2Icon,computerIcon))
   {
     player2BodyIcon.kill();
   }

 },
 onDragStart: function() {


   if(game.physics.arcade.overlap(player1Icon, dudeIcon))
   {
     charName1 = "";
     charSelected1 = false;
     dudeIcon.tint =  0xffffff;

      if(player1BodyIcon.animations)
      {
        player1BodyIcon.alpha = .5;
      }
   }


   if(game.physics.arcade.overlap(player1Icon, chickIcon))
   {
     charName1 = "";
     charSelected1 = false;
     chickIcon.tint =  0xffffff;

      if(player1BodyIcon.animations)
      {
        player1BodyIcon.alpha = .5;
      }
   }


   if(game.physics.arcade.overlap(player2Icon, dudeIcon))
   {
     charName2 = "";
     charSelected2 = false;
     dudeIcon.tint =  0xffffff;

      if(player2BodyIcon.animations)
      {
        player2BodyIcon.alpha = .5;
      }
   }


   if(game.physics.arcade.overlap(player2Icon, chickIcon))
   {
     charName2 = "";
     charSelected2 = false;
     chickIcon.tint =  0xffffff;

      if(player2BodyIcon.animations)
      {
        player2BodyIcon.alpha = .5;
      }
   }
   if(game.physics.arcade.overlap(player2Icon, computerIcon))
   {
     charName2 = "";
     charSelected2 = false;
     computerIcon.tint =  0xffffff;
     controlOptionAI = 2;
     console.log("controlOptionAI: " + controlOptionAI);

      if(player2BodyIcon.animations)
      {
        player2BodyIcon.alpha = .5;
      }
   }


 }
};
