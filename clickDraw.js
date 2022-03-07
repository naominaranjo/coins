// Code copied from geeks4geeks :p


// wait for the content of the window element
// to load, then performs the operations.
// This is considered best practice.
window.addEventListener('load', () => {

    document.addEventListener('mousedown', startPainting);
    document.addEventListener('mouseup', stopPainting);
    document.addEventListener('mousemove', sketch);
});

const canvas = document.querySelector('#canvas');

// Context for the canvas for 2 dimensional operations
const ctx = canvas.getContext('2d');

var frame;
var saveBtn = document.getElementById("save");
var clearBtn = document.getElementById("clear");
var restoreBtn = document.getElementById("restore");
var height = canvas.height;
var width = canvas.width;
var color;
var lineWidth;
saveBtn.addEventListener("click", saveDrawing, false);
clearBtn.addEventListener("click", clear, false);
restoreBtn.addEventListener("click", restore, false);


// Stores the initial position of the cursor
let coord = { x: 0, y: 0 };

// This is the flag that we are going to use to
// trigger drawing
let paint = false;

// Updates the coordianates of the cursor when
// an event e is triggered to the coordinates where
// the said event is triggered.
function getPosition(event) {
    coord.x = event.clientX - canvas.offsetLeft;
    coord.y = event.clientY - canvas.offsetTop;
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

    ctx.lineWidth = lineWidth;

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

// stores drawing data in a global variable
function saveDrawing(e) {
    console.log("save attempted");
    data = ctx.getImageData(0, 0, width, height);
    frame = data;
}

// clears the canvas
function clear(e) {
    console.log("clear attempted");
    ctx.clearRect(0, 0, width, height);
}

// restores the drawing using putImageData()
function restore(e) {
    console.log("restore attempted")
    ctx.putImageData(frame, 0, 0);
}

var e = document.getElementById("penColor");
function penCol(){
  // var as = document.forms[0].penColor.value;
  var col = e.options[e.selectedIndex].text;
  color = col;
  console.log(col);
}
e.onchange=penCol;
penCol();

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value
lineWidth = slider.value;
console.log(lineWidth);
// Update the current slider value (each time you drag the slider handle) + change pen thickness
slider.oninput = function() {
  lineWidth = slider.value;
  console.log(lineWidth);
  output.innerHTML = this.value;
}
