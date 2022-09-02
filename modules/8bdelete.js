const randDelete = require('./randDelete.js');
module.exports = {
  name: '8bdelete',
  description: 'Delete a Magic Eightball Prediction',
  execute(bot, channel, text, from, to) {
    randDelete.execute(bot, channel, text, 'eightball')
  }
};
