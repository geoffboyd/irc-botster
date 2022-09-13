```
 _           _       _             
| |         | |     | |           
| |__   ___ | |_ ___| |_ ___ _ __
| '_ \ / _ \| __/ __| __/ _ \ '__|
| |_) | (_) | |_\__ \ ||  __/ |   
|_.__/ \___/ \__|___/\__\___|_|   

```                                
# irc-botster v1.0
Chatbot for IRC

## Commands and usage
The default prefix to send a bot command is `.`. You can change that in `./conf/ircConfig.jason` to instead use whatever character you choose. I'm going to use `.` below for my notation, but replace that with whatever you choose for your instance.
- `.8b` - Asks a Magic Eightball for guidance. Feed it a yes or no question, or just think your question. It knows all.
- `.8badd [new eightball prediction]` - Feed the Magic Eightball with new replies. Try using links to GIFs, too!
- `.8binfo` - Tells you who added the most recently seen 8ball prediction, the database row it is saved on, and when it was added.
- `.8bdelete [row number]` - When you use any of the info commands (8ballinfo, fcinfo, insultinfo), they tell you the database row that the response is stored in. You can remove responses by using this command. Doesn't work for responses labeled "Global".
- `.collatz [number]` - Solves the [Collatz Conjecture](https://en.wikipedia.org/wiki/Collatz_conjecture) for a given number.
- `.draconic` - Translate text from English into Draconic.
- `.fortune` - Open a fortune cookie, see your fortune.
- `.fcadd` - Add new fortunes for future fortune cookies.
- `.fcinfo` - Tells you who added the most recently seen fortune, the database row it is saved on, and when it was added.
- `.fcdelete [row number]` - When you use any of the info commands (8ballinfo, fcinfo, insultinfo), they tell you the database row that the response is stored in. You can remove responses by using this command. Doesn't work for responses labeled "Global".
- `.help` - Shows a helpful list of commands.
- `.insult [optional: tag a target]` - Insults either you or the person you target.
- `.insultadd` - Add new insults. By default, the insult target will be the first word.
  - To include the target's name elsewhere, use `{}` in the place you want their name to appear.
  - Example: `.insultadd You know when {} shows up to the party, it's time to leave.`
- `.insultinfo` - Tells you who added the most recently seen insult, the database row it is saved on, and when it was added.
- `.insultdelete [row number]` - When you use any of the info commands (8ballinfo, fcinfo, insultinfo), they tell you the database row that the response is stored in. You can remove responses by using this command. Doesn't work for responses labeled "Global".
- `.josephus [number] [skips]` - Solves the [Josephus Problem](https://en.wikipedia.org/wiki/Josephus_problem) for a given number. Optionally change the number of skips between eliminations.
- `.quote [words to search]` - Search the chatlog for a quote.
- `.reload` - For the person running the bot, use this to reload commands instead of restarting the bot entirely.
- `.restart` - For the person running the bot, sometimes you just need to restart it. This command does that. If you make changes to `./discord-botster.js`, this command will restart the bot and bring in the changes you made. MUST BE USING PM2 FOR THIS TO COMPLETE RESTARTING, otherwise it will just stop and you'll have to restart manually.
- `.roll` - Rolls a 6-sided die by default. If you add a number to the command, like `.roll 20`, it rolls a die with the specified number of sides. `.roll 3d8`, `.roll 2d4 +4`, `.roll 2d20 adv`, `.roll 2d20 dis` all also work for more dice, modifiers, and/or advantage/disadvantage.
- `.slap [someone]` - Slap someone around a little bit.
- `.tictactoe` - Play a game of Tic Tac Toe.
- `.ud [word or phrase]` - Look something up on Urban Dictionary
- `.wiki [word or phrase]` - Look something up on Wikipedia
- `.w [word or phrase]` - Look something up on Wikipedia (shortcut for `.wiki`)
- `.wookiee` - Translate text into Wookiee.

## License

MIT License

Copyright (c) 2022 Geoff Boyd

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Also, all glory to Hypnotoad.
