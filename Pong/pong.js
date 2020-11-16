"use strict"; // for future-proof error-fixing

// define global variables here
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var width = canvas.width; // Setting the width to the canvas width
var height = canvas.height; // Setting the height to the canvas height
var player_1 = new Paddle(10, 170); // Declaring player 1 as a Paddle object and setting it's position
var player_2 = new Paddle(780, 170); // Declaring player 2 as a Paddle object and setting it's position
var blocker_Rtop = new blocker(402, 10); // Declaring the right side of the top blocker as a blocker object and setting it's position
var blocker_Ltop = new blocker(398, 10);  // Declaring the left side of the top blocker as a blocker object and setting it's position
var blocker_Rbottom = new blocker(402, 320);  // Declaring the right side of the bottom blocker as a blocker object and setting it's position
var blocker_Lbottom = new blocker(398, 320);  // Declaring the left side of the bottom blocker as a blocker object and setting it's position
var ball = new Ball(); // Declaring the ball as a ball object
var Top = new Boundaries(0, 1); // Declaring the top rectangle as a boundary object
var Bottom = new Boundaries(0, 395); // Declaring the bottom rectangle as a boundary object
var score = 0; // Declaring score as 0
var score2 = 0; // Declaring score2 as 0

// paddle constructor function
function Paddle(x_position, y_position, y_speed){
	this.width = 5; // width in pixels
	this.height = 50; // height in pixels
	this.x_position = x_position; // position in pixels
	this.y_position = y_position; // position in pixels
	this.y_speed = 20; // pixels per second
}

// method to draw paddle
Paddle.prototype.render = function(){
	context.fillRect(this.x_position, this.y_position, this.width, this.height); // draw paddle
};

Paddle.prototype.move_up = function(){
	this.y_position -= this.y_speed;
}

Paddle.prototype.move_down = function() {
	this.y_position += this.y_speed;
}

Paddle.prototype.collisionPlayer_1 = function() {
	if((ball.x_position > this.x_position && // Checking if the x position of the ball is greater than the x position of the paddle
	ball.x_position < this.x_position + this.width) && // Checking if the x position and width of the paddle is greater than the x position of the ball
	(ball.y_position > this.y_position &&// Checking of the y position of the ball is greater than the y position of the paddle
	ball.y_position < this.y_position + this.height)){ // Checking if the y position and height of the Paddle is greater than the x position of the ball
		ball.x_speed = (Math.random()  + 2) // Setting the x_speed to move in a random angle right along the x axis
	}
}


Paddle.prototype.collisionPlayer_2 = function() {
	if((ball.x_position > this.x_position && // Checking if the x position of the ball is greater than the x position of the paddle
	ball.x_position < this.x_position + this.width) && // Checking if the x position and width of the paddle is greater than the x position of the ball
	(ball.y_position > this.y_position && // Checking of the y position of the ball is greater than the y position of the paddle
	ball.y_position < this.y_position + this.height)){ // Checking if the y position and height of the Paddle is greater than the x position of the ball
		ball.x_speed = (Math.random() - 2) // Setting the x_speed to move in a random angle left along the x axis
	}
}


// ball constructor function
function Ball(){
	this.x_speed = 1.5; //pixels per second (change to desired speed)
	this.y_speed = 1.5; //pixels per second (change to desired speed)
	this.ball_radius = 5; // pixels
	this.x_position = width * 0.5; // position in pixels
	this.y_position = height * 0.5; // position in pixels
}

// method to draw ball
Ball.prototype.render = function(){
	context.beginPath(); // Start position for drawing the ball
	context.arc(this.x_position, this.y_position, this.ball_radius, 0, Math.PI * 2); // draw ball
	context.fill();
}

Ball.prototype.move = function(){
	this.y_position += this.y_speed; // Moving the y_position by the y_speed
	this.x_position += this.x_speed; // Moving the x_position by the x_speed
}

Ball.prototype.reset = function(){
    this.x_position = 400; // Setting the position of the ball to the centre of the canvas
	this.y_position = 200;
}

// TODO: Add data for top and bottom rectangles (i.e boundaries)

function Boundaries(x_position, y_position) {
    this.width = 800; // Width in pixels
	this.height = 5; // Height in pixels
	this.x_position = x_position; // Position in pixels
	this.y_position = y_position; // Position is pixels
}

Boundaries.prototype.render = function(){
    context.fillRect(this.x_position, this.y_position, this.width, this.height); // Draw boundary
}

Boundaries.prototype.collisionBottom = function(){
	if((ball.x_position > this.x_position &&
	ball.x_position < this.x_position + this.width) &&
	(ball.y_position > this.y_position &&
	ball.y_position < this.y_position + this.height)){
		ball.y_speed = (Math.random() - 2)
	}
}

Boundaries.prototype.collisionTop = function(){
	if((ball.x_position > this.x_position &&
	ball.x_position < this.x_position + this.width) &&
	(ball.y_position > this.y_position &&
	ball.y_position < this.y_position + this.height)){
		ball.y_speed = (Math.random() + 2)
	}
}

