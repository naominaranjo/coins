import {saveDrawing, restore} from "./loadFrames.js";
import {getPosition, mouseDown, mouseUp, sketch, clear, penOn, eraseOn, rectOn, penCol, mouseClick} from "./draw.js";

// initialize canvas variables
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

// HTML references
let canvasSpace =  document.getElementById("canvas");
let saveBtn = document.getElementById("save");
let clearBtn = document.getElementById("clear");
let restoreBtn = document.getElementById("restore");
let eraserBtn = document.getElementById("eraser");
let penBtn = document.getElementById("pen");
let rectBtn = document.getElementById("rect");
let col = document.getElementById("penColor");
let penSlider = document.getElementById("penSize");
let eraserSlider = document.getElementById("eraserSize");

// Stores the initial position of the cursor
let coord = { x: 0, y: 0 };

// wait for the content of the window element
// to load, then performs the operations.
window.addEventListener('load', () => {

    document.addEventListener('mousedown', mouseDown);
    document.addEventListener('mouseup', mouseUp);
    document.addEventListener('mousemove', sketch);

});

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

canvasSpace.addEventListener("click", mouseClick);
rectBtn.addEventListener("click", rectOn);
penBtn.addEventListener("click", penOn);
eraserBtn.addEventListener("click", eraseOn);
saveBtn.addEventListener("click", saveDrawing, false);
clearBtn.addEventListener("click", clear, false);
restoreBtn.addEventListener("click", restore, false);
