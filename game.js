const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');
let snake = {
    x: 10, y: 10,
    vx: 0, vy: 0,
    tail: 5,
    trail: []
},
    apple = {
        x: 15, y: 15
    },
    map = {
        with: 40,
        height: 25
    };

context.scale(16, 16);
document.addEventListener('keydown', onkeydown);
setInterval(update, 1000 / 10);

function update() {
    snake.x += snake.vx;
    snake.y += snake.vy;
    if (snake.x < 0) snake.x = map.with - 1;
    if (snake.x > map.with - 1) snake.x = 0;
    if (snake.y < 0) snake.y = map.height - 1;
    if (snake.y > map.height - 1) snake.y = 0;

    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);


    context.fillStyle = "lime";
    for (let i = snake.trail.length; i--;) {
        let pos = snake.trail[i];
        context.fillRect(pos.x, pos.y, 1, 1)
        if (snake.x === pos.x && snake.y === pos.y) {
            snake.tail = 5;
        }
    }

    snake.trail.push({
        x: snake.x,
        y: snake.y
    });

    while (snake.trail.length > snake.tail) {
        snake.trail.shift();
    }

    if (snake.x === apple.x && snake.y === apple.y) {
        snake.tail++;
        apple.x = Math.floor(Math.random() * map.with);
        apple.y = Math.floor(Math.random() * map.height);
    }

    context.fillStyle = "red";
    context.fillRect(apple.x, apple.y, 1, 1);
}

function onkeydown(event) {
    switch (event.keyCode) {
        case 37: // left
            snake.vx = -1;
            snake.vy = 0;
            break;
        case 38: // up
            snake.vx = 0;
            snake.vy = -1;
            break;
        case 39: // right
            snake.vx = 1;
            snake.vy = 0;
            break;
        case 40: // down
            snake.vx = 0;
            snake.vy = 1;
            break;
        default:
    }
}