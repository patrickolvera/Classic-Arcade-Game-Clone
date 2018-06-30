// Enemies our player must avoid
class Enemy {
    // Constuct enemies with a given x & y position, and speed
    constructor(x = -100, y, speed = 5) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    }
    // Update the enemy's position
    update(dt) {
    // Multiply movement by the dt parameter which will ensure
    // the game runs at the same speed for all computers.
    this.x += 100 * dt * this.speed;
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
    }
    update(dt) {

    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput() {

    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const randomSpeed = () => Math.floor(Math.random() * 10);

const allEnemies = [new Enemy(-100, 60, randomSpeed()), new Enemy(-100, 143, randomSpeed()), new Enemy(-100, 226, randomSpeed())];
const player = new Player(200, 400);

// Generate random enemies at a set interval
// Enemies should have a random y position between 3 options, and a random speed
setInterval(function() {
    const rows = [60, 143, 226];
    const randomRow = () => rows[Math.floor(Math.random() * rows.length)];

    allEnemies.push(new Enemy(-100, randomRow(), randomSpeed()));
}, 500);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
