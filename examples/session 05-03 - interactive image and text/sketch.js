/*
////////////////////////////////////////////////////
 Demo 1: working with image assets. 
 Demo 2: adds text animation.
 Demo 3: adds mouse response and second image asset. 
 
 Press and hold mouse.
 ///////////////////////////////////////////////////
 
 Note the use of async keyword before setup() to allow for asynchronous loading of assets.
 */

//Create a p5.Image object to store image
let tuna; //Declares p5.Image object called tuna
let shark; //Declares p5.Image object called shark

//Creates variables for text animation
let opacity = 0;
let fade = 1;

//Creates variable for fish animation
let fall = 0;

//add the keyword async before setup() to allow for asynchronous loading of assets
async function setup() 
{
	createCanvas(500, 500);
	background(200);
	imageMode(CENTER); //draws images from center point
	textAlign(CENTER); //draws text from centerpoint
	textSize(88); //sets size of text

    //Assign image asset to p5.Image object using loadImage()
    tuna = await loadImage("assets/tuna.png");
    shark = await loadImage("assets/shark.png");
    // await keyword is used to load the image asynchronously, it will pause setup() until the image is fully loaded.
}

function draw() 
{
	background(200);

	//text display and animation
	fill(opacity);
	text("FISH!", width / 2, height / 2 - 50); //displays text
	opacity = opacity + fade;
	
	if (opacity > 255 || opacity < 0) 
	{
		fade = -fade;
	}

	if (mouseIsPressed) 
	{
		background(255);
		text("YUM!", width / 2, height / 2 - 70); //displays text
		image(shark, width / 2, height / 2, shark.width/2, shark.height/2);
		image(tuna, width / 2, fall, tuna.width/2, tuna.height/2);
		
		if (fall < height / 2) 
		{
			fall++;
		}
	} 
	else 
	{
		fall = 0;
	}
}