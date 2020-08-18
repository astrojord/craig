module.exports = {
	name: 'soup',
	description: 'soup',
	aliases: ['soup'],
	usage: '+soup',
	cooldown: 5,
	execute(message, args) {
		const Discord = require("discord.js");
        const Math = require("mathjs");
        const Enmap = require("enmap");
        const fetch = require('node-fetch');
		
		message.channel.send("yeah we got soup https://i.kym-cdn.com/photos/images/newsfeed/001/393/392/416.jpg");
	},
};