const randSelect = require('./randSelect.js');
module.exports = {
  name: 'insult',
  description: 'Insult someone',
  execute(bot, channel, text, from, to) {
    randSelect.execute(bot, channel, text, from, to);
  },
};
