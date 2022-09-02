module.exports = {
  name: 'restart',
  description: 'Restart the bot',
  execute(bot, channel, text, from, to) {

    exec('pm2 start irc-botster', (error, stdout, stderr) => {
      if (error) {
        console.log(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`StdErr: ${stderr}`);
        return;
      }
      console.log(`StdOut: ${stdout}`);
    })
  }
};
