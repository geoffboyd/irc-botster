// IRC botster v1.0rc

/*
  To Do:
    TicTacToe needs to be moved to a module
*/

console.log('\x1b[32m%s\x1b[0m', 'Starting the botster IRC client...');

// Set up our globals
const irc = require('irc');
const fs = require('fs');
const { exec } = require('child_process');
const { channels, server, botName, prefix } = require('./conf/config.json');
const bot = new irc.Client(server, botName, {channels: channels});
const SQLite = require("better-sqlite3");
const db = new SQLite('./db/userinputs.sqlite');
const MarkovChain = require('markovchain');
const translate = require('@iamtraction/google-translate');
const commandFiles = fs.readdirSync('./modules/').filter(file => file.endsWith('.js'));

let commandNames = [];
for (const file of commandFiles) {
  const command = require(`./modules/${file}`);
  commandNames.push(file.replace('.js', ''));
}

let args = [];

// Tic Tac Toe globals
let playerIcon = "X";
let availableSquares = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
]

console.log('\x1b[32m%s\x1b[0m', `Signed in to IRC as ${botName}.`);

// Listen for joins
bot.addListener("join", function(channel, name) {
  let thisCommand = require(`./modules/fortune.js`);
  return thisCommand.execute(bot, channel, [' fortune'], name,  '');
});

// Listen for kicks
bot.addListener("kick", function(channel, name) {
  let thisCommand = require(`./modules/insult.js`);
  return thisCommand.execute(bot, channel, ' ', name, ' ');
});

// Listen for messages
bot.addListener("message", function(from, to, text, message) {
  const channel = message.args[0];


// This is gross as fuck so I'm separating it from everything else until I come up with a better way to break it into a module
  if (text.toLowerCase().startsWith('tictactoe')) { ticTacToe(channel, text.split(' ')) }


  // Markov chain
  let wordSalad = new MarkovChain(db.prepare(`SELECT content FROM chats WHERE channel = '${channel}' ORDER BY RANDOM();`).pluck().all().join(' '));
  const triggerWords = [botName.toLowerCase(), 'audio', 'tech', 'excuse'];
  const randomFuckery = Math.ceil(Math.random()*30);

  // We don't respond to bot posts. Susie is the other bot that lives in botster's normal home channel
  if (from === botName || from === "Susie") { return };

  // If the text doesn't start with a prefix, it's not a command, we should just log what we see and then be quiet (Unless botName is invoked or randomFuckery has something to say about it...)
  if (!text.startsWith(prefix)){
    // write text and from to the database
    chatLog(channel, text, from);
    if (randomFuckery !== 10 && !triggerWords.some(e => text.toLowerCase().includes(e))) { return };
  }

  if (text.toLowerCase().includes(botName.toLowerCase()) || randomFuckery === 10) {
    //Markov chain triggers here
    let args = text.split(' ');
    let startWord = from;
    let phraseLength = (Math.ceil(Math.random()*((args.length + 10)*2)));
    if (args[1]) {
      if (args[1].toLowerCase().includes(botName.toLowerCase())) {
        startWord = args[0];
      } else {
        startWord = args[Math.floor(Math.random()*args.length)];
      }
    }

    let phrase = wordSalad.start(startWord).end(phraseLength).process();
    let firstLetter = phrase.slice(0, 1);
    firstLetter = firstLetter.toUpperCase();
    let restOfPhrase = phrase.slice(1, phrase.length);
    phrase = firstLetter + restOfPhrase;
    while (phrase.endsWith('?') || phrase.endsWith('.') || phrase.endsWith('!') || phrase.endsWith('"') || phrase.endsWith(',')) {
      phrase = phrase.slice(0, -1);
    }
    const punct = ['.','?','!']
    return bot.say(channel, phrase+punct[Math.floor(Math.random()*punct.length)]);
  }

  if (text.includes('audio') || text.includes('tech') || text.includes('excuse')) {
    let thisCommand = require(`./modules/jargon.js`);
    return thisCommand.execute(bot, channel, text.split(' '), from, to);
  }

  args = text.trim().toLowerCase().split(' ');
  let commandAttempt = args[0].substring(1);
  if (!commandNames.includes(commandAttempt)){ return console.log('\x1b[31m%s\x1b[0m', `${from} attempted to use a command that doesn't exist: ${commandAttempt}`) }
  const commandToRun = require(`./modules/${commandAttempt}.js`);
/*
  if (commandAttempt === 'tictactoe') { commandToRun.execute(bot, channel, args, playerIcon, availableSquares, board); }
  else { commandToRun.execute(bot, channel, args, from, to, commandNames); }
*/
  commandToRun.execute(bot, channel, args, from, to, commandNames);
});

// Add conversation to the Markov chain catalog
function chatLog(channel, text, from) {
    // Check if the table "chats" exists.
    const table = db.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'chats';").get();
    if (!table['count(*)']) {
      // If the table isn't there, create it and setup the database correctly.
      db.prepare('CREATE TABLE chats (row INTEGER NOT NULL PRIMARY KEY, user TEXT, channel TEXT, content TEXT, dateAdded DATETIME);').run();
      // Ensure that the "row" row is always unique and indexed.
      db.prepare('CREATE UNIQUE INDEX idx_chatalog_row ON chatalog (row);').run();
      db.pragma('synchronous = 1');
      db.pragma('journal_mode = wal');
    }
    let addInputs = db.prepare('INSERT INTO chats (user, channel, content, dateAdded) VALUES (@user, @channel, @content, @dateAdded);');
    let date = Math.floor(new Date() / 1000);
    const chatalogObject = { user: `${from}`, channel: `${channel}`, content: `${text}`, dateAdded: `${date}` };
    addInputs.run(chatalogObject);
}

// ------------- Beginning of Tic Tac Toe functions ------------- //
function ticTacToe(channel, args) {
  if (!args[1]) {
    drawBoard(channel);
    return;
  }
  if (args[1].toLowerCase() === "reset") {
    refreshBoard();
    bot.say(channel, "Game board cleared.")
    return;
  }
  if (availableSquares.includes(Number(args[1]))) {
    updateBoard(channel, args[1])
  } else {
    bot.say(channel, "That doesn't look like a legal move. Try again.");
    return;
  }
}

function drawBoard(channel) {
  bot.say(channel, `  ${board[0][0]}  |  ${board[0][1]}  |  ${board[0][2]}  \n---------------\n  ${board[1][0]}  |  ${board[1][1]}  |  ${board[1][2]}  \n---------------\n  ${board[2][0]}  |  ${board[2][1]}  |  ${board[2][2]}  `)
}

function updateBoard(channel, move) {
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
  drawBoard(channel);
  checkForWinner(channel);
}

function checkForWinner(channel) {
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

// ------------- End of Tic Tac Toe functions ------------- //
