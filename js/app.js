//throw new Error("Something wrong!")

//Class for all Game Status Updates Packed with many functions
let Status = {
    score: 0,
    level: 1,
    hit: new Audio("sounds/Smack.mp3"),
    win: new Audio("sounds/Ta-Da.mp3"),
    loader: document.querySelector(".loader"),
    lives: document.querySelector(".lives"),
    levelNode: document.querySelector(".level"),
    scoreNode: document.querySelector(".score"),
    card: document.querySelector(".card"),
    genValue: "",
    xo: 400,
    yo: 230,
    sprtier: ["images/Gem Blue.png", "images/Rock.png", 'images/Gem Green.png', 'images/Gem Orange.png', 'images/Key.png'],
    xpos: [0, 100, 200, 300, 400],
    ypos: [30, 130, 230],
    x: rand(5, 0),
    y: rand(3, 0),
    sprite: rand(5, 0),
    maxScoreAray: [0, 1000, 1500, 2000, 2500, 3000],

    //Gem Render fucntion
    render: function () {
        ctx.drawImage(Resources.get(this.sprtier[this.sprite]), this.xpos[this.x], this.ypos[this.y]);
    },

    //Update Gem upon collection
    update: function () {
        let less = (player.y === this.ypos[this.y] + 20);
        let equal = (player.y === this.ypos[this.y] + 70);
        let greater = (player.y == this.ypos[this.y] - 30);
        let xGem = this.xpos[this.x];
        let xPlayer = player.x;

        //Plaer Gem collision Detection
        if ((xPlayer == xGem && (greater || equal)) || (xPlayer + 50 == xGem && (less || greater || equal)) || (xPlayer - 50 == xGem && (less || greater || equal))) {
            //console.log('fgfgnfhng');
            this.scoreUpdate(this.sprtier[this.sprite]);
            this.sprite = rand(5, 0);
            this.x = rand(5, 0);
            this.y = rand(3, 0);
        }
    },

    //empty preloader While beginning
    preloader: function () {

    },

    //Score Updater function
    scoreUpdate: function (item) {
        let maxScore = this.maxScoreAray[this.level];
        switch (item) {
            case 'images/Gem Orange.png':
                this.score += 50;
                break;
            case 'images/Gem Blue.png':
                this.score += 100;
                break;
            case 'images/Gem Green.png':
                this.score += 200;
                break;
            case 'images/Key.png':
                this.score += 300;
                break;
            case 'river':
                this.score += 500;
                console.log("river")
                break;
        }

        //Condition for increasing Level
        if (this.score >= maxScore) {
            console.log(`${this.score},${this.level} level update score`);
            this.level += 1;
            player.charUpdater();
            maxScore = this.maxScoreAray[this.level];
            this.score = 0;

        }

        //Score and Level Update on Html Section
        this.levelNode.innerText = "Level: " + this.level.toString();
        //console.log(this.scoreNode);
        this.scoreNode.innerText = "Score: " + this.score.toString();
        console.log(`${this.score},${this.level} score update score`)
    },

    //Level Increase function
    levelUp: function () {
        allEnemies.push(new Enemy(0, 160));
    },

    //Gender store fucntion
    gender: function (genValue = "") {
        this.genValue = genValue;
        console.log(this.genValue);
        this.loader.style.cssText = "display:none;"
        this.lives.style.cssText = "display:block;"
    },

    //Update lives upon collison with Bugs
    livesUpdate: function (lives) {
        this.lives.innerHTML = "";
        console.log("lives updater", this.lives.innerHTML)
        for (let count = 0; count < lives; count++) {
            let img = document.createElement("IMG");
            img.src = "images/Heart.png";
            this.lives.appendChild(img);
        }
    },

    //Winner Card Display Function
    winner: function () {
        this.card.innerHTML = "";
        let p = document.createElement("P");
        let img = document.createElement("IMG");
        if (this.genValue == "male") {
            p.innerText = " 🤴 Here is The Princess 🤩";
            img.src = "images/char-princess-girl.png";
            this.card.appendChild(p);
            this.card.appendChild(img);
            this.loader.style.cssText = "display:block";
            this.lives.style.cssText = "display:none;"
        } else if (this.genValue === "female") {
            p.innerText = "✌️ You are The True Princess 👸";
            img.src = "images/char-princess-girl.png";
            this.card.appendChild(p);
            this.card.appendChild(img);
            this.loader.style.cssText = "display:block";
            this.lives.style.cssText = "display:none;"
        } else {
            p.innerText = " 🏳️‍🌈 Wohoo...! More Power to You ✌️";
            img.src = "images/lgbt.png";
            this.card.appendChild(p);
            this.card.appendChild(img);
            this.loader.style.cssText = "display:block";
            this.lives.style.cssText = "display:none;"
        }
        this.reloader();
    },

    //Looser Function
    looser: function () {
        this.card.innerHTML = "";
        let p = document.createElement("P");
        let img = document.createElement("IMG");
        p.innerText = "🐞🐞 Bugs Won the Game 🐞🐞";
        img.src = "images/enemy-bug.png";
        this.card.appendChild(p);
        this.card.appendChild(img);
        this.loader.style.cssText = "display:block";
        this.lives.style.cssText = "display:none;"
        this.reloader();
    },

    //Reloadet upon loose and Win
    reloader: function () {
        document.body.addEventListener("click", function () {
            window.location.reload();
        })
    }

}

