// Enemies our player must avoid

var Enemy = function(x ,y ,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    if (this.x > 600) {
        this.x = 0;
    }
    return this.x;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//create plaer function
var Player = function (x, y){
    this.sprite = 'images/char-princess-girl.png';
    this.x = x;
    this.y = y;
};

// to update the game when function trigger
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.checkCollision();
    this.levelUp()
    
};
// to render the player 
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    switch (direction) {
        case "left":
            this.x -= 100;
            break;
        case "right":
            this.x += 100;
            break;
        case "up":
            this.y -= 85;
            break;
        case "down":
            this.y += 85;
            break;
    }
};
// to keep the player inside the canvas
Player.prototype.setBoundries = function(){
    // check X axis//
    if (this.x<0 || this.x>600){
        if(this.x<0){
            this.x = 0;
        }else{
            this.x = 600;
        }
    }
    //check Y axis//
    if (this.y<0 || this.y>520){
        if(this.y<0){
            this.y = 0;
        }else{
            this.y = 480;
        }
    }
};
// to reset the player to the first position
Player.prototype.reset = function(){
this.x = 300;
this.y = 480;
};
// check collision
Player.prototype.checkCollision = function(){
    for (var i = 0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + 75 &&
            this.x + 65 > allEnemies[i].x &&
            this.y < allEnemies[i].y + 50 &&
            70 + this.y > allEnemies[i].y) {
            this.reset();
          }
    }
};
// reset the plaer after reaching the river and level up
Player.prototype.levelUp = function(){
    if (this.y === 0){
        this.reset();
    }
};
// initiating the enemies 
var allEnemies = [];
var enemy1 = new Enemy(0, 60, 300);
var enemy2 = new Enemy(0, 144, 245);
var enemy3 = new Enemy(0, 227, 190);
var enemy4 = new Enemy(0, 310, 210);
allEnemies.push(enemy1, enemy2, enemy3, enemy4);

// initiatingthe Player
var player = new Player(300, 480);


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    player.setBoundries();
});
