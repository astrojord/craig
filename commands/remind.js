module.exports = {
	name: 'remind',
	description: 'Sets a reminder for yourself -- the bot will ping you with your reminder after the specified time.',
	aliases: ['remind'],
	usage: '+remind [time] [unit s/m/h/d] [reminder message]',
	cooldown: 5,
	execute(message, args) {
		const Discord = require("discord.js");
        const Math = require("mathjs");
        const Enmap = require("enmap");
        const fetch = require('node-fetch');
		
		const n = args[0];
        var r = args.slice(2).join(" ");;
        function reminder() {
            message.channel.send(`${message.author}: ` + r);
        }
        switch(args[1]) {
            case 's': {
                var msDelay = n * 1000;
                message.channel.send("Reminder set (" + n + " seconds).");
                setTimeout(reminder, msDelay);
                break;
            }
            case 'm': {
                var msDelay = n * 60000;
                message.channel.send("Reminder set (" + n + " minutes).");
                setTimeout(reminder, msDelay);
                break;
            }
            case 'h': {
                var msDelay = n * 3600000;
                message.channel.send("Reminder set (" + n + " hours).");
                setTimeout(reminder, msDelay);
                break;
            }
            case 'd': {
                var msDelay = n * 86400000;
                message.channel.send("Reminder set (" + n + " days).");
                setTimeout(reminder, msDelay);
                break;
            }
        }
	},
};