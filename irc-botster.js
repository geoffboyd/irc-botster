/*
 _           _       _
| |         | |     | |
| |__   ___ | |_ ___| |_ ___ _ __
| '_ \ / _ \| __/ __| __/ _ \ '__|
| |_) | (_) | |_\__ \ ||  __/ |
|_.__/ \___/ \__|___/\__\___|_|

IRC botster v1.0
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

console.log('\x1b[32m%s\x1b[0m', `Signed in to IRC as ${botName}.`);

// Listen for joins
bot.addListener("join", function(channel, name) {
  let thisCommand = require(`./modules/fortune.js`);
  return thisCommand.execute(bot, channel, '.fortune for me', name,  '');
});

// Listen for kicks
bot.addListener("kick", function(channel, name) {
  let thisCommand = require(`./modules/insult.js`);
  return thisCommand.execute(bot, channel, ' ', name, ' ');
});

// Listen for messages
bot.addListener("message", function(from, to, text, message) {
  const channel = message.args[0];

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

  if (!text.startsWith(prefix) && (text.toLowerCase().includes(botName.toLowerCase()) || randomFuckery === 10)) {
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

  lowerCaseArgs = text.trim().toLowerCase().split(' ');
  let commandAttempt = lowerCaseArgs[0].substring(1);
  if (!commandNames.includes(commandAttempt)){ return console.log('\x1b[31m%s\x1b[0m', `${from} attempted to use a command that doesn't exist: ${commandAttempt}`) }
  const commandToRun = require(`./modules/${commandAttempt}.js`);

  // Are we playing TicTacToe, or using one of the more generic functions?
  if (commandAttempt === 'tictactoe') { commandToRun.execute(bot, channel, args); }
  else { commandToRun.execute(bot, channel, text, from, to, commandNames); }
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
