module.exports = {
  name: 'draconic',
  description: 'English to Draconic translator',
  execute(bot, channel, args, from, to) {
    const SQLite = require("better-sqlite3");
    const fantasylang = new SQLite('./db/fantasylanguages.db');
    // Check if the table "fantasylanguages" exists.
    const table = fantasylang.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'fantasylanguages';").get();
    if (!table['count(*)']) {
      // If the table isn't there, create it and setup the database correctly.
      fantasylang.prepare("CREATE TABLE fantasylanguages (row INTEGER NOT NULL PRIMARY KEY, common TEXT, draconic TEXT, notes TEXT, author TEXT);").run();
      // Ensure that the "row" row is always unique and indexed.
      fantasylang.prepare("CREATE UNIQUE INDEX idx_fantasylanguages_row ON fantasylanguages (row);").run();
      fantasylang.pragma("synchronous = 1");
      fantasylang.pragma("journal_mode = wal");
    }
    args.shift();
    text = args.join(' ').toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");;
    let words = text.split(' ');
    let draconicPhrase = [];
    if (words.length < 1) {
    	bot.say(channel, 'What am I translating here?');
    } else {
    	for (c=0; c<words.length; c++) {
	   		//check for word mapping in DB, if found, add to draconicPhrase array
   			var dracWord = fantasylang.prepare(`SELECT * FROM draconic WHERE common = '${words[c]}';`).get();
   			if (dracWord){
				draconicPhrase.push(dracWord['draconic']);
			} else {
				draconicPhrase.push(words[c]);
			}
		}
		draconicPhrase = draconicPhrase.join(' ');
		bot.say(channel, draconicPhrase);
    }
  }
};
