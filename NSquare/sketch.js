// Classifier Variable Perfect 2
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/2X5XE7ICF/';

// Canvas
let canvas;
let isDrawing = false;
let previousX = 0;
let previousY = 0;
let prevTouchX; // Variable to store previous touch X position
let prevTouchY; // Variable to store previous touch Y position
let isStartingNewDrawing = true;

// To store the classification
let predictions = [];

// Create an array of 200 elements and initialize with 0
let confidenceArray = new Array(52).fill(0);

// Array to store grid values
let grid = [];
let cellSize;

// Array of 84 values initialized with 0
let hidden_array = new Array(84).fill(0);

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  canvas = createCanvas(700, 700);
  centerCanvas();
  background(0);

  cellSize = width / 8; // Calculate cell size based on canvas width

  // Initialize the grid with 64 values of 0
  for (let i = 0; i < 64; i++) {
    grid.push(0);
    
    
    if (!navigator.serial) {
    alert("WebSerial is not supported in this browser. Try Chrome or MS Edge.");
  }

  navigator.serial.addEventListener("connect", portConnect);
  navigator.serial.addEventListener("disconnect", portDisconnect);

  serial.getPorts();
  serial.on("noport", makePortButton);
  serial.on("portavailable", openPort);
  serial.on("requesterror", portError);
  serial.on("data", serialEvent);
  serial.on("close", makePortButton);
  }

  // Start classifying on mouse press
  canvas.touchStarted(startDrawing);
  canvas.touchEnded(classifyDrawing);

  clearButton = createButton('Clear');
  clearButton.position(windowWidth / 2 - 50, height + 100); // Position the button centered below the canvas
  clearButton.style('background-color', 'black');
  clearButton.style('color', 'white');
  clearButton.style('padding', '10px 20px');
  clearButton.style('border', 'none');
  clearButton.style('border-radius', '100px');
  clearButton.style('font-family', 'Helvatica, sans-serif');
  clearButton.style('cursor', 'pointer');
  clearButton.style('font-size', '20px');
  clearButton.mousePressed(clearCanvas);
  
 let textDiv1 = createDiv('Welcome to Neural Networks');
  let textDiv2 = createDiv('Please draw one Alphabet');

  // Set positions for the div elements
  textDiv1.position(windowWidth / 2 - 150, 15); // Position for the first text
  textDiv2.position(windowWidth / 2 - 230, 55); // Position for the second text

  // Set styles for the div elements
  textDiv1.style('font-family', 'Gotham, sans-serif');
  textDiv1.style('text-align', 'center');
  textDiv1.style('font-size', '16px');
  textDiv1.style('padding', '10px');

  textDiv2.style('font-family', 'Gotham, sans-serif');
  textDiv2.style('text-align', 'center');
  textDiv2.style('font-size', '32px');
  textDiv2.style('padding', '10px');

  // Check for predictions every 2 seconds
  //setInterval(checkPrediction, 2000);
}

function draw() {
  stroke(255);
  strokeWeight(55);
  if (isDrawing && touches.length > 0) {
    if (isStartingNewDrawing) {
      // Move the drawing without creating a line (only on the first touch)
      prevTouchX = touches[0].x;
      prevTouchY = touches[0].y;
      isStartingNewDrawing = false;
    } else {
      // Draw lines except for the first touch (creates separation between drawings)
      line(prevTouchX, prevTouchY, touches[0].x, touches[0].y);
      updateGridCells(prevTouchX, prevTouchY, touches[0].x, touches[0].y);
    }

    prevTouchX = touches[0].x;
    prevTouchY = touches[0].y;
  
    
     for (let i = 0; i < hidden_array.length; i++) {
  let randomValue = Math.floor(Math.random() * 2); // Generate either 0 or 1
  if (randomValue === 0) {
    hidden_array[i] = 0; // Set half of the array to 0
  } else {
    hidden_array[i] = Math.floor(Math.random() * 100) + 1; // Set a random value between 1 and 100 for the other half
  }
}
  } 
  
 

  //Console.log(hidden_array);
}

function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  canvas.position(x, y);
}

function windowResized() {
  centerCanvas();
}

function startDrawing() {
  isDrawing = true;
  isStartingNewDrawing = true; // Set flag to indicate a new drawing
  if (touches.length > 0) {
    prevTouchX = touches[0].x;
    prevTouchY = touches[0].y;
  }
}

// Stop drawing and classify the drawn image when touch ends
function classifyDrawing() {
  isDrawing = false;
  if (grid.some(cell => cell === 100)) {
    getDrawingClassification(); // Perform classification only if something is drawn
    checkPrediction();
  }
}

