module.exports = {
	name: 'yoshi',
	description: 'yoshi',
	aliases: ['yoshi'],
	usage: 'yoshi',
	cooldown: 5,
	execute(message, args) {
		const Discord = require("discord.js");
        const Math = require("mathjs");
        const Enmap = require("enmap");
        const fetch = require('node-fetch');
		
		message.channel.send("https://www.youtube.com/watch?v=nghTrcPBp3s");
	},
};