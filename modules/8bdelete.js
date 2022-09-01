const randDelete = require('./randDelete.js');
module.exports = {
  name: '8bdelete',
  description: 'Delete a Magic Eightball Prediction',
  execute(bot, channel, args, from, to) {
    randDelete.execute(bot, channel, args, 'eightball')
  }
};
