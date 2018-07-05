// Enemies our player must avoid
class Enemy {
// Constuct enemies with a given x & y position, and speed
    constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
// The image/sprite for our enemies, this uses
// a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
// Collision Box
    this.width = 90;
    this.height = 70;
    }
// Update the enemy's position
    update(dt) {
// Multiply movement by the dt parameter which will ensure
// the game runs at the same speed for all computers.
    this.x += 100 * dt * this.speed;
// Collision Detection
        if (player.x < this.x + this.width &&
            player.x + player.width > this.x &&
            player.y < this.y + this.height &&
            player.height + player.y > this.y) {
// Restart game if collision is detected            
            player.restart();
        }
    }
// Draw the enemy on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// The player we will be controlling
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';
// Collision Box
        this.width = 55;
        this.height = 65;
    }
    update(dt) {
// Restart game when water or end of canvas are reached
        player.y < 0 ? this.restart() : null;
        player.y > 450 ? this.restart() : null;
        player.x < -80 ? this.restart() : null;
        player.x > 480 ? this.restart() : null;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
// Movespeed set to 15 in all directions
    handleInput(key) {
        if (key === 'up') {
            this.y -= 15;
        }
        if (key === 'down') {
            this.y += 15;
        }
        if (key === 'left') {
            this.x -= 15;
        }
        if (key === 'right') {
            this.x += 15;
        }
    }
    restart() {
// Moves the player back to original position
        this.x = 200;
        this.y = 400;
// Removes all enemies from game
        allEnemies.length = 0;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const randomSpeed = () => Math.floor(Math.random() * 7);

const allEnemies = [
    new Enemy(-100, 60, randomSpeed()),
    new Enemy(-100, 143, randomSpeed()),
    new Enemy(-100, 226, randomSpeed())
];

const player = new Player(200, 400);

// Generate random enemies at a set interval
// Enemies should have a random y position between 3 options, and a random speed
setInterval(function() {
    const rows = [60, 143, 226];
    const randomRow = () => rows[Math.floor(Math.random() * rows.length)];

    allEnemies.push(new Enemy(-100, randomRow(), randomSpeed()));
}, 600);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
// Prevent keyboard scroll when moving character
    if (typeof allowedKeys[e.keyCode] === "string") {
        e.preventDefault();
    }

    player.handleInput(allowedKeys[e.keyCode]);
});