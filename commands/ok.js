module.exports = {
	name: 'ok',
	description: 'ok',
	aliases: ['ok'],
	usage: 'ok',
	cooldown: 5,
	execute(message, args) {
		const Discord = require("discord.js");
        const Math = require("mathjs");
        const Enmap = require("enmap");
        const fetch = require('node-fetch');
		
		message.channel.send("https://i.imgur.com/lp2UDip.png");
	},
};