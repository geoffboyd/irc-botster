module.exports = {
  name: 'quote',
  description: 'Seach chat history for a quote',
  execute(bot, channel, args, from, to) {
    const SQLite = require("better-sqlite3");
    const db = new SQLite('./db/userinputs.sqlite');
    args.shift();
    let quote = args.join(' ');
    let search = db.prepare(`SELECT * FROM chats WHERE (channel = '${channel}' AND content LIKE '%${quote}%') ORDER BY RANDOM() LIMIT 1;`).get();
    let selectedQuote = search ? search['content'] : false;
    let selectedQuoteUser = search ? search['user'] : false;
    if (!selectedQuote) { return bot.say(channel, "I can't find that quote") }
    bot.say(channel, `${selectedQuoteUser}: ${selectedQuote}`);
  }
};
