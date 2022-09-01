module.exports = {
  name: 'dice',
  description: 'Roll a virtual die',
  execute(bot, channel, args, from, to) {
    if (!args[1]) { args[1] = 6 }
    if (Math.abs(Number(args[1])) > 1000) { return bot.say(channel, 'Max number of sides is 1000') }
    if (Number(args[1]) === NaN) { return bot.say(channel, `Usage: ${prefix}dice [number of sides (optional)]`) }
    bot.say(channel, 'You rolled a ' + Math.ceil(Math.random()*Math.abs(args[1])) + '.');
  }
};
