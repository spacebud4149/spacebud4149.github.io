// Set up the canvas element
const canvas = document.getElementById("pong-game");
const context = canvas.getContext("2d");

// Define the ball properties
let ballRadius = 10;
let ballColor = "#FFFFFF";
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let dx = 3;
let dy = -3;

// Define the paddle properties
let paddleHeight = 75;
let paddleWidth = 10;
let paddleColor = "#FFFFFF";
let paddleY = (canvas.height - paddleHeight) / 2;

// Define the key controls
let upPressed = false;
let downPressed = false;

// Add event listeners for the up and down arrow keys
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

// Functions for handling key events
function keyDownHandler(event) {
  if (event.key === "ArrowUp") {
    upPressed = true;
  } else if (event.key === "ArrowDown") {
    downPressed = true;
  }
}

function keyUpHandler(event) {
  if (event.key === "ArrowUp") {
    upPressed = false;
  } else if (event.key === "ArrowDown") {
    downPressed = false;
  }
}

// Draw the ball on the canvas
function drawBall() {
  context.beginPath();
  context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  context.fillStyle = ballColor;
  context.fill();
  context.closePath();
}

// Draw the paddle on the canvas
function drawPaddle() {
  context.beginPath();
  context.rect(canvas.width - paddleWidth, paddleY, paddleWidth, paddleHeight);
  context.fillStyle = paddleColor;
  context.fill();
  context.closePath();
}

// Move the ball and handle collisions with walls and the paddle
function moveBall() {
  // Check for collisions with walls
  if (ballY + dy < ballRadius || ballY + dy > canvas.height - ballRadius) {
    dy = -dy;
  }
  if (ballX + dx > canvas.width - ballRadius - paddleWidth && ballY > paddleY && ballY < paddleY + paddleHeight) {
    dx = -dx;
  } else if (ballX + dx < ballRadius) {
    // The player loses
    alert("Game over!");
    document.location.reload();
  }
  ballX += dx;
  ballY += dy;
}

// Move the paddle up or down based on key controls
function movePaddle() {
  if (upPressed && paddleY > 0) {
    paddleY -= 7;
  } else if (downPressed && paddleY < canvas.height - paddleHeight) {
    paddleY += 7;
  }
}

// Clear the canvas and redraw all elements
function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  moveBall();
  movePaddle();
}

// Set the game loop
setInterval(draw, 10);