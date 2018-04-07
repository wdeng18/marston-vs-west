class Link extends Phaser.Text {
    constructor(game, x, y, text, url, style) {
        super(game, x, y, text, style);
        this.url = url;
        this._oldFill = null;

        //add custom objects to the game
        this.game.add.existing(this);
        //Activate inpute events
        this.inputEnabled = true;
        //Change hover cursor
        this.input.useHandCursor = true;
        //Listen to the events
        this.events.onInputOver.add(this.onOver,this);
        this.events.onInputOut.add(this.onOut, this);
        this.events.onInputDown.add(this.onClick, this);
    }

    onOver() {
        this._oldFill = this.fill;
        this.fill = "blue";
    }

    onOut() {
        this.fill = this._oldFill;
    }

    onClick() {
        window.open(this.url, "_blank");
    }
}

var winState={
  create: function(){

    if(Player1.lives > Player2.lives)
    {
      var winLabel=game.add.text(80,80,'Player 1 won!',{font: '50px Arial',fill: '#ffffff'});
    }
    else if(Player1.lives = Player2.lives)
    {
      var winLabel=game.add.text(80,80,"It's a tie",{font: '50px Arial',fill: '#ffffff'});
    }
    else
    {
      var winLabel=game.add.text(80,80,'Player 2 won!',{font: '50px Arial',fill: '#ffffff'});
    }
    var statsLabel1 = game.add.text(80, 160, `Player 1 stats:` + '\n' + `Lives: ${Player1.lives}`); //Eventually integrate stats into player class, loop through and print out statistics for both players
    var statsLabel2 = game.add.text(game.world.width -240, 160, `Player 2 stats:` + '\n' + `Lives: ${Player2.lives}`);
    var startLabel=game.add.text(80,game.world.height-80,'Press "W" key to restart',{font: '25px Arial',fill:'#ffffff'});
    let someLink = new Link(this.game, 80,game.world.height-120, "Click here to send feedback! Thanks for playing!", "https://goo.gl/forms/wA6NGUAJ4OiKhVC93", {font: '25px Arial',fill:'#ffffff'});
    var wkey= game.input.keyboard.addKey(Phaser.Keyboard.W);
    wkey.onDown.addOnce(this.start,this);
    if(game.device.android || game.device.iOS)
    {
      menuButton = game.add.button(game.world.width *.5,game.world.height * - 100, 'menuButton');
      menuButton.onInputUp.add(this.start,this);
    }
  },
  start: function(){
    music.stop();
   game.state.start('menu');
  }
};
