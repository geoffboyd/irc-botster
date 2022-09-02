module.exports = {
  name: 'help',
  description: 'List of commands',
  execute(bot, channel, text, from, to, commandNames) {
    const offLimitsCommands = new Set(['getContent', 'randAdd', 'randDelete', 'randInfo', 'randSelect', 'reload', 'restart']);
    const cleansedCommands = commandNames.filter(e => !offLimitsCommands.has(e));
    bot.say(channel, `List of commands: ${cleansedCommands.join(', ')}`)
  }
};
