module.exports = {
  // This needs to be moved to sqlite3 along with the rest of the randomizer stuff
  name: 'slap',
  description: 'Give a friend a hearty slap',
  execute(bot, channel, text, from, to) {
    let args = text.split(' ');
    const slaps = [`You slap ${args[1]} around a bit with a large trout`,
                   `You slap ${args[1]} with a large smelly trout`,
                   `You break out the slapping rod and look sternly at ${args[1]}`,
                   `You slap ${args[1]}'s bottom and grin cheekily`,
                   `You slap ${args[1]} a few times`,
                   `You slap ${args[1]} and start getting carried away`,
                   `You would slap ${args[1]}, but you are not being violent today`,
                   `You give ${args[1]} a hearty slap`,
                   `You find the closest large object and give ${args[1]} a slap with it`,
                   `You like slapping people and randomly pick ${args[1]} to slap`,
                   `You dust off a kitchen towel and slap it at ${args[1]}`];
    if (!args[1]) { return 'You need to tell me who you are slapping' }
    if (args[2]) { return "Slow down, pal. Let's slap one person at a time, alright?" }
    return bot.say(channel, slaps[Math.ceil(Math.random()*slaps.length)]);
  }
};
