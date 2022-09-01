module.exports = {
  name: 'randDelete',
  description: 'Delete an item from the randomizer by row ID number',
  execute(bot, channel, args, type) {
    const SQLite = require("better-sqlite3");
    const db = new SQLite('/home/pi/botster/userinputs.sqlite');
    // Check if the table "userinputs" exists.
    const table = db.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'userinputs';").get();
    if (!table['count(*)']) {
      // If the table isn't there, create it and setup the database correctly.
      db.prepare("CREATE TABLE userinputs (row INTEGER NOT NULL PRIMARY KEY, user TEXT, channel TEXT, type TEXT, content TEXT, lastUsed DATETIME, dateAdded DATETIME);").run();
      // Ensure that the "row" row is always unique and indexed.
      db.prepare("CREATE UNIQUE INDEX idx_userinputs_row ON userinputs (row);").run();
      db.pragma("synchronous = 1");
      db.pragma("journal_mode = wal");
    }
    if (isNaN(args[1])) {
      bot.say(channel, "You didn't enter an ID number");
    } else {
      const item = db.prepare("SELECT * FROM userinputs WHERE row = ?;").get(args[1]);
      if (item.channel === channel) {
        db.prepare("DELETE FROM userinputs WHERE row = ?").run(args[1]);
        bot.say(channel, 'Item deleted!');
      } else {
        bot.say(channel, "I can't delete that. You selected an item from a different chat.");
      }
    }
  }
};
