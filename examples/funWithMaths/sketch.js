
let rate = 0.1;
let xPos = 0;
let yPos = 0;
let radius = 50;
let grow = 0.5;
let size = 1;
let angle = 0;

let move;
let maxDist;

function setup() 
{
	createCanvas(600, 600);

	maxDist = dist(0, 0, width/2, height/2);
	stroke(255, 0, 0);
	noFill();
	circle(width/2, height/2, 100);
	circle(width/2, height/2, width/2);
	stroke(0);
}

function draw() 
{	
	background(64, 64, 64, 8);
	fill(255, 255, 255, 64);

	move = map(dist(width/2, height/2, mouseX, mouseY), 0, maxDist, 0, random(-50, 50));

	xPos = width/2 + radius * cos(angle) + move;
	yPos = height/2 + radius * sin(angle) + move;

	circle(xPos, yPos, size);

	angle += rate;
	radius += rate;
	size += rate;

	if(size <= 1)
	{
		size = 1;
	}

	if (radius >= width/4 || radius <= 0) 
	{
		rate = -rate;
		stroke(255, 0, 0);
		noFill();
		circle(width/2, height/2, 100);
		circle(width/2, height/2, width/2);
		stroke(0);
	}

}