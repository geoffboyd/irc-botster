module.exports = {
  name: 'randSelect',
  description: 'Select an item from the randomizer',
  execute(bot, channel, args, from, to) {
    // function originally wanted: channel(!), command(!), type(!), response(!), args(!), from(!)
    const SQLite = require("better-sqlite3");
    const db = new SQLite('./db/userinputs.sqlite');
    const command = args[0].substring(1);
    const type =
      command === 'insult' ? 'insult'
      : command === '8b' ? 'eightball'
      : command === 'fortune' ? 'fortune'
      : 'insult';
    const response =
      command === 'insult' ? 'insults'
        : '8b' ? 'Magic 8 Ball predictions'
        : 'fortune' ? 'Fortune Cookie fortunes'
        : 'insult';
    // Check if the table "userinputs" exists and has content from this channel or Global.
    const table = db.prepare(`SELECT count(*) FROM userinputs WHERE (channel = '${channel}' OR channel = 'Global') AND type = '${type}';`).get();
    if (!table['count(*)']) {
      sql.prepare('CREATE TABLE userinputs (row TEXT PRIMARY KEY, user TEXT, channel TEXT, type TEXT, content TEXT, lastUsed DATETIME, dateAdded DATETIME);').run();
      // Ensure that the "id" row is always unique and indexed.
      sql.prepare('CREATE UNIQUE INDEX idx_userinputs_row ON userinputs (row);').run();
      sql.pragma('synchronous = 1');
      sql.pragma('journal_mode = wal');
      return bot.say(channel, `I don't have any ${response} yet`);
    }
    let date = Math.floor(new Date() / 1000);
    const rawRand = db.prepare(`SELECT * FROM userinputs WHERE (channel = '${channel}' OR channel = 'Global') AND type='${type}' ORDER BY RANDOM() LIMIT 1;`).get();
    let rand = rawRand['content'];
    if (type === 'fortune' && (Math.floor(Math.random() * 10) == 1)) {
      rand += ' In bed!';
    }
    const randID = rawRand['row'];
    if (command === 'insult') {
      if (args[2]) {
        return bot.say(channel, 'Slow down there, pal. We only insult one person at a time around here.');
      }
      let target = args[1] ? args[1] : from;
      let insult = rand.includes('{}') ? rand.replace('{}', target) : `${target} ${rand}`;
      bot.say(channel, insult);
    } else {
      bot.say(channel, rand);
    }
    db.prepare('UPDATE userinputs SET lastUsed = ? WHERE row = ?').run(date,randID);
  }
};
