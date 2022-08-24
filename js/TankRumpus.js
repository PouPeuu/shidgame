function startGame(){
    document.body.style.overflow = "hidden";
    gameArea.start();
}
const gameArea = {
    canvas : document.createElement("canvas"),
    playSound : function(src){
        this.sound = document.createElement("audio"),
        this.sound.src = "sound\\"+src;
        this.sound.play();
    },
    start : function(){
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.width = "100%";
        this.canvas.style.height = "100%";
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas,document.body.childNodes[0]);
        this.frameNo = 0;
        this.context.fillRect(10,10,50,50);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

const gravity = -0.05;
const drag = 0.85;
const keys = {Right:0,Left:0,Up:0,Down:0}

var x = 0;
var y = 0;
var velX = 0;
var velY = 0;
var velG = 0;

var speed = 1;

var lock = false;
document.addEventListener('keydown', (Event) => {
    let key = Event.code
    console.info(`${key}`)
    switch(key){
        case "KeyD":
            keys.Right = 1;
            break;
        case "KeyA":
            keys.Left = 1;
            break;
        case "KeyW":
            keys.Up = 1;
            break;
        case "KeyS":
            keys.Down = 1;
            break;
        case "ShiftLeft":
            if(!lock){
                gameArea.playSound("very nasty fard.mp3");
                lock = true;
            }
            speed = 10;
            break;
    }
}, false)

document.addEventListener('keyup', (Event) => {
    let key = Event.code
    switch(key){
        case "KeyD":
            keys.Right = 0;
            break;
        case "KeyA":
            keys.Left = 0;
            break;
        case "KeyW":
            keys.Up = 0;
            break;
        case "KeyS":
            keys.Down = 0;
            break;
        case "ShiftLeft":
            lock = false;
            speed = 1;
            break;
    }
}, false)
function updateGameArea(){
    var ctx = gameArea.context;
    gameArea.canvas.width = window.innerWidth;
    gameArea.canvas.height = window.innerHeight;
    gameArea.clear();
    gameArea.frameNo += 1;
    velX += keys.Right * speed;
    velX -= keys.Left * speed;
    velY += keys.Down * speed;
    velY -= keys.Up * speed;

    velX *= drag;
    velY *= drag;

    x += velX;
    y += velY;
    ctx.font = "45px Consolas";
    ctx.fillText("X: " + Math.round(x) + " Y:" + Math.round(y),10,45);
    ctx.fillRect(x,y,50,50);
}