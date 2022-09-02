const randSelect = require('./randSelect.js');
module.exports = {
  name: 'fortune',
  description: 'Open a fortune cookie',
  execute(bot, channel, text, from, to) {
    randSelect.execute(bot, channel, text, from, to);
  },
};
