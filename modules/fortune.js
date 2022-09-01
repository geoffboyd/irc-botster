const randSelect = require('./randSelect.js');
module.exports = {
  name: 'fortune',
  description: 'Open a fortune cookie',
  execute(bot, channel, args, from, to) {
    randSelect.execute(bot, channel, args, from, to);
  },
};
