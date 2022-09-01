module.exports = {
  name: 'help',
  description: 'List of commands',
  execute(bot, channel, args, from, to, commandNames) {
    const offLimitsCommands = new Set(['randAdd', 'randInfo', 'randSelect', 'reload', 'restart']);
    const cleansedCommands = commandNames.filter(e => !offLimitsCommands.has(e));
    bot.say(channel, `List of commands: ${cleansedCommands.join(', ')}`)
  }
};
