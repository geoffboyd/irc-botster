// Tic Tac Toe globals
let playerIcon = "X";
let availableSquares = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
]

function drawBoard(bot, channel) {
  bot.say(channel, `  ${board[0][0]}  |  ${board[0][1]}  |  ${board[0][2]}  \n---------------\n  ${board[1][0]}  |  ${board[1][1]}  |  ${board[1][2]}  \n---------------\n  ${board[2][0]}  |  ${board[2][1]}  |  ${board[2][2]}  `)
}

function updateBoard(bot, channel, move) {
  if (availableSquares.includes(Number(move))) {
    switch(Number(move)){
      case 1:
        board[0][0] = playerIcon;
        break;
      case 2:
        board[0][1] = playerIcon;
        break;
      case 3:
        board[0][2] = playerIcon;
        break;
      case 4:
        board[1][0] = playerIcon;
        break;
      case 5:
        board[1][1] = playerIcon;
        break;
      case 6:
        board[1][2] = playerIcon;
        break;
      case 7:
        board[2][0] = playerIcon;
        break;
      case 8:
        board[2][1] = playerIcon;
        break;
      case 9:
        board[2][2] = playerIcon;
        break;
    }
    availableSquares.splice(availableSquares.indexOf(Number(move)), 1);
  } else {
    bot.say(channel, "That square has already been taken. Try again.")
    return
  }
  drawBoard(bot, channel);
  checkForWinner(bot, channel);
}

function checkForWinner(bot, channel) {
  for (let row in board) {
    if (board[row][0] && board[row][0] == board[row][1] && board[row][1] == board[row][2]){
      bot.say(channel, `${playerIcon} wins!!`);
      refreshBoard();
      return
    }
  }
  if( (board[0][0] && board[0][0] == board[1][0] && board[1][0] ==board[2][0]) || ( board[0][1] && board[0][1] == board[1][1] && board[1][1] ==board[2][1]) || ( board[0][2] && board[0][2] == board[1][2] && board[1][2] ==board[2][2]) || ( board[0][0] && board[0][0] == board[1][1] && board[1][1] ==board[2][2]) || (board[0][2] && board[0][2] == board[1][1] && board[1][1] ==board[2][0]) ) {
      bot.say(channel, `${playerIcon} wins!!`);
      refreshBoard();
      return
    }
  if (availableSquares.length < 1) {
    bot.say(channel, "It's a tie, resetting the board.")
    refreshBoard();
  }
  togglePlayer();
}

function togglePlayer() {
  if (playerIcon == "X") {
    playerIcon = "O";
  } else {
    playerIcon = "X";
  }
}

function refreshBoard(){
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ]
  playerIcon = "X";
  availableSquares = [1, 2, 3, 4, 5, 6, 7, 8, 9];
}

module.exports = {
  name: 'tictactoe',
  description: 'Play a friendly game of Tic Tac Toe',
  execute(bot, channel, args) {
    if (!args[1]) {
      drawBoard(bot, channel);
      return;
    }
    if (args[1].toLowerCase() === "reset") {
      refreshBoard();
      bot.say(channel, "Game board cleared.")
      return;
    }
    if (availableSquares.includes(Number(args[1]))) {
      updateBoard(bot, channel, args[1])
    } else {
      bot.say(channel, "That doesn't look like a legal move. Try again.");
      return;
    }
  }
};
