const randAdd = require('./randAdd.js');
module.exports = {
  name: 'fcadd',
  description: 'Add a new fortune cookie',
  execute(bot, channel, text, from, to) {
    randAdd.execute(bot, channel, text, from, to);
  },
};
