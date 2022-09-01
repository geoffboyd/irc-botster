module.exports = {
    name: 'wookiee',
    description: 'Translate text into Wookiee',
    execute(bot, channel, args, from, to) {
      args.shift();
    	let charCodes=new Array(55);
  		charCodes["a"]="ra";
  		charCodes["b"]="rh";
  		charCodes["c"]="oa";
  		charCodes["d"]="wa";
  		charCodes["e"]="wo";
  		charCodes["f"]="ww";
  		charCodes["g"]="rr";
  		charCodes["h"]="ac";
  		charCodes["i"]="ah";
  		charCodes["j"]="sh";
  		charCodes["k"]="or";
  		charCodes["l"]="an";
  		charCodes["m"]="sc";
  		charCodes["n"]="wh";
  		charCodes["o"]="oo";
  		charCodes["p"]="ak";
  		charCodes["q"]="rq";
  		charCodes["r"]="rc";
  		charCodes["s"]="c";
  		charCodes["t"]="ao";
  		charCodes["u"]="hu";
  		charCodes["v"]="ho";
  		charCodes["w"]="oh";
  		charCodes["x"]="k";
  		charCodes["y"]="ro";
  		charCodes["z"]="uf";
  		charCodes["1"]="1";
  		charCodes["2"]="2";
  		charCodes["3"]="3";
  		charCodes["4"]="4";
  		charCodes["5"]="5";
  		charCodes["6"]="6";
  		charCodes["7"]="7";
  		charCodes["8"]="8";
  		charCodes["9"]="9";
  		charCodes["0"]="0";
  		charCodes[" "]=" ";
  		charCodes["\n"]="\n";
  		charCodes["!"]="!";
  		charCodes["?"]="?";
  		charCodes["."]=".";
  		charCodes[","]=",";
  		charCodes["'"]="'";
  		charCodes["-"]="-";
  		charCodes[":"]=":";
  		charCodes["("]="(";
  		charCodes[")"]=")";
  		charCodes["é"]="wo";
  		charCodes["à"]="ra";
  		charCodes["è"]="wo";
  		charCodes["ê"]="wo";
  		charCodes["ù"]="hu";
  		charCodes["û"]="hu";
  		charCodes["î"]="ah";
  		charCodes["ç"]="oa";
  		let wookieeSpeak=''
  		let personSpeak = args.join(' ').toLowerCase();
  		let chars = personSpeak.split('');
  		for (a=0; a<chars.length; a++) {
  			if (charCodes[chars[a]]) {
  				wookieeSpeak += charCodes[chars[a]];
  			} else {
  				wookieeSpeak += '';
  			};
  		};
  		if (wookieeSpeak) {
  			bot.say(channel, wookieeSpeak);
  		} else {
  			bot.say(channel, 'You need to tell me what to translate.');
  		}
    }
  };
