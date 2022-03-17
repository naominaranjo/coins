const canvas = document.querySelector('#canvas');

// Context for the canvas for 2 dimensional operations
const ctx = canvas.getContext('2d');

let currFrame = 0;
let frames = {};
let frameSaves = document.getElementById("frameSaves");
let saveBtn = document.getElementById("save");
let clearBtn = document.getElementById("clear");
let restoreBtn = document.getElementById("restore");
let eraserBtn = document.getElementById("eraser");
let penBtn = document.getElementById("pen");
let rectBtn = document.getElementById("rect");
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let height = canvas.height;
let width = canvas.width;
let color;
let penWidth;
let eraserWidth;
let col = document.getElementById("penColor");
let penSlider = document.getElementById("penSize");
let eraserSlider = document.getElementById("eraserSize");
let erase = false;

// let output = document.getElementById("demo");
// Stores the initial position of the cursor
let coord = { x: 0, y: 0 };

// This is the flag that we are going to use to
// trigger drawing
let mode = "paint";
let paint = false;

// wait for the content of the window element
// to load, then performs the operations.
// This is considered best practice.
window.addEventListener('load', () => {

    document.addEventListener('mousedown', mouseDown);
    document.addEventListener('mouseup', mouseUp);
    document.addEventListener('mousemove', sketch);
});

// Updates the coordianates of the cursor when
// an event e is triggered to the coordinates where
// the said event is triggered.
function getPosition(event) {
  var rect = canvas.getBoundingClientRect();
  coord.x = event.clientX - rect.left;
  coord.y = event.clientY - rect.top;
}

// The following functions toggle the flag to start
// and stop drawing
function mouseDown(event) {
    if(mode == "paint"){
    paint = true;
    getPosition(event);
    initialize = false;
    }
    if (mode == "erase"){
      erase = true;
      getPosition(event);
    }
    if (mode == "rect"){
      getPosition(event);
      console.log("mode correct - rect");
    }
}
function mouseUp() {
    erase = false;
    paint = false;
}

function sketch(event) {
    ctx.beginPath();
    if (paint){
      ctx.lineWidth = penWidth;
      // Sets the end of the lines drawn
      // to a round shape.
      ctx.lineCap = 'round';
      ctx.strokeStyle = color;
      // The cursor to start drawing
      // moves to this coordinate
      ctx.moveTo(coord.x, coord.y);
      // The position of the cursor
      // gets updated as we move the
      // mouse around.
      getPosition(event);
      // A line is traced from start
      // coordinate to this coordinate
      ctx.lineTo(coord.x, coord.y);
      // Draws the line.
      ctx.stroke();
    }
    if (erase){
      ctx.lineWidth = eraserWidth;
      ctx.lineCap = "round";
      ctx.strokeStyle = "white";
      ctx.moveTo(coord.x, coord.y);
      getPosition(event);
      ctx.lineTo(coord.x, coord.y);
      ctx.stroke();
    }

    if (mode == "rect"){
      ctx.beginPath();
      ctx.lineWidth = eraserWidth;
      ctx.lineCap = "round";
      ctx.strokeStyle = "black";
      ctx.rect(coord.x, coord.y, coord.x + 50, coord.y + 50);
      ctx.stroke();

      // ctx.moveTo(coord.x, coord.y);
      // getPosition(event);
      // ctx.lineTo(coord.x, coord.y);
      // ctx.stroke();
    }

}

// restores the drawing using putImageData()
let restore = function(i){
    console.log("restore attempted")
    ctx.putImageData(frames[i], 0, 0);
}

// stores drawing data in a global letiable
function saveDrawing(e) {
    console.log("save attempted");
    currFrame++;
    let reference = document.createElement("button");
    let data = ctx.getImageData(0, 0, width, height);
    reference.className = "button";
    reference.innerHTML = currFrame;
    // reference.width = 50;
    // reference.height = 50;
    // let refCtx = reference.getContext("2d");
    // refCtx.putImageData(data, 0, 0);
    frames[currFrame] = data;
    console.log(frames);
    const i = currFrame;
    document.cookie = "currFrame=" + currFrame + ";" + "path=/" + ";" + "sameSite=Strict";
    document.cookie = "frames=" + frames + ";" + "path=/" + ";" + "sameSite=Strict";
    reference.addEventListener("click", function () {
        restore(i);
    });
    frameSaves.appendChild(reference);
}

// clears the canvas
function clear(e) {
    console.log("clear attempted");
    ctx.clearRect(0, 0, width, height);
}

function penOn(){
    mode = "paint";
    erase = false;
    console.log("draw");
}

function eraseOn(){
    mode = "erase";
    paint = false;
    console.log("erase");
}

function rectOn(){
    mode = "rect";
    console.log("rect")
}


//changes the pen color according to user input
function penCol(){
  // let as = document.forms[0].penColor.value;
  color = col.options[col.selectedIndex].text;
  console.log(color);
}


col.onchange=penCol;
penCol();

//changes pen thickness according to user input
// output.innerHTML = slider.value; // Display the default slider value
// Update the current slider value (each time you drag the slider handle) + change pen thickness
penSlider.oninput = function() {
  penWidth = penSlider.value;
  console.log(penWidth);
}

eraserSlider.oninput = function() {
  eraserWidth = eraserSlider.value;
  console.log(eraserWidth);
}
rectBtn.addEventListener("click", rectOn);
penBtn.addEventListener("click", penOn);
eraserBtn.addEventListener("click", eraseOn);
saveBtn.addEventListener("click", saveDrawing, false);
clearBtn.addEventListener("click", clear, false);
restoreBtn.addEventListener("click", restore, false);
