/*
////////////////////////////////////////////////////////////////////
// Demo: working with image assets. This one adds text animation. //
////////////////////////////////////////////////////////////////////
 
 Note the use of async keyword before setup() to allow for asynchronous loading of assets.
 */

//Create a p5.Image object to store image
let tuna; //Declares p5.Image object called tuna

//Creates variables for text animation
let opacity = 0;
let fade = 1;

//add the keyword async before setup() to allow for asynchronous loading of assets
async function setup() 
{
	createCanvas(500, 500);
	background(200);
	imageMode(CENTER); //draws images from center point
	textAlign(CENTER); //draws text from centerpoint
	textSize(88); //sets size of text

    tuna = await loadImage("assets/tuna.png"); //Assign image asset to p5.Image object using loadImage()
    // await keyword is used to load the image asynchronously, it will pause setup() until the image is fully loaded.
}

//draw() runs continuously after preload() and setup() are complete
function draw() 
{
	background(200);

	//text display and animation
	fill(opacity);
	text("FISH!", width / 2, height / 4); //displays text
	opacity = opacity + fade;
	
	if (opacity > 255 || opacity < 0) 
	{
		fade = -fade;
	}

	//display image with image() 
	//image (name of image, x location, y location);
	image(tuna, width / 2, height / 2); // center fish

	//add .width and .height to modify size of image 
	image(tuna, width / 5, height - height / 5, tuna.width / 2, tuna.height / 2); //left fish
	image(tuna, width - width / 4, height - height / 3, tuna.width / 2, tuna.height / 2); //right fish
}