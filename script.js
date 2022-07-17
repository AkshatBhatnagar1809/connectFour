

const playerRed = 'R';
const playerYellow = 'Y';
let currPlayer = playerRed;

let gameOver = false;
let board;
let currColumns;

let rows = 6;
let columns = 7;

let player = document.getElementById("player");
let reset = document.getElementById("reset");

window.onload = function() {
    setGame();
    player.innerText = "Red's Turn!";
}

function setGame() {
    // this function initializes the game board

    board = [];
    currColumns = [5,5,5,5,5,5,5];

    for(let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // JS
            row.push(' ');

            // HTML
            // <div id="0-0" class="tile"></div> -> this line gets appended for each tile
            let tile = document.createElement('div');
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }


}

function setPiece() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-"); //0-0 -> ["0","0"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = currColumns[c];
    if (r < 0) {
        return;
    }
    

    board[r][c] = currPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        player.innerText = "Yellow's Turn!";
        currPlayer = playerYellow;
    }
    else {
        tile.classList.add("yellow-piece");
        player.innerText = "Red's Turn!";
        currPlayer = playerRed;
    }

    r = r - 1;  // updates row height
    currColumns[c] = r; // updates the array

    checkWinner();
}

function checkWinner() {

    // check horizontally
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if(board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r,c);
                    return;
                }
            }
        }
    }

    // check vertically
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if(board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setWinner(r,c);
                    return;
                }
            }
        }   
    }

    // check anti-diagonals
    for (let r = 0; r < rows-3; r++){
        for(let c = 0; c < columns - 3; c++) {
            if(board[r][c] != ' ') {
                if(board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r,c);
                    return;
                }
            }
        }
    }

    // check diagonals
    for (let r = 3; r < rows; r++) {
        for(let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if(board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r,c);
                    return;
                }
            }
        }
    }
}

function setWinner(r,c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerRed) {
        winner.innerText = "Red Wins!";
        player.innerText = " ";
    } else {
        winner.innerText = "Yellow Wins!"
        player.innerText = " ";
    }
    gameOver = true;
}

reset.addEventListener("click",resetGame);
function resetGame() {
    window.location.reload();
}
