const randSelect = require('./randSelect.js');
module.exports = {
  name: '8b',
  description: 'Ask the Magic Eightball',
  execute(bot, channel, text, from, to) {
    randSelect.execute(bot, channel, text, from, to);
  },
};
