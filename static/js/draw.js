const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
let height = canvas.height;
let width = canvas.width;

// drawing variables
let color;
let penWidth;
let eraserWidth;
let erase = false;
// This is the flag that we are going to use to
// trigger drawing
let mode = "paint";
let paint = false;

let col = document.getElementById("penColor");

// Stores the initial position of the cursor
let coord = { x: 0, y: 0 };

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

export { getPosition, mouseDown, mouseUp, sketch, clear, penOn, eraseOn, rectOn, penCol };