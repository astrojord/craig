module.exports = {
	name: 'ping',
	description: 'Gets current Discord API latency.',
	//aliases: ['commands'],
	usage: '+ping',
	cooldown: 5,
	execute(message, args) {
		const Discord = require("discord.js");
        const Math = require("mathjs");
        const Enmap = require("enmap");
        const fetch = require('node-fetch');
        message.channel.send(`**API Latency:** ${new Date().getTime() - message.createdTimestamp} ms`);
	},
};