module.exports = {
  name: 'randAdd',
  description: 'Add something to the randomizer',
  execute(bot, channel, args, from, to) {
    const SQLite = require("better-sqlite3");
    const db = new SQLite('./db/userinputs.sqlite');
    const command = args[0].substring(1);
    const type =
      command === 'insultadd' ? 'insult'
      : command === '8badd' ? 'eightball'
      : command === 'fcadd' ? 'fortune'
      : 'insult';
    const response =
      command === 'insultadd' ? 'insult'
        : command === '8badd' ? 'Magic 8 Ball prediction'
        : command === 'fcadd' ? 'Fortune Cookie fortune'
        : 'insult';
    // Check if the table "userinputs" exists.
    const table = db.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'userinputs';").get();
    if (!table['count(*)']) {
      // If the table isn't there, create it and setup the database correctly.
      db.prepare('CREATE TABLE userinputs (row INTEGER NOT NULL PRIMARY KEY, user TEXT, channel TEXT, type TEXT, content TEXT, lastUsed DATETIME);').run();
      // Ensure that the "row" row is always unique and indexed.
      db.prepare('CREATE UNIQUE INDEX idx_userinputs_row ON userinputs (row);').run();
      db.pragma('synchronous = 1');
      db.pragma('journal_mode = wal');
    }
    let addInputs = db.prepare('INSERT INTO userinputs (user, channel, type, content, lastUsed) VALUES (@user, @channel, @type, @content, @lastUsed);');
    let date = Math.floor(new Date() / 1000);
    args.shift();
    newRand = args.join(' ');
    const randObject = { user: `${from}`, channel: `${channel}`, type: `${type}`, content: `${newRand}`, lastUsed: `${date}` };
    if (newRand.length > 0) {
      addInputs.run(randObject);
      bot.say(channel, `A new ${response} has been added!`);
    } else {
      bot.say(channel, `You need to tell me the ${response} to add!`);
    }
  }
};
