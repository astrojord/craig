module.exports = {
	name: 'h',
	description: 'h',
	aliases: ['h'],
	usage: 'h',
	cooldown: 5,
	execute(message, args) {
		const Discord = require("discord.js");
        const Math = require("mathjs");
        const Enmap = require("enmap");
        const fetch = require('node-fetch');
		
		message.channel.send("https://i.kym-cdn.com/entries/icons/original/000/023/902/bigh.gif");
	},
};