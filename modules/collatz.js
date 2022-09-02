module.exports = {
  name: 'collatz',
  description: 'A solver for the Collatz conjecture',
  execute(bot, channel, text, from, to) {
    let args = text.split(' ');
    let n = NaN;
  	let numberArray = [];

  	if (!args[1] || args[2]) {
  	  return bot.say(channel, 'Usage: .collatz [natural number to test]');
  	} else if ( (!Number(args[1])) || ( Number(args[1]) != Math.floor(Number(args[1])))) {
  	  return bot.say(channel, "You didn't input a natural number.");
    } else if (Number(args[1] > 9007199254740990)){
      return bot.say(channel, "That's too big-brain for me. Try a smaller number.");
  	} else {
  	  n = Number(args[1]);
  	  numberArray.push(n);
    };
  	while (n != 1) {
  	  // First test if the number is odd or even and decide the rule to apply
  	  if (testEven(n)) {
  	    // Even number, divide by 2
  	    n = n/2;
  	  } else {
  	    // Odd number, multiply by 3 and add 1
  	    n = (3*n)+1;
  	  }
  	  numberArray.push(n);
  	};

  	bot.say(channel, 'Number of steps: ' + numberArray.length);
  	bot.say(channel, "Your number's journey: " + numberArray.join(" "));

  	function testEven(num) {
  	  if (num % 2 == 0) {
  	    return true;
  	  } else {
  	    return false;
  	  }
    }
  }
};
