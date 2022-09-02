const randInfo = require('./randInfo.js');
module.exports = {
  name: 'insultinfo',
  description: 'Get info about the most recent insult',
  execute(bot, channel, text, from, to) {
    randInfo.execute(bot, channel, text, 'insult')
  }
};
