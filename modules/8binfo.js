const randInfo = require('./randInfo.js');
module.exports = {
  name: '8binfo',
  description: 'Get info about the most recent Magic Eightball Prediction',
  execute(bot, channel, text, from, to) {
    randInfo.execute(bot, channel, text, 'eightball')
  }
};