function blocker(x_position, y_position){
	this.width = 4; // width in pixels
	this.height = 70; // height in pixels
	this.x_position = x_position; // position in pixels
	this.y_position = y_position; // position in pixels
}
	
blocker.prototype.render = function(){
	context.fillRect(this.x_position, this.y_position, this.width, this.height); // Draw boundary
}


blocker.prototype.collisionRight = function() {
	if((ball.x_position > this.x_position &&
	ball.x_position < this.x_position + this.width) &&
	(ball.y_position > this.y_position &&
	ball.y_position < this.y_position + this.height)){
		ball.x_speed = (Math.random()  + 2)
	}
}

blocker.prototype.collisionLeft = function() {
	if((ball.x_position > this.x_position &&
	ball.x_position < this.x_position + this.width) &&
	(ball.y_position > this.y_position &&
	ball.y_position < this.y_position + this.height)){
		ball.x_speed = (Math.random()  - 2)
	}
}


function render(){
	context.fillStyle = 'tomato'; // set colour of components within the canvas
	context.clearRect(0, 0, width, height); // clear the canvas
	//context.fillRect(width/2, 0, 2, height);
	
	// draw the ball 
	ball.render(); // Calling for ball render function
	
	// draw player_1 paddle
	player_1.render(); // Calling for Paddle render function for player 1
	
	// TODO: draw the paddle (player_2 / cpu)
	player_2.render(); // Calling for Paddle render function for player 2
	
	// TODO: Make sure to render the top and bottom rectangle (i.e boundaries)
	Top.render(); // Calling for render function of top boundary 
	
	Bottom.render(); // Calling for render function of bottom boundary
	
	//Drawing scoreboard, 
	context.font = "20px sans-serif"; // Setting the font size and font type
	context.fillText(score, 150, 30); // Declaring the text as the score variable and setting it's position
	context.fillText(score2, 650, 30); // Declaring the text as the score2 variable and setting it's position
	
	//Drawing blocker
	blocker_Rtop.render(); // Calling for render function of right side of the top blocker
	blocker_Ltop.render(); // Calling for render function of left side of the top blocker
	
	blocker_Lbottom.render(); // Calling for render function of left side of the bottom blocker
	blocker_Rbottom.render(); // Calling for render function of right side of the bottom blocker
}

function update(t_elapsed){
	// TODO: Update ball position based on time elapsed
	ball.move(); 
	
	// TODO: Bounce the ball of top and bottom rectangles
	Top.collisionTop();// Calling for collision function for top boundary
	
	Bottom.collisionBottom(); // Calling for collision function for bottom boundary
	
  	// TODO: Record score and reset if ball goes passed the left or right paddle
	if(ball.x_position < 0) {
	ball.reset(); // Calling for the reset ball function
	score2++; // Add score2 by 1
	}
	
	if(ball.x_position > 800) {
	ball.reset(); // Calling for the reset ball function
	score++; // Add score by 1
	}
	
  	// TODO: Bounce the ball off the paddle
	player_1.collisionPlayer_1(); // Calling the Player 1 collision function
	
	player_2.collisionPlayer_2(); // Calling the player 2 collision function
	
	// Bouncing ball off both sides of the Paddle
	blocker_Ltop.collisionLeft(); // Calling for collision function on left side of top blocker
	blocker_Rtop.collisionRight(); // Calling for collision function on right side of top blocker
	
	blocker_Lbottom.collisionLeft(); // Calling for collision function on left side of bottom blocker
	blocker_Rbottom.collisionRight(); // Calling for collision function on right side of bottom blocker

}



// have keyboard inputs (controls for the paddle)
function keyboard_input(event){
	// TODO: Modify code so the paddle goes up and down but not outside the area of play.
     var key = event.keyCode;
	  switch(key)
	  {
		case 38: // Calling for the up arrow key
		player_2.move_up(); // calling the Paddle move up function for player 2
		break;
	  
		case 40: // Calling for the down arrow key
		player_2.move_down(); // Calling for the Paddle move down function for player 2
		break;

		case 87: // Calling for the W key
		player_1.move_up(); // Calling for the Paddle move up function for player 1
	    break;
	  
	
		case 83: // Calling for the S key
		player_1.move_down(); // Calling for the Paddle move down function for player 1
		break;
	  }
	  
	console.log(event.keyCode); // use this to view key codes
}

window.addEventListener("keydown", keyboard_input); // listen to keyboard button press


// main game loop
var previous; 
function main(timestamp){
	if (!previous) previous = timestamp; //start with no elapsed time
  	var t_elapsed = (timestamp - previous) / 1000;  //work out the elapsed time
  	update(t_elapsed); //update the game based on elapsed time
  	
	// TODO: render scene here (e.g draw ball, draw paddle, top and bottom rectangle detection), this function already exist;  	
  	render()
	
  	previous = timestamp;  //set the previous timestamp ready for next time
  	window.requestAnimationFrame(main); //ask browser to call this function again, when it's ready
}

main() // Calling for the main lopp function so that the code can use it
window.requestAnimationFrame(main) // Calling so the framerate can be updated to allow for movement
