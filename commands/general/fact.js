const { Command } = require('discord-akairo');

class FactCommand extends Command {
    constructor() {
        super('fact', {
            aliases: ['fact']
        });
    }

    async exec(message) {
        const https = require('https');

        https.get('https://uselessfacts.jsph.pl/today.json?language=en', res => {
            let data = [];
            const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
            console.log('Status Code:', res.statusCode);
            console.log('Date in Response header:', headerDate);
          
            res.on('data', chunk => {
              data.push(chunk);
            });
          
            res.on('end', () => {
              console.log('Response ended: ');
              const fact = JSON.parse(Buffer.concat(data).toString());
          
              console.log(fact);

              return message.channel.send(fact.text);
            });
        });
    }
}

module.exports = FactCommand;