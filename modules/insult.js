const randSelect = require('./randSelect.js');
module.exports = {
  name: 'insult',
  description: 'Insult someone',
  execute(bot, channel, args, from, to) {
    randSelect.execute(bot, channel, args, from, to);
  },
};
