/*
SOUND Example w/:
- loading, re-triggering, and looping sound files.
- adjusting playback rate of audio 
<><><><><><><><>
CONTROLS:
A - MUTE
S - MUTE
Q - START / RETRIGGER
W - STOP

See reference for p5.SoundFile methods and examples: https://p5js.org/reference/p5.sound/ 
*/

//declare object for storing my audio files
let drumLoop;
let bass;

//booleans for muting volume of audio files
let drumMute = false;
let bassMute = false;

async function setup() 
{
    createCanvas(600, 600);
    textSize(32);
    textAlign(CENTER, CENTER);

	//load sound files
    drumLoop = await loadSound('assets/drumLoop.mp3');
	bass = await loadSound('assets/bass.mp3');
}

function draw() 
{
	background(127);

	mutes(); //update mute states
}

function mutes()
{
	if (drumMute)
	{
	    drumLoop.amp(0.0);
        fill(255);
        text("DRUM MUTED", width/2, height - 50);
	}
	else
	{
		drumLoop.amp(1.0);
		fill(64, 200, 255);
		rect(0, height/2, width, height);
        fill(255);
        text("DRUM UNMUTED", width/2, height - 50);
	}
	
	if (bassMute)
	{
		bass.amp(0.0);
        fill(255);
        text("BASS MUTED", width/2, 50);
	}
	else
	{
		bass.amp(1.0);
		fill(255, 127, 0);
		rect(0, 0, width, height/2);
        fill(255);
        text("BASS UNMUTED", width/2, 50);
	}

    if(!drumLoop.isPlaying() && !bass.isPlaying())
    {
        fill(255);
        text("STOPPED", width/2, height/2);
    }
}


function keyPressed()
{
	if (key === 'a')
	{
		drumMute = !drumMute;
	}
	else if (key === 's')
	{
		bassMute = !bassMute;
	}
	else if (key === 'q')
	{
		//stop playback, then start loop playback from beginning of file
		drumLoop.stop();
		bass.stop();
        drumLoop.play();
		drumLoop.loop();
        bass.play();
		bass.loop();
	}
	else if (key === 'w')
	{	
		//stop playback
		drumLoop.stop();
		bass.stop();
	}
}
