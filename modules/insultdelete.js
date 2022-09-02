const randDelete = require('./randDelete.js');
module.exports = {
  name: 'insultdelete',
  description: 'Delete an insult',
  execute(bot, channel, text, from, to) {
    randDelete.execute(bot, channel, text, 'insult')
  }
};