// Update the grid cells intersected by the drawn line
function updateGridCells(x1, y1, x2, y2) {
  // Calculate the step size for checking intersection
  let step = cellSize / 2;
  let dx = x2 - x1;
  let dy = y2 - y1;
  let distance = sqrt(dx * dx + dy * dy);
  let steps = distance / step;

  // Calculate increments for x and y
  let xIncrement = dx / steps;
  let yIncrement = dy / steps;

  // Traverse the line and mark intersected cells
  for (let i = 0; i < steps; i++) {
    let x = x1 + i * xIncrement;
    let y = y1 + i * yIncrement;
    markCell(floor(x / cellSize), floor(y / cellSize));
  }
}

// Mark the cell as 100 if something is drawn
function markCell(col, row) {
  let index = col + row * 8; // Convert 2D index to 1D

  if (row % 2 === 1) {
    // Reverse values for odd rows
    let reverseIndex = (row * 8 + 7) - col;
    if (grid[reverseIndex] !== 100) {
      grid[reverseIndex] = 100;
    }
  } else {
    // For even rows, proceed as before
    if (grid[index] !== 100) {
      grid[index] = 100;
    }
  }
}

// Get a prediction for the drawn image
function getDrawingClassification() {
  let canvasImage = get(0, 0, width, height);
  classifier.classify(canvasImage, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  
  // Clear previous predictions
  predictions = [];
  
  // Create an object to store labels and their confidence values
  let confidenceMap = {};

  // Store results with confidence percentage
  for (let i = 0; i < results.length; i++) {
    let label = results[i].label;
    let confidence = nf(results[i].confidence * 100, 0, 2); // Confidence percentage, rounded to 2 decimal places
    let prediction = label + ': ' + confidence + '%';
    predictions.push(prediction);

    // Store confidence values in the confidenceMap for non-Null labels
    if (label !== 'Null') {
      confidenceMap[label] = parseInt(confidence); // Parse confidence as an integer and store
    }
  }

  // Sort labels alphabetically
  let sortedLabels = Object.keys(confidenceMap).sort();

  // Set confidence values in the confidenceArray based on sorted labels
  let startPos = 0;
  for (let label of sortedLabels) {
    let confidence = confidenceMap[label];
    confidenceArray[startPos] = confidence;
    confidenceArray[startPos + 1] = confidence;
    startPos += 2;
  }
  
  // Show the labels and confidence percentages
  //console.log(predictions);
  //console.log(confidenceArray); // Log the confidenceArray to see the values between positions 148 and 199
}

// Clear the canvas and reset the grid
function clearCanvas() {
  background(0);
  grid = grid.map(() => 0);
  hidden_array = hidden_array.map(() => 0);
  confidenceArray = confidenceArray.map(() => 0);
}
let combinedArray = []; // Define a new array for combining grid and confidenceArray

// Function to check prediction every 2 seconds
function checkPrediction() {
  //console.log(grid); // Log the grid values
  
  // Check if the prediction is 'Null' and set every 200 values in the array to 0
  if (predictions.includes('Null')) {
    confidenceArray.fill(0, 0, 200);
    console.log('Prediction is Null. Resetting values to 0.');
  }

  // Combine grid and confidenceArray into combinedArray
  combinedArray = [...grid, ...hidden_array, ...confidenceArray];
  //console.log(combinedArray); // Log the combined array
  sendData();
}


// variable to hold an instance of the p5.webserial library:
const serial = new p5.WebSerial();

let portButton;
let inData; // for incoming serial data
let sendingData = false; // Flag to control data sending





function sendData() {
  // if (serial.serial && serial.serial.writable) {
    serial.write(JSON.stringify(combinedArray) + "\n"); // Send the array as a string
   // console.log("Sending data:", combinedArray);
  
   // frameRate(1);  // }
}

function makePortButton() {
  portButton = createButton("choose port");
  portButton.position(10, 10);
  portButton.mousePressed(choosePort);
}

function choosePort() {
  serial.requestPort();
}

function openPort() {
  serial.open().then(initiateSerial);

  function initiateSerial() {
    console.log("Port open");
    sendingData = true; // Set flag to start sending data
    if (portButton) portButton.hide();
  }
}

function serialEvent() {
  // Handle incoming data if needed
  // var inByte = serial.read();
  // inData = inByte;
}

function portError(err) {
  alert("Serial port error: " + err);
}

function portConnect() {
  console.log("Port connected");
  serial.getPorts();
}

function portDisconnect() {
  serial.close();
  console.log("Port disconnected");
}
