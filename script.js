// Create a new empty board
function newBoard() {
    return [[null, null, null], [null, null, null], [null, null, null]];
}

// Place a player's marker on the board at the specified coordinates
function makeMove(board, row, col, player) {
    board[row][col] = player;
}

// Check if the board is full
function isBoardFull(board) {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === null) {
                return false;
            }
        }
    }
    return true;
}

// Print the current state of the board to the console
function render(board) {
    console.log(board.map(row => row.map(cell => cell || ' ').join('|')).join('\n' + '-'.repeat(5) + '\n'));
}

// Get the move coordinates from the player
function getMove() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        readline.question('Enter your move (row, column): ', input => {
            const move = input.trim().split(',');
            readline.close();
            resolve([parseInt(move[0]), parseInt(move[1])]);
        });
    });
}

// Check if there's a winner
function getWinner(board) {
    // Check rows for winner
    for (let row = 0; row < 3; row++) {
        if (board[row][0] === board[row][1] && board[row][1] === board[row][2] && board[row][0] !== null) {
            return board[row][0];
        }
    }

    // Check columns for winner
    for (let col = 0; col < 3; col++) {
        if (board[0][col] === board[1][col] && board[1][col] === board[2][col] && board[0][col] !== null) {
            return board[0][col];
        }
    }

    // Check diagonals for winner
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== null) {
        return board[0][0];
    }

    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== null) {
        return board[0][2];
    }

    // If no winner found, return null
    return null;
}

// Play a game of Tic Tac Toe
async function playGame() {
    let board = newBoard();
    let currentPlayer = 'X';

    while (true) {
        render(board);

        // Get the player's move
        console.log(`Player ${currentPlayer}'s turn`);
        const [row, col] = await getMove();

        // Make the move
        makeMove(board, row, col, currentPlayer);

        // Check for a winner
        const winner = getWinner(board);
        if (winner !== null) {
            render(board);
            console.log(`Player ${winner} wins!`);
            break;
        }

        // Check if the board
        if (isBoardFull(board)) {
            render(board);
            console.log("It's a tie!");
            break;
        }

        // Switch to the other player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Start a new game
playGame();