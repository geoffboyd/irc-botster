const randDelete = require('./randDelete.js');
module.exports = {
  name: 'fcdelete',
  description: 'Delete a Fortune Cookie',
  execute(bot, channel, text, from, to) {
    randDelete.execute(bot, channel, text, 'fortune')
  }
};
