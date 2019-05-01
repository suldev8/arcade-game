
'use strict';


class Enemy {
    constructor() {
        this.sprite = 'images/enemy-bug.png';
        this.width = 83;
        this.height = 83;
        this.x = -this.width;
        this.y = (Math.floor(Math.random() * 3) + 1) * 83 - 25;
        this.speed = Math.random() * 140 + 50;


    }

    // updates the position of the enemy object to move it until reaches the most right of the canvas
    // then starts again from the left with a random y position in the rock blocks
    update(dt) {
        const canvas = document.querySelector('canvas');
        //console.log(canvas)
        if (this.x > canvas.width) {
            this.x = -this.width;
            this.y = (Math.floor(Math.random() * 3) + 1) * 83 - 25;
        }

        else
            this.x += dt * this.speed;
    }

    // draw the enemy object on the canvas
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Player {

    constructor() {
        this.sprite = 'images/char-boy.png'
        this.width = 83;
        this.height = 83;
        this.xBlock = 2;
        this.yBlock = 5
        this.x = 101 * this.xBlock;
        this.y = this.yBlock * this.height - 25;
        this.wins = 0;
    }
    
    // update the player position depending on xBlock and yBlock values
    update() {
        this.x = 101 * this.xBlock;
        this.y = this.yBlock * 83 - 25
    }

    // handle the user input to move the Player object and make sure doesn't move off screen
    handleInput(PressedKey) {
        switch (PressedKey) {
            case 'left':
                this.xBlock = this.xBlock !== 0 ? this.xBlock - 1 : 0;
                break;
            case 'up':
                this.yBlock = this.yBlock !== 0 ? this.yBlock - 1 : 0;
                if (this.yBlock === 0)
                    this.win();
                break;
            case 'right':
                this.xBlock = this.xBlock !== 4 ? this.xBlock + 1 : 4;
                break;
            case 'down':
                this.yBlock = this.yBlock !== 5 ? this.yBlock + 1 : 5;
                break;
        }
    }

    // draw the player object and write text for wins counter
    render() {
        ctx.font = '25px Arial'
        ctx.strokeText(`wins: ${this.wins}`, 15, 30)
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // reset the position of the Player object
    reset() {
        this.xBlock = 2;
        this.yBlock = 5
        this.x = 101 * this.xBlock;
        this.y = this.yBlock * 83 - 25;
    }

    // add one to the win property and call reset
    win() {
        this.wins++;
        this.reset();
    }

}


// instantiate objects.
const allEnemies = [
    new Enemy(),
    new Enemy(),
    new Enemy(),
    new Enemy(),
];

const player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
