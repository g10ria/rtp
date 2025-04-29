var squareColor;

// PRESS ENTER TO RESET THE TIMER
// add other functionality hehe
function keyPressed() {
  if (keyCode === ENTER) {
    console.log("RESET TIMER")
    num_timing_beats = 0;
  }
}

function onMIDISuccess(midiAccess) {
  console.log("midi success")
  midiAccess.inputs.forEach((entry) => {
    entry.onmidimessage = onMIDIMessage;
  });
}

function onMIDIFailure(error) {
  console.log("Could not access your MIDI devices: ", error);
}

var num_timing_beats = 0

function onMIDIMessage(message) {
  m = message.data[0]
  if (m == 248) {
    num_timing_beats++
    if (num_timing_beats == 24) {
      console.log("timing clock")
      num_timing_beats = 0
      switchColor()
    }
  } else if (m==252) {
    console.log("SEQUENCE STOP")
  } else if (m==250) {
    console.log("SEQUENCE START")
  } else {
    console.log("UNKNOWN MESSAGE: ", message)
  }
}

function switchColor() {
  if (squareColor=='black') { squareColor = 'gray'}
  else {squareColor = 'black'}
}

function setup() {
  if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess()
      .then(onMIDISuccess, onMIDIFailure);
  } else {
    console.log("WebMIDI is not supported in this browser.");
  }
  //400 by 400 pixel canvas
  createCanvas(400, 400);
  switchColor()
  displayText = "CLOCK";
}

function draw() {
  //Draw background with background color variable
  //Will change every time there is a note on
  background('white');

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
