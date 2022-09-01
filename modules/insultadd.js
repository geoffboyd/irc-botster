const randAdd = require('./randAdd.js');
module.exports = {
  name: 'insultadd',
  description: 'Add a new insult',
  execute(bot, channel, args, from, to) {
    randAdd.execute(bot, channel, args, from, to);
  },
};
