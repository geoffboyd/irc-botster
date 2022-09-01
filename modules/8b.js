const randSelect = require('./randSelect.js');
module.exports = {
  name: '8b',
  description: 'Ask the Magic Eightball',
  execute(bot, channel, args, from, to) {
    randSelect.execute(bot, channel, args, from, to);
  },
};
