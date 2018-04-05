class crowd{
  constructor(startx, starty)
  {
    this.crowdsprite = game.add.sprite(startx, starty, 'crowd');
    game.physics.arcade.enable(this.crowdsprite);
    this.people = game.add.weapon(5, 'dude');
    this.people.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
    this.people.bulletLifespan = 300;
    this.people.bulletSpeed = 0;
    this.people.fireRate = 50;
    this.people.trackSprite(this.crowdsprite, 10, -30, true);
    this.crowdsprite.anchor.setTo(0.5,0);
  }
}

//Virtual pad
class vpad{
  constructor(controlnum)
  //constructor()
  {

  this.controlnum = controlnum;
  //console.log('inside constructor');
  //Virtual controller variables
  this.leftpress = false;
  this.rightpress = false;
  this.uppress = false;
  this.downpress = false;

  //var jump = false;
  this.apress = false;//regular attack button
  this.bpress = false;//special button
  this.xpress = false;//jump button
  this.ypress = false;//block button



  this.buttonleft = game.add.button(5, 472, 'leftButton', null, this, 0, 1, 0, 1);

  }

}

class Fighter {
  constructor(character,health,lives,startx,starty,controlnum) {


       this.character = game.add.sprite(startx, starty, character);//player character variable to access sprite from phaser and all its properties character variable is name of spritesheet to use
       this.health = health;//player start health
       this.lives = lives;

       //Respawn Animation Activator Switch
       this.respawnSwitch = false;
       //m is the respawn animation counter
       this.m = 0;

       this.startx = startx;
       this.starty = starty;

      //Cooldown for attacks
      this.hitCD = 0;

      //Switch for when an attack is on CD
      this.hitSwitchPunch = false;
      this.hitSwitchKick = false;


       //shielding is the boolean if the shield is up or not
       this.shielding = false;

       //hitVelocity determines the knockback
       this.hitVelocity = 0;
       //Hit stun counter
       this.stunCounter = 0;

       this.controlnum = controlnum;

       this.state = 0; //player state for state machine?

       this.jumps = 0;

       this.character.anchor.setTo(0.5,0);

           //  We need to enable physics on the player
       game.physics.arcade.enable(this.character);

       //  Player physics properties. Give the little guy a slight bounce.
       this.character.body.bounce.y = 0;//0.2;
       this.character.body.gravity.y = 1000;
       this.character.body.collideWorldBounds = false;


	   this.character.body.setSize(30, 70, 10, 0)
	   this.character.scale.x = 1.25;
       this.character.scale.y = 1.25;

       //Player animations

	     this.character.animations.add('right', [ 3,4,5,6,7], 10, true);

       //idle animation
       this.character.animations.add('idle', [5, 6], 5, true);

       //jump animation
       this.character.animations.add('jump', [13, 14], 5, false); //need to adjust animation speed

       //shield animation
       this.character.animations.add('shield', [10], 5, false);

       //punch animations
       this.character.animations.add('punch', [6, 7, 8], 10, false);

       //kick
       this.character.animations.add('kick', [11, 12, 12, 12], 10, false);

       //player got hit animation
       this.character.animations.add('ko', [12], 5, false);


       //this.controller1 = game.input.keyboard.addKeys({ 'up': Phaser.KeyCode.W, 'down': Phaser.KeyCode.S, 'left': Phaser.KeyCode.A, 'right': Phaser.KeyCode.D , 'punch': Phaser.KeyCode.T, 'kick': Phaser.KeyCode.R});

    if(controlnum == 1)
     {
      this.controller1 = new Object;
      controller1 = game.input.keyboard.addKeys({ 'jump': Phaser.KeyCode.E, 'up': Phaser.KeyCode.W, 'down': Phaser.KeyCode.S, 'left': Phaser.KeyCode.A, 'right': Phaser.KeyCode.D , 'punch': Phaser.KeyCode.T, 'kick': Phaser.KeyCode.R, 'shield': Phaser.KeyCode.Y, 'special': Phaser.KeyCode.F});
     }
    else if(controlnum == 2)
     {
     this.controller2 = new Object;
     controller2 = game.input.keyboard.addKeys({ 'jump': Phaser.KeyCode.I, 'up': Phaser.KeyCode.UP, 'down': Phaser.KeyCode.DOWN, 'left': Phaser.KeyCode.LEFT, 'right': Phaser.KeyCode.RIGHT , 'punch': Phaser.KeyCode.P, 'kick': Phaser.KeyCode.O, 'shield': Phaser.KeyCode.OPEN_BRACKET, 'special': Phaser.KeyCode.J});
     }
     else if(controlnum == -1){
      //this.controller1 = new Object;
      //console.log("vpad!!");
      this.controller1 = new vpad(-1);
      //console.log("vpad made!!");
     }

       this.weapon1 = game.add.weapon(1, 'slash');
       this.weapon1.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
       this.weapon1.bulletLifespan = 50; //50
       this.weapon1.bulletSpeed = 0; //0
       this.weapon1.fireRate = 100;
       this.weapon1.trackSprite(this.character, 28, 40, true);

       this.stocks = game.add.group();

       for (var g = 3; g > 0; g--)
       {

         if(controlnum == -1)
         {
           var stock = this.stocks.create((game.world.width *.42) + (30 * g) + -300, 100, 'player1cssIcon');
           stock.anchor.setTo(.5,.5);

         }
         else if(controlnum == 1)
         {
           var stock = this.stocks.create((game.world.width *.42) + (30 * g) + -300, 100, 'player1cssIcon');
           stock.anchor.setTo(.5,.5);
         }
      }
      for(var h = 0; h < 3; h++)
      {
         if(controlnum == 2)
         {
           var stock = this.stocks.create((game.world.width *.85) + (30 * h), 100, 'player2cssIcon');
           stock.anchor.setTo(.5,.5);

         }
       }






       return this;
     }
  }