//Enemy Class
var Enemy = function (x, y) {
    this.x = x;
    this.y = y;
    //this.speed=speed;
    this.sprite = 'images/enemy-bug.png';
};

//Random number generator function between two values
function rand(h = 200, l = 100) {
    return Math.floor(Math.random() * (h - l) + l);
}

//Enemy Update function
Enemy.prototype.update = function (dt) {
    //console.log(`speed ${this.speed}`)
    this.speed = rand(400, 100)
    this.x += this.speed * dt;
    //setTimeout(Status.update,5000);
    if (this.x >= 505) {
        let k = rand(200, 50);
        //console.log(`pos${k}`);
        this.x = -k;
    }

    //Collison
    if (this.x < player.x + 50 && this.x + 50 > player.x && this.y < player.y + 50 && this.y + 50 > player.y) {
        score = 0;
        Status.lives.removeChild(Status.lives.lastChild)
        Status.hit.play();
        //console.log(Status.lives.childNodes.length, Status.lives.childNodes[0])
        //Status.lives.remove(1);
        player.x = 200;
        player.y = 300;
        //Reduce the lives
        if (Status.lives.childNodes.length == 0) {
            Status.level = 1;
            Status.score = 0;
            Status.levelNode.innerText = "Level: " + Status.level.toString();
            //console.log(this.scoreNode);
            Status.scoreNode.innerText = "Score: " + Status.score.toString();
            console.log("Game Over");
            Status.looser();
        }
    }

    //To check Collison between Bug and Rock.
    if (Status.sprtier[Status.sprite] === 'images/Rock.png' && Status.xpos[Status.x] + 50 < this.x && Status.xpos[Status.x] < this.x + 50 && Status.ypos[Status.y] == this.y) {
        this.x = -rand(600, 0);
        Status.sprite = rand(5, 0);
        Status.x = rand(5, 0);
        Status.y = rand(3, 0);
        //console.log("hitted the rock")
    }
};

//Enemy render fucntion
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player Class Intilization
var Player = function ({
    x = 200,
    y = 300,
    sprite = "images/char-cat-girl.png"
}) {
    this.x = x;
    this.y = y;
    //this.speed=speed;
    this.sprite = sprite;
    this.update = function () {

        if (this.x < 0) this.x = 0;
        else if (this.x > 400) this.x = 400;
        else if (this.y > 380) this.y = 400;
        else if (this.y < 30) {
            //River Touch
            Status.win.play();
            Status.scoreUpdate('river');
            //console.log(this.y)
            this.x = 200;
            this.y = 300;
            console.log(`${Status.score}, ${Status.level} current score`);

        }

    };

    //Player Charcter Update fucntion upon Level Up
    this.charUpdater = function () {

        if (Status.level == 2) {

            Status.livesUpdate(5);
            allEnemies.push(new Enemy(-400, 30));
            console.log("level two");
            this.x = 200;
            this.y = 300;
            this.sprite = "images/char-pink-girl.png";
        } else if (Status.level == 3) {

            Status.livesUpdate(7);
            allEnemies.push(new Enemy(-500, 230));
            console.log("level hree");
            this.x = 200;
            this.y = 300;
            this.sprite = "images/char-horn-girl.png";
        } else if (Status.level == 4) {

            allEnemies.push(new Enemy(-500, 130));
            allEnemies.push(new Enemy(-700, 30))
            Status.livesUpdate(9);
            console.log("level four");
            this.x = 200;
            this.y = 300;
            this.sprite = "images/char-princess-girl.png";
        } else if (Status.level == 5) {
            Status.winner();
            console.log("winner");
        }
    };

    //Player render function
    this.render = function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
    this.handleInput = function (key) {
        //console.log(key);

        switch (key) {
            case 'up':

                this.y -= 50;
                //console.log(this.y);
                //console.log(this.x);
                break;
            case 'down':

                //console.log(this.y)
                this.y += 50;
                break;
            case 'left':

                //console.log(this.x)
                this.x -= 50;
                break;
            case 'right':

                //console.log(this.x)
                this.x += 50;
                break;
        }
    }
}
let allEnemies = [new Enemy(0, 30), new Enemy(0, 130), new Enemy(0, 230)];
var player = new Player({});

//new Enemy(0, 50), new Enemy(0,160),
//let allEnemies = [ new Enemy(0,230)];

//let allEnemies = [new Enemy(0, 50), new Enemy(0, 160), new Enemy(0, 230), new Enemy(-100, 50), new Enemy(-300, 50), new Enemy(-400, 120)];


// This listens for key presses and sends the keys to your
document.addEventListener('keyup', function (e) {
    //console.log(`key oced ${e.keyCode}`)
    var allowedKeys = {
        38: 'up',
        87: 'up',
        104: 'up',

        40: 'down',
        83: 'down',
        98: 'down',

        37: 'left',
        65: 'left',
        100: 'left',

        39: 'right',
        68: 'right',
        102: 'right'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
