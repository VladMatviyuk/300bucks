console.log('start');

var game = false;

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var leftX = canvas.width / 2 - 80;
var leftY = canvas.height - 330;

var rightX = canvas.width / 2 + 80;
var rightY = canvas.height - 330;

var speeFalldBalls = -1;
var endurance = 3;

var ballRadius = 90;

var rightPressed = false;
var leftPressed = false;

var time = 0;
var bucks = 0;
var showMessage = false;
var messages = [
	"Good boy!",
	"Pretty nice!",
	"Just do it!",
	"Sweet boy",
	"I like this!!!",
	"Don't stop!"
]
var randomMessage = 0;

if (!game) {
	startWindow();
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
	if (e.key == "Right" || e.key == "ArrowRight") {
		rightPressed = true;
	}
	else if (e.key == "Left" || e.key == "ArrowLeft") {
		leftPressed = true;
	}
	else if (e.key === ' ' || e.key === 'Spacebar') {
		if (!game) {
			game = true;
			setInterval(draw, 10);
			setInterval(levelUp, 30000);
			setInterval(timer, 1000)
			setInterval(payTime, 10000)
			setInterval(message, 8000)
			setInterval(hideMessage, 9000)
		}
	}
}

function keyUpHandler(e) {
	if (e.key == "Right" || e.key == "ArrowRight") {
		rightPressed = false;
	}
	else if (e.key == "Left" || e.key == "ArrowLeft") {
		leftPressed = false;
	}
}

function drawBalls(x, y) {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = "#E88F8F";
	ctx.fill();
	ctx.closePath();
}

function levelUp() {
	speeFalldBalls -= 1;
	endurance += 2;
}

function timer() {
	time += 1;
}

function payTime() {
	bucks += 20;
}

function message() {
	randomMessage = Math.floor((Math.random() * 5) + 0);
	showMessage = true;
}

function hideMessage() {
	showMessage = false;
}

function startWindow() {
	ctx.font = "32px Arial";
	ctx.fillStyle = "#CA98FF";
	ctx.fillText("ENTER Space TO START MAKING MONYE!", 20, canvas.height - 210);
}

function drawTime() {
	ctx.font = "26px Arial";
	ctx.fillStyle = "#b0dff9";
	ctx.fillText("Time: " + time, canvas.width - 150, 25);
}

function drawBucks() {
	ctx.font = "26px Arial";
	ctx.fillStyle = "#B3F9B0";
	ctx.fillText("$: " + bucks, 10, 25);
}

function endGame() {
	leftY = canvas.height - 280;
	rightY = canvas.height - 280;
	speeFalldBalls = -1;
	endurance = 3;
	time = 0;
	bucks = 0;
	game = false;
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawBalls(leftX, leftY);
	drawBalls(rightX, rightY);
	drawTime();
	drawBucks();

	if (showMessage == true) {
		ctx.font = "48px 'Lobster'";
		ctx.fillStyle = "#F6B0FF";
		ctx.fillText(messages[randomMessage], canvas.width / 2 - 100, canvas.height - 210);
	}

	if (leftY + speeFalldBalls > canvas.height - ballRadius || rightY + speeFalldBalls > canvas.height - ballRadius) {
		alert('Вы задохнулись яйцами работодателя :(');
		endGame();
	}

	if (leftY < 20 || rightY < 20) {
		alert('К сожалению, вы выплюнули яйца раньше времени :(');
		endGame();
	}

	if (bucks == 300) {
		alert('Поздравляем! Вы заработали 300$! И работодатель остался весьма довольным ;)');
		endGame();
	}

	if (rightPressed) {
		rightY -= endurance;

	}
	else if (leftPressed) {
		leftY -= endurance;
	}

	rightY -= speeFalldBalls;
	leftY -= speeFalldBalls;

}



