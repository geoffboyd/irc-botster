module.exports = {
  name: 'wiki',
  description: 'Wikipedia lookup',
  execute(bot, channel, text, from, to) {
    let args = text.split(' ');
    const wiki = require('wikijs').default;
    args.shift();
    text = args.join(' ');
    wiki()
        .page(text)
        .then(page =>
            page
                .chain()
                .summary()
                .request()
        ).then(response => {
          responseArray = response.extract.split('\n');
          post = responseArray[0];
          bot.say(channel, post)});
  }
};
