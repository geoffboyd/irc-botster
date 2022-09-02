module.exports = {
  name: 'ud',
  description: 'Urban Dictionary lookup',
  execute(bot, channel, text, from, to) {
    let args = text.split(' ');
    const ud = require('urban-dictionary');
    const wiki = require('wikijs').default;
    args.shift();
    text = args.join(' ');
    ud.define(text, (error, results) => {
      if (error) {
        bot.say(channel, 'Oops, something went wrong');
        return
      }
      bot.say(channel, Object.entries(results[0])[0][1]);
    })
  }
};