class lab extends Fighter {
    constructor(character,health,lives,startx,starty,controlnum) {

      super(character,health,lives,startx,starty,controlnum);
      this.character.body.gravity.y = 200;
      console.log("we created the lab construtor");

        this.jumpSpeed = 25;
        this.fallSpeed = 50;
        this.runSpeed = 50;
        this.attackSpeed = 1; //250;
        this.attackDmg = 1;
        this.moveSpeed = 200;


    }
}

class dj extends Fighter {
    constructor(character,health,lives,startx,starty,controlnum) {

      super(character,health,lives,startx,starty,controlnum);
      this.character.body.gravity.y = 200;
      console.log("we created the dj construtor");

        this.jumpSpeed = 75;
        this.fallSpeed = 50;
        this.runSpeed = 50;
        this.attackSpeed = 1;
        this.attackDmg = 1;
        this.moveSpeed = 250;




    }
}



var playState={

  hitPlayer1: function(){

	if (Player1.m == 0 && !Player1.shielding){
    hitSound.play();
		Player1.health = Player1.health + (2/3) + (0.1 * (Player1.health * 0.1));
		Player1.hitVelocity = Player2.character.scale.x * Player1.health * 2;
    console.log("Before call")
      //  Player1.character.body.velocity.y = this.yHitVelocity(Player1);
        console.log("after call")
         Player1.character.body.velocity.y = -(Math.pow(Player1.health, 1.25));

        if (Player1.health >= 0 || Player1.health <= 75)
      	{
      		Player1.stunCounter = 15;
      	}
      	else if (Player1.health > 75 || Player1.health <= 150)
      	{
          Player1.stunCounter = 45;
      	}
      	else if(Player1.health > 150 || Player1.health < 200)
      	{
      		Player1.stunCounter = 90;
      	}
      	else
      	{
      		Player1.stunCounter = 150;
      	}
	}
},

hitPlayer2: function(){

	if (Player2.m == 0 && !Player2.shielding){
      hitSound.play();
		//Player2.health = Player2.health + (1/3) + (0.1 * (Player2.health * 0.1));
		Player2.health = Player2.health + (2/3) + (0.1 * (Player2.health * 0.1));
		Player2.hitVelocity = Player1.character.scale.x * Player2.health * 2;
    //this.yHitVelocity(Player2);
     Player2.character.body.velocity.y = -(Math.pow(Player2.health, 1.25));
     if (Player2.health >= 0 || Player2.health <= 75)
     {
       Player2.stunCounter = 15;
     }
     else if (Player2.health > 75 || Player2.health <= 150)
     {
       Player2.stunCounter = 45;
     }
     else if(Player2.health > 150 || Player2.health < 200)
     {
       Player2.stunCounter = 90;
     }
     else
     {
       Player2.stunCounter = 150;
     }
	}
},

yHitVelocity: function(Fighter)
{
  Fighter.character.body.velocity.y = -(Math.pow(Fighter.health, 1.25));
  console.log("during call")
},

updateInput: function(controller,Fighter,cooldownNum)
{
//Cooldown for attacking
if (Fighter.hitCD != 0)
{
  Fighter.hitCD -= 1;
}
//Cooldown for hit stun
if (Fighter.stunCounter != 0)
{
  Fighter.stunCounter -= 1;
}
  //update function to decrease/increase the hit velocity based on the original direction of the punch. The natural slowing down of hit velocity
if(Fighter.hitVelocity < 0)
{
  Fighter.hitVelocity += 1;
}
else if (Fighter.hitVelocity > 0)
{
  Fighter.hitVelocity -= 1;
}
else
{
  Fighter.hitVelocity = 0;
}

//control logic for virtual keys
if(Fighter.controlnum == -1){

//console.log('inside vpad reads');
if (Fighter.controller1.leftpress == true){
//console.log(Fighter.controller1.leftpress);
console.log('left!');
}



  if (Fighter.controller1.xpress && Fighter.character.body.touching.down && Fighter.stunCounter == 0 && Fighter.hitVelocity == 0)
  {
      Fighter.character.body.velocity.x = 0;
      Fighter.character.animations.play('shield');
      Fighter.shielding = true;

  }
  else if (Fighter.controller1.apress && !(Fighter.m < 120 && Fighter.m != 0) && Fighter.stunCounter == 0 && Fighter.hitCD == 0)
  {
      //logic to change direction facing
      if (Fighter.character.scale.x < 0 ){
        Fighter.character.body.velocity.x = -250 - Fighter.moveSpeed;
      }
      else
      {
        Fighter.character.body.velocity.x = 250 + Fighter.moveSpeed;
      }
      Fighter.character.animations.play('punch');
      Fighter.weapon1.fire();
      //Fighter.hitCD = 30;
      Fighter.shielding = false;
      Fighter.hitSwitchPunch = true;
      //Causes Player health to increase
      //Fighter.health += 1;
  }
  else if (Fighter.controller1.bpress == true && !(Fighter.m < 120 && Fighter.m != 0) && Fighter.stunCounter == 0 && Fighter.hitCD == 0)
  {
      //  Move to the right

      //logic to change direction facing
      if (Fighter.character.scale.x < 0 ){
        Fighter.character.body.velocity.x = -350 - Fighter.moveSpeed;
      }
      else
      {
        Fighter.character.body.velocity.x = 350 + Fighter.moveSpeed;
      }
      Fighter.character.animations.play('kick');
      //Fighter.hitCD = 60;
      Fighter.weapon1.fire();

      if(Fighter.character.body.touching.down)
      {
        Fighter.character.body.velocity.y = -200;
    }
    Fighter.shielding = false;
    Fighter.hitSwitchKick = true;
  }

  else if (Fighter.controller1.bpress && Fighter.controller1.ypress)
  {
    console.log("Up Special");
  }
  else if (Fighter.controller1.bpress && Fighter.controller1.rightpress)
  {
    console.log("Right Special");
  }
  else if (Fighter.controller1.bpress && Fighter.controller1.leftpress)
  {
    console.log("Left Special");
  }
  else if (Fighter.controller1.bpress && Fighter.controller1.downpress)
  {
    console.log("Down Special");
  }
  else if (Fighter.controller1.bpress)
  {
    console.log("Normal Special")
  }

  else if (Fighter.controller1.ypress && Fighter.jumps <= 5  && !(Fighter.m < 120 && Fighter.m != 0) && Fighter.stunCounter == 0)
  {
      Fighter.character.body.velocity.y = -350 + Fighter.jumpSpeed;
      jumpSound.play();
      Fighter.jumps += 1;
      Fighter.shielding = false;
  }
  else if (Fighter.controller1.leftpress && !(Fighter.m < 120 && Fighter.m != 0) && Fighter.stunCounter == 0)
  {

      if(Fighter.character.body.touching.down)
      {
        Fighter.jumps = 0;
    }

      if (Fighter.character.scale.x > 0 ){
      Fighter.character.scale.x *=-1;
      Fighter.weapon1.trackSprite(Fighter.character, 28, -40, true);
      }
      if (Fighter.character.body.touching.down)
      {
        Fighter.character.body.velocity.x = -250 + Fighter.hitVelocity;
      }
      else
      {
        Fighter.character.body.velocity.x = -200 + Fighter.hitVelocity;
      }
      //Determines the hitvelocity of the player based on inputs from keyboard to decrease the velocity
      if (Fighter.hitVelocity != 0)
      {
        if (Fighter.hitVelocity + -125 < 0){
          Fighter.hitVelocity = 0;
        }
        else
        {
          Fighter.hitVelocity += -125;
        }
      }
      Fighter.character.animations.play('right');
      Fighter.shielding = false;
  }
  else if (Fighter.controller1.rightpress && !(Fighter.m < 120 && Fighter.m != 0) && Fighter.stunCounter == 0)
  {
      //  Move to the right
      if(Fighter.character.body.touching.down)
      {
        Fighter.jumps = 0;
    }
      //logic to change direction facing
      if (Fighter.character.scale.x < 0 ){
      Fighter.character.scale.x *=-1;
      Fighter.weapon1.trackSprite(Fighter.character, 28, 40, true);
      }
      if (Fighter.character.body.touching.down)
      {
        Fighter.character.body.velocity.x = 250 + Fighter.hitVelocity;
      }
      else
      {
        Fighter.character.body.velocity.x = 200 + Fighter.hitVelocity;
      }
      //Determines the hitvelocity of the player based on inputs from keyboard to decrease the velocity
      if (Fighter.hitVelocity != 0)
      {
        if (Fighter.hitVelocity + 125 > 0){
          Fighter.hitVelocity = 0;
        }
        else
        {
          Fighter.hitVelocity += 125;
        }
      }
      Fighter.character.animations.play('right');
      Fighter.shielding = false;
  }

  else
  {
      //Code that assigns the velocity of the player based on the current hitVelocity. Keeps track of jump count and determines the idle animation of the character
    if (Fighter.hitVelocity != 0)
    {
      Fighter.character.body.velocity.x = Fighter.hitVelocity;
    }
    else
    {
      Fighter.character.body.velocity.x = 0;
    }
      if (Fighter.stunCounter > 0)
      {
        Fighter.character.animations.play('ko');
      }
      else
      {
        //Fighter.character.animations.play('idle');
      }
      Fighter.shielding = false;

      if(Fighter.character.body.touching.down)
      {
        Fighter.jumps = 0;
    }
  }
  if(Fighter.controller1.apress && Fighter.hitSwitchPunch)
  {
    Fighter.hitCD = 15;
    Fighter.hitSwitchPunch = false;
  }
  if (Fighter.controller1.bpress && Fighter.hitSwitchKick)
  {
    Fighter.hitCD = 15;
    Fighter.hitSwitchKick= false;
  }


}


//control logic for real keyboard
else if(Fighter.controlnum > 0){

  if (controller.shield.isDown && Fighter.character.body.touching.down && Fighter.stunCounter == 0 && Fighter.hitVelocity == 0)
  {
      Fighter.character.body.velocity.x = 0;
      Fighter.character.animations.play('shield');
      Fighter.shielding = true;

  }
  else if (controller.punch.isDown && controller.punch.downDuration(80 + Fighter.attackSpeed) && !(Fighter.m < 120 && Fighter.m != 0) && Fighter.stunCounter == 0 && Fighter.hitCD == 0)
  {
      //logic to change direction facing
      if (Fighter.character.scale.x < 0 ){
        Fighter.character.body.velocity.x = -250 + Fighter.moveSpeed;
      }
      else
      {
        Fighter.character.body.velocity.x = 250 + Fighter.moveSpeed;
      }
      Fighter.character.animations.play('punch');
      Fighter.weapon1.fire();
      //Fighter.hitCD = 30;
      Fighter.shielding = false;
      Fighter.hitSwitchPunch = true;
      //Causes Player health to increase
      //Fighter.health += 1;
  }
  else if (controller.kick.isDown && controller.kick.downDuration(200 + Fighter.attackSpeed) && !(Fighter.m < 120 && Fighter.m != 0) && Fighter.stunCounter == 0 && Fighter.hitCD == 0)
  {
      //  Move to the right

      //logic to change direction facing
      if (Fighter.character.scale.x < 0 ){
        Fighter.character.body.velocity.x = -350 - Fighter.moveSpeed;
      }
      else
      {
        Fighter.character.body.velocity.x = 350 + Fighter.moveSpeed;
      }
      Fighter.character.animations.play('kick');
      //Fighter.hitCD = 60;
      Fighter.weapon1.fire();

      if(Fighter.character.body.touching.down)
      {
        Fighter.character.body.velocity.y = -200;
      }
    Fighter.shielding = false;
    Fighter.hitSwitchKick = true;
  }

  else if (controller.special.isDown && controller.up.isDown)
  {
  	console.log("Up Special");
  }
  else if (controller.special.isDown && controller.right.isDown)
  {
  	console.log("Right Special");
  }
  else if (controller.special.isDown && controller.left.isDown)
  {
  	console.log("Left Special");
  }
  else if (controller.special.isDown && controller.down.isDown)
  {
  	console.log("Down Special");
  }
  else if (controller.special.isDown)
  {
  	console.log("Normal Special")
  }

  else if (controller.jump.isDown && Fighter.jumps <= 5 && controller.jump.downDuration(80 + Fighter.attackSpeed) && !(Fighter.m < 120 && Fighter.m != 0) && Fighter.stunCounter == 0)
  {
      Fighter.character.body.velocity.y = -350 + Fighter.jumpSpeed;
      jumpSound.play();
      Fighter.jumps += 1;
      Fighter.shielding = false;
  }
  else if (controller.left.isDown && !(Fighter.m < 120 && Fighter.m != 0) && Fighter.stunCounter == 0)
  {

      if(Fighter.character.body.touching.down)
      {
        Fighter.jumps = 0;
    }

      if (Fighter.character.scale.x > 0 ){
      Fighter.character.scale.x *=-1;
      Fighter.weapon1.trackSprite(Fighter.character, 28, -40, true);
      }
      if (Fighter.character.body.touching.down)
      {
        Fighter.character.body.velocity.x = -250 + Fighter.hitVelocity;
      }
      else
      {
        Fighter.character.body.velocity.x = -200 + Fighter.hitVelocity;
      }
      //Determines the hitvelocity of the player based on inputs from keyboard to decrease the velocity
      if (Fighter.hitVelocity != 0)
      {
        if (Fighter.hitVelocity + -125 < 0){
          Fighter.hitVelocity = 0;
        }
        else
        {
          Fighter.hitVelocity += -125;
        }
      }
      Fighter.character.animations.play('right');
      Fighter.shielding = false;
  }
  else if (controller.right.isDown && !(Fighter.m < 120 && Fighter.m != 0) && Fighter.stunCounter == 0)
  {
      //  Move to the right
      if(Fighter.character.body.touching.down)
      {
        Fighter.jumps = 0;
    }
      //logic to change direction facing
      if (Fighter.character.scale.x < 0 ){
      Fighter.character.scale.x *=-1;
      Fighter.weapon1.trackSprite(Fighter.character, 28, 40, true);
      }
      if (Fighter.character.body.touching.down)
      {
        Fighter.character.body.velocity.x = 250 + Fighter.hitVelocity;
      }
      else
      {
        Fighter.character.body.velocity.x = 200 + Fighter.hitVelocity;
      }
      //Determines the hitvelocity of the player based on inputs from keyboard to decrease the velocity
      if (Fighter.hitVelocity != 0)
      {
        if (Fighter.hitVelocity + 125 > 0){
          Fighter.hitVelocity = 0;
        }
        else
        {
          Fighter.hitVelocity += 125;
        }
      }
      Fighter.character.animations.play('right');
      Fighter.shielding = false;
  }

  else
  {
      //Code that assigns the velocity of the player based on the current hitVelocity. Keeps track of jump count and determines the idle animation of the character
    if (Fighter.hitVelocity != 0)
    {
      Fighter.character.body.velocity.x = Fighter.hitVelocity;
    }
    else
    {
      Fighter.character.body.velocity.x = 0;
    }
      if (Fighter.stunCounter > 0)
      {
        Fighter.character.animations.play('ko');
      }
      else
      {
        //Fighter.character.animations.play('idle');
      }
      Fighter.shielding = false;

      if(Fighter.character.body.touching.down)
      {
        Fighter.jumps = 0;
    }
  }
  if(controller.punch.isUp && Fighter.hitSwitchPunch)
  {
    Fighter.hitCD = 15;
    Fighter.hitSwitchPunch = false;
  }
  if (controller.kick.isUp && Fighter.hitSwitchKick)
  {
    Fighter.hitCD = 15;
    Fighter.hitSwitchKick= false;
  }

}

//end of update input function
},


  item: function(type, startx, starty){
    this.type = game.add.sprite(startx, starty, type);

    game.physics.arcade.enable(this.type);

    this.type.body.bounce.y = 0;//0.2;
      this.type.body.gravity.y = 400;
      this.type.body.collideWorldBounds = false;
      return this;
  },

  respawn: function(Fighter){
      console.log("Beginning of respawn");
      game.time.events.add(Phaser.Timer.SECOND, this.playRespawnSound, this);

      //this.Fighter = Fighter;
      var test = Fighter.controlnum;
      console.log(Fighter);

      if(Fighter.controlnum == 1 ){
          console.log("controlnum = 1");
          //Fighter.character.body.position.x = 200;
          Fighter.character.x = 200;
          Fighter.character.y = 300;
          Fighter.respawnSwitch = true;
          Fighter.m = 0;
      }

      else if(Fighter.controlnum == 2 ){
          console.log("controlnum = 2");
          Fighter.character.x = 600;
          Fighter.character.y = 300;
          Fighter.respawnSwitch = true;
          Fighter.m = 0;
      }

      else if(Fighter.controlnum == -1 ){
          console.log("controlnum = -1");
          //Fighter.character.body.position.x = 200;
          Fighter.character.x = 200;
          Fighter.character.y = 300;
          Fighter.respawnSwitch = true;
          Fighter.m = 0;
      }

      Fighter.health = 0;
      Fighter.lives += -1;
      Fighter.character.body.velocity.x = 0;
      Fighter.character.body.velocity.y = 0;
  },

  respawnEvent: function(Fighter){
    //Respawn Switch is activated during the function
    if (Fighter.respawnSwitch == true){
    Fighter.m += 1;
    //Invisible moment
    if (Fighter.m < 60 && Fighter.m != 0){
      Fighter.character.body.gravity.y = 0;
      Fighter.character.visible = false;
    }
    //Book Crashing down Animation
    else if(Fighter.m >= 60 && Fighter.m < 120){
      Fighter.character.body.gravity.y = 800;
      Fighter.character.visible = true;
    }
    else{
      Fighter.character.body.gravity.y = 1000;
    }
    //Makes character alpha to signify invulnerability
    if (Fighter.m <= 300){
      if (Fighter.m % 20 <= 5){
        Fighter.character.alpha = 1;
      }
      else {
        Fighter.character.alpha = 0.5;
      }

    }
    else{
      Fighter.character.alpha = 1;
      Fighter.m = 0;
      Fighter.respawnSwitch = false;
    }
  }
  },


playerHitStun: function(Fighter)
{
	if (Fighter.health >= 0 || Fighter.health <= 75)
	{
		Fighter.stunCounter = 15;
	}
	else if (Fighter.health > 75 || Fighter.health <= 150)
	{
		Fighter.stunCounter = 45;
	}
	else if(Fighter.health > 150 || Fighter.health < 200)
	{
		Fighter.stunCounter = 90;
	}
	else
	{
		Fighter.stunCounter = 150;
	}
},

  KO:function(Fighter){
      if(Fighter.character.body.position.x < -50 || Fighter.character.body.position.x > 900){
         deathSound.play();
         var live = Fighter.stocks.getFirstAlive();
         if(live)
         {
           live.kill();
         }
         this.respawn(Fighter);

      }
      else if(Fighter.character.body.position.y > 700 || Fighter.character.body.position.y < -100){
         deathSound.play();
         var live = Fighter.stocks.getFirstAlive();
         if(live)
         {
           live.kill();
         }
         this.respawn(Fighter);
      }
  },

  render: function () {
          // If our timer is running, show the time in a nicely formatted way, else show 'Done!'
          if (timer.running) {
            //  game.debug.text(this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000)), game.world.width * .5, 15, "#ffffff");
          }
          else {
              game.debug.text("Done!", 2, 14, "#0f0");
          }
      },

 create: function() {

      //  We're going to be using physics, so enable the Arcade Physics system
      w= 800;
      h = 600;
      game.time.advandedTiming = true;

      //create a timer for the game
      timer = game.time.create(false);
      timerEvent = timer.add(Phaser.Timer.MINUTE * gameMinutes + Phaser.Timer.SECOND * gameSeconds, this.timeOutGame, this);
      timer.start();

      //Play music
      music = game.add.audio('allstar');
      music.loopFull();

      //Background for our game
      game.add.sprite(0, 0, 'sky');

      //  The platforms group contains the ground and the 2 ledges we can jump on
      platforms = game.add.group();

      //  Enable physics for any object that is created in this group
      platforms.enableBody = true;

      // Create the ground.
      var ground = platforms.create(110, game.world.height - 30, 'ground');

      //  Scale it to fit the width of the game (the original sprite is ? in size)
      ground.scale.setTo(18, 1);

      //  This stops it from falling away when you jump on it
      ground.body.immovable = true;




hitSound = game.add.audio('hitSound');
respawnSound = game.add.audio('respawnSound');
deathSound = game.add.audio('deathSound');
jumpSound = game.add.audio('jumpSound');


if(charName1 == 'dude')
{
  Player1 =  new dj(charName1,  0, 3, game.world.width*0.25,game.world.height*0.5,-1);
  console.log(Player1);
  console.log("Player 1 is dj");
}
else if(charName1 == 'chick')
{
  Player1 =  new lab(charName1,  0, 3, game.world.width*0.25,game.world.height*0.5,-1);
  console.log("Player 1 is lab");
}
else
{
  Player1 =  new lab(charName1,  0, 3, game.world.width*0.25,game.world.height*0.5,-1);
  console.log("Player 1 is lab");
}

if(charName2 == 'dude')
{
  Player2 =  new dj(charName2,  0, 3, game.world.width*0.75,game.world.height*0.5,2);
  console.log("Player 2 is dj");
}
else if(charName2 == 'chick')
{
  Player2 =  new lab(charName2,  0, 3, game.world.width*0.75,game.world.height*0.5,2);
  console.log("Player 2 is lab");
}
else
{
  Player2 =  new lab(charName2,  0, 3, game.world.width*0.75,game.world.height*0.5,2);
  console.log("Player 2 is lab");
}

//event listener for player1 touch controls
if(Player1.controlnum == -1){

  Player1.controller1.buttonleft.events.onInputOver.add(function(){Player1.controller1.leftpress = true;});
  Player1.controller1.buttonleft.events.onInputOut.add(function(){Player1.controller1.leftpress = false;});
  Player1.controller1.buttonleft.events.onInputDown.add(function(){Player1.controller1.leftpress = true;});
  Player1.controller1.buttonleft.events.onInputUp.add(function(){Player1.controller1.leftpress = false;});

  //Right button
  Player1.controller1.buttonright = game.add.button(105, 472, 'rightButton', null, this, 0, 1, 0, 1);
  Player1.controller1.buttonright.events.onInputOver.add(function(){Player1.controller1.rightpress = true;});
  Player1.controller1.buttonright.events.onInputOut.add(function(){Player1.controller1.rightpress = false;});
  Player1.controller1.buttonright.events.onInputDown.add(function(){Player1.controller1.rightpress = true;});
  Player1.controller1.buttonright.events.onInputUp.add(function(){Player1.controller1.rightpress = false;});

  //Up button
  Player1.controller1.buttonup = game.add.button(55, 412, 'upButton', null, this, 0, 1, 0, 1);
  Player1.controller1.buttonup.events.onInputOver.add(function(){Player1.controller1.uppress = true;});
  Player1.controller1.buttonup.events.onInputOut.add(function(){Player1.controller1.uppress = false;});
  Player1.controller1.buttonup.events.onInputDown.add(function(){Player1.controller1.uppress = true;});
  Player1.controller1.buttonup.events.onInputUp.add(function(){Player1.controller1.uppress = false;});

  //Down button
  Player1.controller1.buttondown = game.add.button(55, 535, 'downButton', null, this, 0, 1, 0, 1);
  Player1.controller1.buttondown.events.onInputOver.add(function(){Player1.controller1.downpress = true;});
  Player1.controller1.buttondown.events.onInputOut.add(function(){Player1.controller1.downpress = false;});
  Player1.controller1.buttondown.events.onInputDown.add(function(){Player1.controller1.downpress = true;});
  Player1.controller1.buttondown.events.onInputUp.add(function(){Player1.controller1.downpress = false;});


  //A button
  Player1.controller1.buttona = game.add.button(685, 425, 'aButton', null, this, 0, 1, 0, 1);
  Player1.controller1.buttona.events.onInputOver.add(function(){Player1.controller1.apress = true;});
  Player1.controller1.buttona.events.onInputOut.add(function(){Player1.controller1.apress = false;});
  Player1.controller1.buttona.events.onInputDown.add(function(){Player1.controller1.apress = true;});
  Player1.controller1.buttona.events.onInputUp.add(function(){Player1.controller1.apress = false;});

  //B button
  Player1.controller1.buttonb = game.add.button(735, 475, 'bButton', null, this, 0, 1, 0, 1);
  Player1.controller1.buttonb.events.onInputOver.add(function(){Player1.controller1.bpress = true;});
  Player1.controller1.buttonb.events.onInputOut.add(function(){Player1.controller1.bpress = false;});
  Player1.controller1.buttonb.events.onInputDown.add(function(){Player1.controller1.bpress = true;});
  Player1.controller1.buttonb.events.onInputUp.add(function(){Player1.controller1.bpress = false;});

  //X button
  Player1.controller1.buttonx = game.add.button(635, 475, 'xButton', null, this, 0, 1, 0, 1);
  Player1.controller1.buttonx.events.onInputOver.add(function(){Player1.controller1.xpress = true;});
  Player1.controller1.buttonx.events.onInputOut.add(function(){Player1.controller1.xpress = false;});
  Player1.controller1.buttonx.events.onInputDown.add(function(){Player1.controller1.xpress = true;});
  Player1.controller1.buttonx.events.onInputUp.add(function(){Player1.controller1.xpress = false;});

  //Y button
  Player1.controller1.buttony = game.add.button(685, 525, 'yButton', null, this, 0, 1, 0, 1);
  Player1.controller1.buttony.events.onInputOver.add(function(){Player1.controller1.ypress = true;});
  Player1.controller1.buttony.events.onInputOut.add(function(){Player1.controller1.ypress = false;});
  Player1.controller1.buttony.events.onInputDown.add(function(){Player1.controller1.ypress = true;});
  Player1.controller1.buttony.events.onInputUp.add(function(){Player1.controller1.ypress = false;});



  //end of event listeners
}


console.log(Player1.attackSpeed);
console.log(Player2.attackSpeed);


      bottle = this.item('bottle', 300, 200);

      mob = new crowd(0,0);

      healthtext1 = game.add.text(0,0, `DMG ${Player1.health}`,style);

      healthtext2 = game.add.text(650,0, `DMG ${Player2.health}`,style);

      livetext1 = game.add.text(0,30, `Lives ${Player1.lives}`,style);

      livetext2 = game.add.text(650,30, `Lives ${Player2.lives}`,style);



      //Pause
      pauseLabel = game.add.text(game.world.width * .5, game.world.height * .15, 'Pause', {font: '50px Arial',fill: '#ffffff'});
      pauseLabel.anchor.setTo(.5,.5);
      pauseLabel.inputEnabled = true;
      pauseLabel.events.onInputUp.add(function() {
        game.paused = true;
        //Pause menu
        pauseMenu = game.add.sprite(w/2, h-250, 'menuButton');
        pauseMenu.anchor.setTo(.5,.5);

        choiseLabel = game.add.text(w/2, h-150, 'Click outside menu to continue', { font: '30px Arial', fill: '#fff' });
        choiseLabel.anchor.setTo(0.5, 0.5);
      });
      game.input.onDown.add(unpause, self);
      function unpause(event)
      {
        //only act if isPaused
        if(game.paused)
        {
          //Calculate corners of menu
          var x1 = w/2 - 270/2;
          var x2 = w/2 + 270/2;
          var y1 = h/2 - 180/2;
          var y2 = h/2 + 180/2;

            // Check if the click was inside the menu
            if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 )
            {
            	// The choicemap is an array that will help us see which item was clicked
                var choisemap = ['one', 'two', 'three', 'four', 'five', 'six'];

                // Get menu local coordinates for the click
                var x = event.x - x1,
                    y = event.y - y1;

                // Calculate the choice
                var choise = Math.floor(x / 90) + 3*Math.floor(y / 90); //So it finds where in the "array" the click was using this algorithm
                // Display the choice
                choiseLabel.text = 'You chose menu item: ' + choisemap[choise] + '\n' + 'Click near the edge of the screen to unpause';
            }
            else {
              	// Remove the menu and the label
                pauseMenu.destroy();
                choiseLabel.destroy();

                // Unpause the game
                game.paused = false;
            }
        }
      };

timerText = game.add.text(game.world.width * .5, 40,`Time: ${timer.duration}`,{font: '40px Arial',fill: '#000000'});
timerText.anchor.setTo(.5,.5);

  },

  formatTime: function(s) {
        // Convert seconds (s) to a nicely formatted and padded time string
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);
    },
    playRespawnSound: function()
    {
      respawnSound.play();
    },

  timeOutGame: function()
  {
    timer.stop();
    game.state.start('win');
  },

  update: function() {
    //console.log('Inside update function');
    game.physics.arcade.overlap(Player1.character, this.win, this.Win, null, this);
    game.physics.arcade.overlap(Player2.character, this.win, this.Win, null, this);

    //  Collide the players with the platforms and eachother
    game.physics.arcade.collide(Player1.character, platforms );
    game.physics.arcade.collide(Player2.character, platforms );
    game.physics.arcade.collide(Player1.character,Player2.character);

    game.physics.arcade.overlap(Player1.weapon1.bullets, Player2.character, this.hitPlayer2);
	  game.physics.arcade.overlap(Player2.weapon1.bullets, Player1.character, this.hitPlayer1);
  	//overlap(object1, object2, overlapCallback, processCallback, callbackContext)
    //Enable items collisions
    game.physics.arcade.collide(bottle.type, platforms);
    game.physics.arcade.collide(Player1.character, bottle.type);
  	game.physics.arcade.collide(Player2.character, bottle.type);


    this.updateInput(controller1,Player1,cooldown1);
    this.updateInput(controller2,Player2,cooldown2);
    //console.log('input update succesful');
    //this.crowdupdate(mob);

    //uncomment for a AI track player test
    //this.AIdistcheck(Player1,Player2);


    healthtext1.text = `DMG ${Math.ceil(Player1.health)} %`;
    healthtext2.text = `DMG ${Math.ceil(Player2.health)} %`;

    livetext1.text = `Lives ${Player1.lives}`;
    livetext2.text = `Lives ${Player2.lives}`;


    //healthtext2 = game.add.text(690,0, `Lives ${Player2.health}`,style);
    this.KO(Player1);
    this.KO(Player2);

    this.respawnEvent(Player1);
    this.respawnEvent(Player2);
    //If out of lives, end the game
    if(Player1.lives == 0)
    {
      game.state.start('win');
    }
    if(Player2.lives == 0)
    {
      game.state.start('win');
    }

  timerText.text = this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000));

  },

