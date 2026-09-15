/*
<><><><><><><><><><><><><><><><><><><><><>
	SIMPLE DISTANCE ANIMATION
    - circle in foreground moves to background
    - color of circle darkens as it moves to the background

    Press Any Key to Reset
	Press Mouse to change background color
<><><><><><><><><><><><><><><><><><><><><>
*/

//DECLARING GLOBAL CONSTANTS:
const centerPosX = 500;

//DECLARING GLOBAL VARIABLES:
let circleSize = 600;
let circleColor = 255;
let circlePosY = 600;
let bgColor = 64;

function setup() 
{
    createCanvas(1000, 600);  //create 800 pixel wide by 600 high canvas

    noStroke(); //remove the stroke outline around shapes
}

function draw() 
{
    //set the background color to current value of bgColor
    background(bgColor);    

    //set the fill color to current value of circleColor
    fill(circleColor);  

    //draw circle with position of centerPosX, circlePosY, and diameter of circleSize
    ellipse(centerPosX, circlePosY, circleSize, circleSize); 

    circleSize -= 1;    //decrease the circle size by 1 for each frame of draw() loop
    circleColor -= 0.33; //decrease the circle color by 0.33 for each frame of draw() loop
    circlePosY -= 1; //decrease the circle's Y position by 1 for each frame of draw() loop

    /*
    - use the print() or console.log() functions to output information to the console: print(message);
    - messages in quotes will be printed to the console as a literal string.
    - put a variable in the print() function, and the current value of variables will be printed to the console.
    - by using a + in the print() function, you can concatenate strings and variables to print combined messages to the console.
    UNCOMMENT THE FOLLOWING LINES TO PRINT VALUES TO THE CONSOLE:
    */
    // print("Size: " + circleSize);
    // print("Color: " + circleColor);
    // print("Position Y: " + circlePosY);
}

function keyPressed()
{
    // Reset circle variables and background color to their initial values
    circleSize = 600;
    circleColor = 255;
    circlePosY = 600;
    bgColor = 64;
}

function mousePressed()
{
    //increase the background color by 16 each time the mouse is pressed
    bgColor += 16; 

    //print the current background color to the console
    print("Background Color: " + bgColor);
}
