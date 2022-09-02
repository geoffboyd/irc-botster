const randAdd = require('./randAdd.js');
module.exports = {
  name: '8badd',
  description: 'Add a new Magic Eightball response',
  execute(bot, channel, text, from, to) {
    randAdd.execute(bot, channel, text, from, to);
  },
};
