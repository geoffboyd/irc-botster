module.exports = {
  getcontent(bot, channel, args, from, to) {
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
    // Check if the table "userinputs" exists and has content from this channel.
    const table = db.prepare(`SELECT count(*) FROM userinputs WHERE (channel = ${channel} OR channel = 'Global') AND type = '${type}';`).get();
    if (!table['count(*)']) {
      return bot.say("I don't have any insults yet");
    }
    let date = Math.floor(new Date() / 1000);
    const rawResult = db.prepare(`SELECT * FROM userinputs WHERE type = '${type}' AND (channel = ${channel} OR channel = 'Global') ORDER BY RANDOM() LIMIT 1;`).get();
    const content = rawResult['content'];
    const contentID = rawResult['row'];
     if (type === 'insult') {
      if (args[0]) {
        let target = args[0];
      } else {
        let target = from;
      }
      if (content.includes('{}')) {
        let finalInsult = content.replace('{}', target);
      } else {
        let finalInsult = target + ' ' + content;
      }
      bot.say(channel, finalInsult);
    } else {
      bot.say(channel, content);
    }
    db.prepare('UPDATE userinputs SET lastUsed = ? WHERE row = ?').run(date,contentID);
  }
}
