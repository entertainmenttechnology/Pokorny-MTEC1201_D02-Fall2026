let piano;
let interval = 30;
let playFlag = false;

async function setup() 
{
    createCanvas(800, 600);
    strokeWeight(3);

    piano = await loadSound('assets/piano.mp3');    // load piano sound
    piano.onended(turnOff); // attach callback function for end of sound
}

function draw() 
{
    background(220);

    stroke(0);
    for (let i = interval; i < width; i += interval)    // draw vertical lines
    {
        line(i, 0, i, height);
    }

    stroke(255, 0, 0);
    line(mouseX, 0, mouseX, height);    // red line for pitch
    stroke(0, 0, 255);
    line(0, mouseY, width, mouseY);    // blue line for amplitude

    if (playFlag)
    {
        circle(mouseX, mouseY, 20); // draw circle when playing
    }

    let pitch = constrain(mouseX, 0, width); // limiting pitch from 0 to height
	pitch = map(pitch, 0, height, 0.05, 4); // mapping pitch from 0.05 to 4

    let amplitude = constrain(mouseY, 0, height);   // limiting amplitude from 0 to height
    amplitude = map(amplitude, height, 0, 0, 1);    // mapping amplitude from 0 to 1, floating point value

    //adjusting amplitude, or volume of the sound
    //https://p5js.org/reference/p5.p5soundNode/amp/
    piano.amp(amplitude);
	
	// adjusting the playback rate of sound file, see:
	// https://p5js.org/reference/p5.SoundFile/rate/
	piano.rate(pitch);
	// //NOTE: .rate values below 0 will make the file play backwards. A rate of 2 is twice as fast as original speed
}

function mousePressed() //play sound and set flag to true when mouse pressed
{
    piano.play();
    playFlag = true;
}

function mouseReleased() //stop sound when mouse released
{
    turnOff();
}

function turnOff()  //stop sound and setflag to false
{
    piano.stop();
    playFlag = false;
}