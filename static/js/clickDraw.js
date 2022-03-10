const canvas = document.querySelector('#canvas');

// Context for the canvas for 2 dimensional operations
const ctx = canvas.getContext('2d');

let currFrame = 0;
let frames = {};
let frameSaves = document.getElementById("frameSaves");
let saveBtn = document.getElementById("save");
let clearBtn = document.getElementById("clear");
let restoreBtn = document.getElementById("restore");
let height = canvas.height;
let width = canvas.width;
let color;
let penWidth;
let col = document.getElementById("penColor");
let slider = document.getElementById("penSize");
let erase = false;
// let output = document.getElementById("demo");
// Stores the initial position of the cursor
let coord = { x: 0, y: 0 };

// This is the flag that we are going to use to
// trigger drawing
let paint = false;

// wait for the content of the window element
// to load, then performs the operations.
// This is considered best practice.
window.addEventListener('load', () => {

    document.addEventListener('mousedown', startPainting);
    document.addEventListener('mouseup', stopPainting);
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

function changeColor(){
  color
}
// The following functions toggle the flag to start
// and stop drawing
function startPainting(event) {
    paint = true;
    getPosition(event);
}
function stopPainting() {
    paint = false;
}

function sketch(event) {
    if (!paint) return;
    ctx.beginPath();
    if (!erase){
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
      ctx.lineWidth = 10;
      ctx.lineCap = "round";
      ctx.strokeStyle = white;
      ctx.moveTo(coord.x, coord.y);
      getPosition(event);
      ctx.lineTo(coord.x, coord.y);
      ctx.stroke();

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

//changes the pen color according to user input
function penCol(){
  // let as = document.forms[0].penColor.value;
  color = col.options[col.selectedIndex].text;
  console.log(col);
}
col.onchange=penCol;
penCol();

//changes pen thickness according to user input
// output.innerHTML = slider.value; // Display the default slider value
// Update the current slider value (each time you drag the slider handle) + change pen thickness
slider.oninput = function() {
  penWidth = slider.value;
  console.log(penWidth);
  output.innerHTML = this.value;
}

saveBtn.addEventListener("click", saveDrawing, false);
clearBtn.addEventListener("click", clear, false);
restoreBtn.addEventListener("click", restore, false);