const randAdd = require('./randAdd.js');
module.exports = {
  name: 'insultadd',
  description: 'Add a new insult',
  execute(bot, channel, text, from, to) {
    randAdd.execute(bot, channel, text, from, to);
  },
};
