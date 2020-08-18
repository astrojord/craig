module.exports = {
	name: 'grease',
	description: 'grease',
	aliases: ['grease'],
	usage: 'grease',
	cooldown: 5,
	execute(message, args) {
		const Discord = require("discord.js");
        const Math = require("mathjs");
        const Enmap = require("enmap");
        const fetch = require('node-fetch');
		
		message.channel.send("https://media.discordapp.net/attachments/561283117441220610/589355451569930240/image0.jpg?width=324&height=323");
	},
};