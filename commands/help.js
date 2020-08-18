module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '+help',
	cooldown: 5,
	execute(message, args) {
		const Discord = require("discord.js");
        const Math = require("mathjs");
        const Enmap = require("enmap");
        const fetch = require('node-fetch');
		//message.channel.send("get fucked");
		if (args.length === 0){
			const e = new Discord.MessageEmbed()
				.setColor(0xDC143C)
				.setTimestamp()
				.setFooter(`⚠ Some commands may require extra arguments. Use +help [name] to show full information.`) // do +command name to show extra info
			message.channel.send(e);
			return;
		}

		if (args[0].toLowerCase() == `youtube` || args[0].toLowerCase() == `yt`){
			const e = new Discord.MessageEmbed()
				.setColor(0xDC143C)
				.setTimestamp()
				.addField(`**Information for \`youtube\`:**`, `Returns the top YouTube search result for a specified term/phrase.`)
				.addField(`Aliases:`,`\`\`\`yt\`\`\``)
				.addField(`Usage:`,`\`\`\`+youtube [search term]\`\`\``)
				.addField(`Example:`,`\`\`\`+youtube test video please do not watch\`\`\``)
			message.channel.send(e);
			return;
		}

		if (args[0].toLowerCase() == `remind`){
			const e = new Discord.MessageEmbed()
				.setColor(0xDC143C)
				.setTimestamp()
				.addField(`**Information for \`remind\`:**`, `Sets a reminder for yourself -- the bot will ping you with your reminder after the specified time.`)
				.addField(`Usage:`,`\`\`\`+remind [time] [unit s/m/h/d] [reminder message]\`\`\``)
				.addField(`Example:`,`\`\`\`+remind 1 h text mom back\`\`\``)
			message.channel.send(e);
			return;
		}

		else{
			message.channel.send("That command does not exist for this bot.");
		}
	},
};