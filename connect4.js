
/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array--------------------------------------------------------------DONE
  /*For loop creating game board dynamically. Loops through HEIGHT 
    variable until loop reaches maximum number assigned to HEIGHT variable. 
    In our case, maximum number is 6 listed on line 9.*/
    for (let y = 0; y < HEIGHT; y++) {
      //Creating from array from {length: WIDTH} using .from() method, and pushing newly created array into board variable.
      board.push(Array.from({length: WIDTH}));
    }
}

/** makeHtmlBoard: make HTML table and row of column tops. */
function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"------------------------------------------------DONE
  const board = document.getElementById("board");
  // TODO: add comment for this code-------------------------------------------------------------------------------------DONE
  //Creating table row element assigned to "top" variable.
  const top = document.createElement("tr");
  //Assigning ID "column-top" to newly created table row element.
  top.setAttribute("id", "column-top");
  //Adding "click" event listener to top varibale for each table row element.
  top.addEventListener("click", handleClick);
  /*For loop starting at 0, and loops through WIDTH variable. The loop will continue creating table data
    elements and appending them to table row element until WIDTH variable has reached 7. This is the maximum
    width assigned to WIDTH variable on line 8.*/
  for (let x = 0; x < WIDTH; x++) {
    //Creating table data element assigned to "headCell" variable.
    const headCell = document.createElement("td");
    //Assigning an ID of x (index for each loop iteration) to newly created table data element.
    headCell.setAttribute("id", x);
    //Adding table data element/s to table row elemet/s.
    top.append(headCell);
  }
  //Adding top table row element/s and table data element/s to board variable.
  board.append(top);
  // TODO: add comment for this code-------------------------------------------------------------------------------------DONE
  /*For loop starting at 0 which loops through HEIGHT variable. The loop will continue creating table row
    elements and appending them to table row element until HEIGHT variable has reached 6. This is the maximum
    width we assigned on line 9.*/
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    /*Nested For loop starting at 0 which loops through WIDTH variable. The loop will continue creating table data
    elements and appending them to table row element until WIDTH variable has reached 7. This is the maximum
    width we assigned on line 8. This nested For loop will loop all 7 times for each iteration HEIGHT cell.*/
    for (let x = 0; x < WIDTH; x++) {
      //Creating table data element assigned to "cell" variable.
      const cell = document.createElement("td");
      //Assigning ID of the index assigned to variables "y" and "x" to newly created table data element. 
      cell.setAttribute("id", `${y}-${x}`);
      //Adding (appending) table data element/s to table row elemet/s.
      row.append(cell);
    }
    //Adding (appending) table row element/s and table data element/s to board variable.
    board.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0------------------------------------------------ DONE
  //For loop starting loop at HEIGHT - 1. As long as y is greater than or equal to 0 subtract 1 from HEIGHT to lowest available space in selected column.
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      //Return y (height) index from current iteration of loop.
      return y;
    }
  }
  //Return null if column is full, and no space is available to put piece.
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell------------------------------------------------------------------DONE
  // Creating div and assgning it to "piece" varable
  const piece = document.createElement('div');
  // Adding class of 'piece' to piece variabe. 
  piece.classList.add('piece');
  // Adding class of 'p1' or 'p2' to piece variable.
  piece.classList.add(`p${currPlayer}`);
  piece.style.top = -50 * (y + 2);
  // Creating spot variable and assigning it with value of cell cordinates for column and row axis slected. 
  const spot = document.getElementById(`${y}-${x}`);
  // Adding (appending) piece div to spot ${y}-${x}. 
  spot.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message-------------------------------------------------------------------------------------------DONE
  alert(msg);
}





/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board------------------------------------------------------------------------------DONE
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }
  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame------------------------------------------------DONE
  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }
  // switch players
  // TODO: switch currPlayer 1 <-> 2---------------------------------------------------------------------------------------DONE
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
    
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();