
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const SCREEN_WIDTH = canvas.width;
const SCREEN_HEIGHT = canvas.height;
const BLOCK_SIZE = 20;
let SPEED = 10;
const BLACK = "rgb(0, 0, 0)";
const WHITE = "rgb(255, 255, 255)";
const RED = "rgb(255, 0, 0)";

class Snake {
    constructor() {
        this.body = [
            { x: 10, y: 10 },
            { x: 10, y: 11 },
        ];
        this.direction = "RIGHT";
        this.grow = false;
    }
move() {
    let head = { ...this.body[0] };
        if (this.direction == "UP") {
            head.y -= 1;
        } else if (this.direction == "DOWN") {
            head.y += 1;
        } else if (this.direction == "LEFT") {
            head.x -= 1;
        } else if (this.direction == "RIGHT") {
            head.x += 1;
        }
        this.body.unshift(head);
            if (!this.grow) {
                this.body.pop();
            }
            this.grow = false;
            }
changeDirection(direction) {
    if (
        (direction == "UP" && this.direction != "DOWN") ||
        (direction == "DOWN" && this.direction != "UP") ||
        (direction == "LEFT" && this.direction != "RIGHT") ||
        (direction == "RIGHT" && this.direction != "LEFT")
        ) {
            this.direction = direction;
            }
    }

growSnake() {
    this.grow = true;
    }    
draw() {
    ctx.fillStyle = BLACK;
    for (let i = 0; i < this.body.length; i++) {
        ctx.fillRect(
            this.body[i].x * BLOCK_SIZE,
            this.body[i].y * BLOCK_SIZE,
            BLOCK_SIZE,
            BLOCK_SIZE
            );
        }
    } }       

class Food {            
    constructor() {
        this.x = Math.floor(Math.random() * SCREEN_WIDTH / BLOCK_SIZE);
        this.y = Math.floor(Math.random() * SCREEN_HEIGHT / BLOCK_SIZE);
        }

draw() {
    ctx.fillStyle = RED;
    ctx.fillRect(
        this.x * BLOCK_SIZE,
        this.y * BLOCK_SIZE,
        BLOCK_SIZE,
        BLOCK_SIZE
    );
        }
detectCollision(snake) {
    if (
        snake.body[0].x == this.x &&
        snake.body[0].y == this.y
        ) {
        this.x = Math.floor(Math.random() * SCREEN_WIDTH / BLOCK_SIZE);
        this.y = Math.floor(Math.random() * SCREEN_HEIGHT / BLOCK_SIZE);
        snake.growSnake();
            return true;
        }
            return false;
        }
    }
    startGame=() =>{

        const snake = new Snake();
        const food = new Food();
        let score = 0;
        let gameLoop;
            
    game=()=> {
        let snake = new Snake();
        let food = new Food();
        let score = 0;
        let game_over = false;
        let gameInterval = setInterval(() => {
  // كشف التصادم بين الثعبان والطعام
    if (food.detectCollision(snake)) {
        score += 10;

        }

  // كشف التصادم بين الثعبان والجدران
    if (
        snake.body[0].x < 0 ||
        snake.body[0].x >= SCREEN_WIDTH / BLOCK_SIZE ||
        snake.body[0].y < 0 ||
        snake.body[0].y >= SCREEN_HEIGHT / BLOCK_SIZE
        ) {
            game_over = true;
            }
  // كشف التصادم بين الثعبان وجسمه
    for (let i = 1; i < snake.body.length; i++) {
        if (
            snake.body[0].x == snake.body[i].x &&
            snake.body[0].y == snake.body[i].y
            ) {
            game_over = true;
            }
        }

        if (game_over) {
            clearInterval(gameInterval);
            ctx.fillStyle = "black";
            ctx.font = "48px sans-serif";
            ctx.fillText("GAME OVER", canvas.width/2 - 120, canvas.height/2);
            return;
        }
      // تحديث حركة الثعبان ورسم اللعبة
    snake.move();
        ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        snake.draw();
        food.draw();
  // رسم النقاط
        ctx.fillStyle = BLACK;
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + score, 10, 30);
    }, 1000 / SPEED);

    // التحكم بحركة الثعبان باستخدام لوحة المفاتيح
    document.addEventListener("keydown", (event) => {
        if (event.keyCode == 38) {
            snake.changeDirection("UP");
        } else if (event.keyCode == 40) {
            snake.changeDirection("DOWN");
        } else if (event.keyCode == 37) {
            snake.changeDirection("LEFT");
        } else if (event.keyCode == 39) {
            snake.changeDirection("RIGHT");
        }
    });
    }
    setTimeout(function() {

    game();
  // يتم تشغيل اللعبة بعد انتهاء الوقت المحدد
}, 1000);
};