//actually is the win function
  start: function(){
   game.state.start('win');

 },

//AI idea
  AIdistcheck: function(Fighter1,Fighter2){
  //Fighter.character.body.position.x < -50

  AIxdist = Fighter2.character.body.position.x -Fighter1.character.body.position.x;
  AIydist =  Fighter2.character.body.position.y -Fighter1.character.body.position.y;
  if(AIxdist > 50){
  	Fighter2.character.body.velocity.x = -150;
  	//controller2.right.isDown == true;
  	console.log("AI should be moving left");
  }
  else if(AIxdist < -50){
  	//controller2.left.isDown == true;
  	Fighter2.character.body.velocity.x = 150;
  	//controller2.right.isDown == true;
  	console.log("AI should be moving right");
  }

  if(AIydist > 100){
  	console.log("jump?");
  	Fighter2.character.body.velocity.y = -100;
  }
  //console.log(Fighter2.character.body.position.x -Fighter1.character.body.position.x);
  //Fighter1.body.;

 },


// function to control the moving mob hazard in marston stage
crowdupdate: function(){
	// modify x direction of mob
    if(mob.crowdsprite.body.position.x < 50){
     if(mob.crowdsprite.scale.x > 0 ){
        mob.crowdsprite.scale.x *=-1;
        mob.people.trackSprite(mob.crowdsprite, 10, -30, true);
        mob.people.bulletSpeed = 0;
        }
        mob.crowdsprite.body.velocity.x = 200;
    }
    else if(mob.crowdsprite.body.position.x > 600){
        if(mob.crowdsprite.scale.x < 0 ){
        mob.crowdsprite.scale.x *=-1;
        mob.people.trackSprite(mob.crowdsprite, 10, 30, true);
        mob.people.bulletSpeed =0;
        }
                mob.crowdsprite.body.velocity.x = -200;
    }

    // modify y direction of mob
    if(mob.crowdsprite.body.position.y < 100){
        mob.crowdsprite.body.velocity.y = 200;
    }
    else if(mob.crowdsprite.body.position.y > 500){
        mob.crowdsprite.body.velocity.y = -200;
    }
    mob.people.fire();
}

};
