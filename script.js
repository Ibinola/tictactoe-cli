
// BOARD
function new_board() {
    return [[null, null, null], [null, null, null], [null, null, null]]
}

console.log(new_board())

const board = new_board();
// console.log(board); // prints the board

// RENDER the board to the terminal 
// TODO: render function


//get_move
function get_move() {
    const player1 = prompt("Player1: What is your move ?")

    const player2 = prompt("Player2: What is your move ?")

    return [player1, player2];
}

// const move_board = get_move()

// console.log(move_board);


// make_move (board, [move_board], 'O')