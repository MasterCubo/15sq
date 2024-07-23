let grid;
let solved;
let n = 4;
let w;
let zidx;
let timeS;
let timeC;
let moves;
let sel;
let nameInput
// 00:03.570 for 3x3 on phone
// 00:18.820 for 4x4 on phone 
// 00:03.685 for 3x3 on laptop
// 00:21.695 for 4x4 on laptop

// TODO //
// TODO: tidy up code and make readable. especially draw()
// TODO: add more and better GUI
// TODO: add leaderboard/cookie system with document.cookie
// TODO: add some nice comments to all the functions
// TODO: slide more than one peice at once

// 3x3s seem far easier than the regular game idk 

// quick function to pad with zeros.
const zeroPad = (num, places) => String(num).padStart(places, "0");

// function to return a solved board
function createBoard() {
  let arr = new Array(n ** 2); //
  for (let i = 0; i < n ** 2; i += 1) {
    // create an array 1-16
    arr[i] = i + 1; //
  } //
  arr[n ** 2 - 1] = 0; // 1-15, 0
  zidx = n ** 2 - 1; // set zero index to the last
  return arr;
}

// function that returns if the grid variable is shuffled
function boardShuffled() {
  for (let i = 0; i < grid.length; i += 1) {
    // for each sqaure
    if (grid[i] == solved[i]) {
      // if it is in the right place
      return false; // it aint fully shuffled
    }
  }
  return true;
}

// returns if the board is solved
function boardSolved() {
  for (let i = 0; i < grid.length; i += 1) {
    // for each peice
    if (grid[i] != solved[i]) {
      // if its not in the right place
      return false; // it aint solved
    }
  }
  return true;
}

// function that starts the game, initializing the grid and shuffling it.
function shuffleBoard() {
  // moves = 0 shows how many moves the shuffle takes
  grid = createBoard(); // create 1-15,0
  solved = grid.slice(); // copy that grid for checking

  while (!boardShuffled()) {
    // self explanitory
    switch (
      floor(random() * 4) // pick a random direction
    ) {
      case 0: // swap up
        makeMove(zidx % n, floor(zidx / n) - 1); // swap the empty tile and the one above
        break;
      case 1: // swap down
        makeMove(zidx % n, floor(zidx / n) + 1); // etc.
        break;
      case 2: // swap left
        makeMove((zidx % n) - 1, floor(zidx / n));
        break;
      case 3: // swap right
        makeMove((zidx % n) + 1, floor(zidx / n));
        break;
    }
  }
  timeS = Date.now(); // the board has been shuffled, start the timer.
  moves = 0
}



function setup() {
  createCanvas(400, 500);
  createLB()
  w = width / n; // width of each box
  shuffleBoard(grid); // start the game essentially.
  textFont("Inconsolata");
  
  
  nameInput = createInput()
  nameInput.attribute("placeholder", "Name for Leaderboard")
  nameInput.position(50, 500)
  
  mySelect = createSelect();
  mySelect.position(0, 500);

  // Add color options.
  mySelect.option(2);
  mySelect.option(3);
  mySelect.option(4);
  mySelect.option(5);
  mySelect.option(6);
  mySelect.option(7);
  mySelect.option(8);
  mySelect.option(9);
  mySelect.option(10);
  mySelect.selected(4);
  sel = 4
    
  loadLeaderboard()
  orderDivs()
}

function drawBoxes() {
  background(40);
    stroke(0);
    textSize((60 * 4) / n); // this type of notation is to keep the original proportions of the original board i made (4x4) across all board sizes.
    strokeWeight((10 * 4) / n);
    textAlign(CENTER, BASELINE);
    for (i = 0; i < n; i += 1) {
      // for each
      for (j = 0; j < n; j += 1) {
        // tile
        if (grid[j * n + i] == 0) {
          // if its 0 (this could be done with zidx)
          fill(50);
          strokeWeight((10 * 4) / n); // make an empty square
          square(i * w, j * w, w);
        } 
        else if (grid[j*n+i] == solved[j*n+i]) {
          
          fill(10);
          strokeWeight((10 * 4) / n);
          square(i * w, j * w, w);
          strokeWeight(0);
          fill("#dedede"); // make a square with the number
          text(str(grid[j * n + i]), i * w + w / 2, j * w + w / 1.5);
          
        }else {
          
          // else
          fill(10);
          strokeWeight((10 * 4) / n);
          square(i * w, j * w, w,10);
          fill(20)
          square(i * w, j * w, w,10);
          strokeWeight(0);
          fill("#dedede"); // make a square with the number
          text(str(grid[j * n + i]), i * w + w / 2, j * w + w / 1.5);
        }
        
      }
    }
}

