const randDelete = require('./randDelete.js');
module.exports = {
  name: 'fcdelete',
  description: 'Delete a Fortune Cookie',
  execute(bot, channel, args, from, to) {
    randDelete.execute(bot, channel, args, 'fortune')
  }
};
