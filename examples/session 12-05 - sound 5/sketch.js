/*
SOUND Example - DRUM SAMPLER:
- triggering playback based on mouse press & location.
- using OOP to manage audio
<><><><><><><><>
CONTROLS:
- Click on Squares to play individual drums, or press:
A - KICK
S	- SNARE
D - CLOSED HIHAT
F - OPEN HIHAT
G - TOM
H - PIANO
B	- PIANO [PITCHED DOWN]
Y - PIANO [PITCHED UP]

See reference for p5.SoundFile methods and examples: https://p5js.org/reference/p5.sound/ 
*/

//array for Drum objects
let drums = [];
drums.length = 6;

async function setup() 
{
    createCanvas(950, 500);
	rectMode(CENTER);
	background(64);

    //for each array element...
	//create new instance of Drum class, each with different audio file and X position
	drums[0] = new Drum(100, 'assets/kick.mp3');
	drums[1] = new Drum(250, 'assets/snare.mp3');
	drums[2] = new Drum(400, 'assets/hatClosed.mp3');
	drums[3] = new Drum(550, 'assets/hatOpen.mp3');
	drums[4] = new Drum(700, 'assets/tom.mp3');
	drums[5] = new Drum(850, 'assets/piano.mp3');

    for (let i = 0; i < drums.length; i++)
    {
       await drums[i].load();
    }
}

function draw() 
{
    //background(0);
	for (let i = 0; i < drums.length; i++)
	{
		drums[i].display(); //display each drum's square "pad"
	}
}

class Drum
{
	//constructor for Drum class, accepts initial x position and audio file
	constructor(tempX, tempSamplePath)
	{
		this.x = tempX;
		this.y = 400;
		this.width = 100;
        this.samplePath = tempSamplePath;
		this.sample = 0;
		this.pitch = 1;
		this.volume = 1;
        this.playing = false;
	}

    async load()
    {
        this.sample = await loadSound(this.samplePath);

        let drum = this;

        function turnOff()
        {
            drum.playing = false;
        }

        this.sample.onended(turnOff);
    }
	
	display() //method for drawing drum "pad"
	{
		if (this.playing) //if sample is currently playing...
		{
			fill(255, 127, 0); //fill square orange
		}
		else
		{
			fill(255); //fill square white
		}
		rect(this.x, this.y, this.width, this.width); //draw square
	}
	
	hover(mx, my) //method for checking if mouse is hovering over drum "pad"
	{
		//same as...
		// if (mouseX > this.x - this.width && mouseX < this.x + this.width && mouseY > this.y - this.width && mouseY < this.y + this.width)
		
		//if the distance from mx,my to the square's x,y is less than the width of the square...
		if (dist(mx, my, this.x, this.y) < this.width/2) 
		{
			//then mx,my must be HOVERING OVER the square, so...
			return true;
		}
		else
		{
			return false;
		}
	}
	
	playDrum() //method to play this sample
	{
        this.playing = true;
		this.sample.play();
	}
	
	setPitch(p) //change the pitch/frequency/rate of the sample
	{
		this.pitch = p;
		this.sample.rate(this.pitch);
	}
	
	setAmp(a) //change the amplitude/volume of the sample
	{
		this.volume = constrain(a, 0.0, 1.0);
		this.sample.amp(this.volume);
	}
}

function keyPressed() //mapping keys to drum sample playback
{
	if (key === 'a')
	{
		drums[0].playDrum();
	}
	else if (key === 's')
	{
		drums[1].playDrum();
	}
	else if (key === 'd')
	{
		drums[2].playDrum();
	}
	else if (key === 'f')
	{
		drums[3].playDrum();
	}
	else if (key === 'g')
	{
		drums[4].playDrum();
	}
	else if (key === 'h')
	{
		drums[5].setPitch(1); //play piano at original pitch
		drums[5].playDrum();
	}
	else if (key === 'b')
	{
		drums[5].setPitch(0.75);	//play piano at lower pitch
		drums[5].playDrum();
	}
	else if (key === 'y')
	{
		drums[5].setPitch(1.50);	//play piano at higher pitch
		drums[5].playDrum();
	}
}

function mousePressed() //if mouse is clicked...
{
	for (let i = 0; i < drums.length; i++) //for each drum object in our array...
	{
		if (drums[i].hover(mouseX, mouseY)) //if mouse position is over our square drum "pad"...
		{
			drums[i].playDrum(); //play the sample
		}
	}
}