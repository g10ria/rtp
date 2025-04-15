//background color variable
var bgColor;
//color of a square
var squareColor;
//text to be displayed
var displayText;
//sound to be played
var soundFX;

 // MIDI listener
 if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess()
    .then(onMIDISuccess, onMIDIFailure);
} else {
  console.log("WebMIDI is not supported in this browser.");
}



function onMIDISuccess(midiAccess) {
  console.log("midi success")
  for (var input of midiAccess.inputs.values()) {
    console.log(input);
    input.onmidimessage = onMIDIMessage;
  }
}

function onMIDIFailure(error) {
  console.log("Could not access your MIDI devices: ", error);
}

function onMIDIMessage(message) {
  m = message.data[0]
  // You can add more specific MIDI handling here if needed
  console.log('MIDI data', message.data[0]);
}

function setup() {
  //400 by 400 pixel canvas
  createCanvas(400, 400);

  //starting background color
  bgColor = color(220, 220, 200);

  //starting square color
  squareColor = color(100);

  //starting text
  displayText = "Nothing received";

  //loading a sound file to play
  //this can be seen inside of the project folder to the left of the code window
  soundFX = loadSound("./piano.mp3");

  ////
  //Setting up MIDI
  ////

  wm.enable(function (err) {
    if (err) {
      console.log("wm could not be enabled.", err);
    } else {
      console.log("wm enabled!");
    }

    //name our visible MIDI input and output ports
    console.log("---");
    console.log("Inputs Ports: ");
    for (i = 0; i < wm.inputs.length; i++) {
      console.log(i + ": " + wm.inputs[i].name);
    }

    console.log("---");
    console.log("Output Ports: ");
    for (i = 0; i < wm.outputs.length; i++) {
      console.log(i + ": " + wm.outputs[i].name);
    }

    //Choose an input port
    inputSoftware = wm.inputs[0];
    if (wm.inputs.length == 0) {
      console.log("NO INPUTS");
    }

    ///
    //listen to all incoming "note on" input events
    // inputSoftware.addListener('noteon', "all",
    // 	function (e) {
    // 	 	//Show what we are receiving
    // 		console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ") "+ e.note.number +".");
    //           displayText = "Received 'noteon' message (" + e.note.name + e.note.octave + ") "+ e.note.number +".";

    //   	//change the background color variable
    // 	 	var randomR = random(0,255);
    // 	 	var randomG = random(0,255);
    // 		var randomB = random(0,255);
    // 		bgColor = color(randomR,randomB,randomG);

    //   	//This will happen any time any note on message is received
    //   	//But you can specify particular notes that you want to respond to:

    //   	//If the incoming note is a "D" in any octave, then...
    //   	if(e.note.name=="D"){
    //      	console.log("A D note has been received, any octave");

    //       //Re-using the background color variable
    //       //Just re-arranging the random colors
    //       squareColor = color(randomB, randomG, randomR);
    //     }
    //   	//Or you can specify the note
    //   	if((e.note.name + e.note.octave)=="C4"){
    //       console.log("A C4 note has been received, specifically");

    //       //set speed of sound playback, changing the tone
    //       soundFX.rate(0.555);
    //     	//change the volume of the sound, scale of 0.0 to 1.0
    //     	soundFX.setVolume(0.15);
    //       //play sound
    //       soundFX.play();
    //     }
    //   	//Or use the MIDI note number instead
    //   	if(e.note.number==64){
    //       console.log("Detected MIDI note number 64 turned ON");

    //       //displayText="Note number 64 is on";
    //     }
    // 	}
    // );

    //The note off functionality will need its own event listener
    //You don't need to pair every single note on with a note off

    // inputSoftware.addListener("noteoff", "all", function (e) {
    //   //Show what we are receiving
    //   console.log(
    //     "Received 'noteoff' message (" +
    //       e.note.name +
    //       e.note.octave +
    //       ") " +
    //       e.note.number +
    //       "."
    //   );

    //   if (e.note.number == 64) {
    //     console.log("Detected MIDI note number 64 turned OFF");

    //     //displayText="Note number 64 is off";
    //   }
    // });
    
  });
}

function draw() {
  //Draw background with background color variable
  //Will change every time there is a note on
  background(bgColor);

  //Drawing a rectangle, with no outline,
  //Middle of the screen (width and height divided by two)
  //Changes
  fill(squareColor);
  noStroke();
  rect(100, 100, width / 2, height / 2);

  //Displaying text
  //Little bit under the box above
  //Changes the text when a number 64 MIDI note is on and off
  fill(0);
  textAlign(CENTER);
  textSize(20);
  text(displayText, width / 2, 350);
}
