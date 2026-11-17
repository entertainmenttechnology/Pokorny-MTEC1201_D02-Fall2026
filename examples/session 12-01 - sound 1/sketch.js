/*
Example of loading, triggering, and looping sound files
<><><><><><><><>
CONTROLS:
CLICK ON TOP HALF OF CANVAS - MUTE BASS
CLICK ON BOTTOM HALF OF CANVAS - MUTE DRUM
PRESS ANY KEY - PLAY STRING

See reference for p5.SoundFile methods and examples: https://p5js.org/reference/p5.sound/ 
*/

//declare object variables for storing my audio files
let drumLoop;
let bass;
let string;

//booleans for muting volume of audio files
let drumMute = false;
let bassMute = false;
//boolean to know if string is playing
let stringPlaying = false;

async function setup() 
{
    createCanvas(800, 600);
    strokeWeight(3);

    // load sounds into objects, see:
    //https://p5js.org/reference/p5/loadSound/
    drumLoop = await loadSound('assets/drumLoop.mp3');
	bass = await loadSound('assets/bass.mp3');
	string = await loadSound('assets/string.mp3');

	// attach callback function than runs when sound reaches end
    string.onended(stringStop);

    // begin LOOPED playback, see:
	//https://p5js.org/reference/p5.SoundFile/loop/
    drumLoop.play();
	drumLoop.loop();
    bass.play();
	bass.loop();
}

function draw() 
{
	background(127);
	
	if (drumMute)
	{
		drumLoop.amp(0.0); //set volume to 0.0, no sound
	}
	else
	{
		drumLoop.amp(1.0); //set volume to max value of 1.0
		fill(64, 200, 255); // draw blue rectangle if unmuted
		rect(0, height/2, width, height);
	}
	
	if (bassMute) 
	{
		bass.amp(0.0); //set volume to 0.0, no sound
	}
	else
	{
		bass.amp(1.0); //set volume to max value of 1.0
		fill(255, 127, 0); //draw orange rectangle if unmuted
		rect(0, 0, width, height/2);
	}
	
	if (string.isPlaying()) //if string file is currently playing...
	{
		for (let i = 0; i < width; i += 10) //draw lines from mouse position to center at regular interval
		{
			line(mouseX, mouseY, i, height/2); 
		}
	}
}

function keyPressed()
{
    string.play(); //play string file when mouse is pressed
    stringPlaying = true; //set play flag to true
}

function mousePressed()
{
    if (mouseY > height/2) //if bottom half clicked...
	{
		drumMute = !drumMute; //switch drum volume on/off (mute)
	}
	else if (mouseY < height/2) //if top half clicked...
	{
		bassMute = !bassMute; //switch drum volume on/off (mute)
	}
}

function stringStop() //function to be called when sound file reaches end
{
    stringPlaying = false;
    string.stop();
}
