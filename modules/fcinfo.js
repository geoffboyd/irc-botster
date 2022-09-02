const randInfo = require('./randInfo.js');
module.exports = {
  name: 'fcinfo',
  description: 'Get info about the most recent Fortune Cookie Fortune',
  execute(bot, channel, text, from, to) {
    randInfo.execute(bot, channel, text, 'fortune')
  }
};