function draw() {
  if (sel != mySelect.selected()){
    sel = mySelect.selected()
    n = sel
    w = width / n; // width of each box
    loop()
    orderDivs()
    shuffleBoard()
  }
  
  if (!boardSolved()) {
    // while the game is still playing
    drawBoxes()
    
    textSize(19); // render the GUI below
    textAlign(LEFT);
    timeC = Date.now();
    timeNum = (timeC - timeS) / 1000; // time in seconds
    fill(255);
    //stroke(255)
    strokeWeight(0);
    timeText =
      zeroPad(floor(timeNum / 60), 2) +
      ":" + // minutes
      zeroPad(floor(timeNum % 60), 2) +
      "." + // seconds
      str(timeNum).split(".")[1]; // millis
    text(timeText, 0, 430);
    text(moves, 0, 450)
    
    
    fill("#1a1a1a");
    strokeWeight((10 * 4) / n);
    strokeWeight(0)
    square(350, 450, 50); // make the restart button
    fill(0)
    strokeWeight((10 * 4) / n);
    line(300,400,400,400)
    
    textAlign(CENTER, CENTER)
    strokeWeight(0)
    fill("#dedede")
    textSize(45)
    text("↺", 375,475)
    
//     fill(150)
//     rect(210,410,90,90)
//     fill(0)
//     text('3x3',250,450)// make 3x3 selector
    
//     fill(150)
//     rect(110,410,90,90)
//     fill(0)
//     text("4x4",150,450) // make 4x4 button
    
  } else {
    
    // board is solved
    drawBoxes()

    timeF = Date.now();
    
     textSize(19); // render the GUI below
    textAlign(LEFT);
    timeC = Date.now();
    let lbTime = timeC-timeS
    timeNum = (timeC - timeS) / 1000; // time in seconds
    fill(255);
    //stroke(255)
    strokeWeight(0);
    timeText =
      zeroPad(floor(timeNum / 60), 2) +
      ":" + // minutes
      zeroPad(floor(timeNum % 60), 2) +
      "." + // seconds
      str(timeNum).split(".")[1]; // millis
    text(timeText, 0, 430);
    text(moves, 0, 450)
    
    
    fill("#1a1a1a");
    strokeWeight((10 * 4) / n);
    strokeWeight(0)
    square(350, 450, 50); // make the restart button
    fill(0)
    strokeWeight((10 * 4) / n);
    line(300,400,400,400)
    
    textAlign(CENTER, CENTER)
    strokeWeight(0)
    fill("#dedede")
    textSize(45)
    text("↺", 375,475)
    
//     fill(150)
//     rect(210,410,90,90)
//     fill(0)
//     text('3x3',250,450)// make 3x3 selector
    
//     fill(150)
//     rect(110,410,90,90)
//     fill(0)
//     text("4x4",150,450) // make 4x4 button

    
    //check if its a win
    checkLeaderboard(sel, lbTime)
    
    noLoop(); // stop running until restarted
  }
}

function mousePressed() {
  if (0 <= mouseX && mouseX <= width && 0 <= mouseY && mouseY <= height) {
    if (mouseY < 400) {
      // mouse in board
      let tileX = floor(mouseX / w);
      let tileY = floor(mouseY / w);
      // b = [a, a = b][0]; this swaps the two variables
      makeMove(tileX, tileY);
    } else {
      // mouse in GUI section
      
      if (mouseX > 350 && mouseY > 450) {
        loop();
        shuffleBoard();
      }
    }
  }
}

function keyPressed() {
  // key functionality check
  switch (keyCode) {
    case RIGHT_ARROW:
      makeMove((zidx % n) - 1, floor(zidx / n)); // swap left
      break;
    case LEFT_ARROW:
      makeMove((zidx % n) + 1, floor(zidx / n)); // swap right
      break;
    case UP_ARROW:
      makeMove(zidx % n, floor(zidx / n) + 1); // swap down
      break;
    case DOWN_ARROW:
      makeMove(zidx % n, floor(zidx / n) - 1); // swap up
      break;
    case 82: // r
      loop()
      shuffleBoard()
      break;
  }
}

function validMove(x, y) {
  let zx = zidx%n
  let zy = floor(zidx/n)
  if (
    ((abs(zx-x) < 2 && zy==y) ||
     // if the difference between the tile and 0 is one
     (abs(zy-y) < 2 && zx==x))&&
    x < n && 
    x > -1 &&
    y < n && 
    y > -1   
  ) {
    return true;
  } else {
    return false;
  }
}

function makeMove(tileX, tileY) {
  if (validMove(tileX, tileY)) {
    moves += 1
    grid[tileY * n + tileX] = [
      grid[zidx],
      (grid[zidx] = grid[tileY * n + tileX]),
    ][0];
    zidx = tileY * n + tileX;
  }
}
