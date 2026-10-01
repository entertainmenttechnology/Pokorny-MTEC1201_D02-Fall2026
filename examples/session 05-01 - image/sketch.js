/*
////////////////////////////////////////////
//		Demo: working with image assets.		//
////////////////////////////////////////////
 
 Note the use of async keyword before setup() to allow for asynchronous loading of assets.
 */

//Create a p5.Image object to store image
let tuna; //Declares p5.Image object called tuna

//add the keyword async before setup() to allow for asynchronous loading of assets
async function setup() 
{
	createCanvas(500, 500);
	background(200);
	imageMode(CENTER); //draws images from center point

	tuna = await loadImage("assets/tuna.png"); //Assign image asset to p5.Image object using loadImage()
    // await keyword is used to load the image asynchronously. 
    // use of await will pause the execution of setup() until the image is fully loaded.
}

//draw() runs continuously after setup() is complete
function draw() 
{
	background(200);

	//display image with image() 
	//image (name of image, x location, y location);
	image(tuna, width / 2, height / 2); // center tuna
	
	//add .width and .height to modify size of image 
	image(tuna, width / 5, height - height / 5, tuna.width / 2, tuna.height / 2); //left tuna
	image(tuna, width - width / 4, height - height / 3, tuna.width / 2, tuna.height / 2); //right tuna	
}