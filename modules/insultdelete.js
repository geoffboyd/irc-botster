const randDelete = require('./randDelete.js');
module.exports = {
  name: 'insultdelete',
  description: 'Delete an insult',
  execute(bot, channel, args, from, to) {
    randDelete.execute(bot, channel, args, 'insult')
  }
};
