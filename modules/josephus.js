module.exports = {
  name: 'josephus',
  description: 'A solver for the Josephus Problem',
  execute(bot, channel, args, from, to) {
    let n = NaN;
    let skips = 1;
    let numberArray = [];

    if (!args[1] || args[3]) {
      return bot.say(channel, 'Usage: .josephus [number of people] [number of skips (optional)]');
    } else if (!Number(args[1]) || (args[2] && !Number(args[2]))) {
      return bot.say(channel, "You didn't input a number greater than 0.");
    } else if ( Number(args[1]) != Math.floor(Number(args[1])) || (args[2] && (Number(args[2]) != Math.floor(Number(args[2])))) ) {
      return bot.say(channel, "You didn't input a natural number. Natural numbers are 1, 2, 3, etc.");
    } else {
      n = Math.abs(Number(args[1])) + 1;
      if (args[2] > 1) { skips = Number(args[2]);}
    }

    for (initialCounter = 1; initialCounter < n; initialCounter++ ) {
      numberArray.push(initialCounter);
    }

    while (numberArray.length > 1) {
      numberArray.push(numberArray.shift());
      if (skips > 1){
        for (skipsCounter = 1; skipsCounter < skips; skipsCounter++){
          numberArray.push(numberArray.shift());
        }
      }
      numberArray.splice(0,1);
    }
    bot.say(channel, `The survivor is Person #${numberArray}`);
  }
};
