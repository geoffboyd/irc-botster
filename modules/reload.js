module.exports = {
	name: 'reload',
	description: 'Reloads a command',
	execute(bot, channel, text, from, to, commandNames) {
		let args = text.split(' ');
		const command = args[1].toLowerCase();

		if (!commandNames.includes(command)) {
			return bot.say(channel, `There is no command with name or alias \`${command}\`, ${from}!`);
		}

		delete require.cache[require.resolve(`./${command}.js`)];

		try {
			const newCommand = require(`./${command}.js`);
			bot.say(channel, `Command '${command}' was reloaded!`);
		} catch (error) {
			console.log(error);
			bot.say(channel, `There was an error while reloading a command '${command}':\n\`${error.message}\``);
		}
	},
};
