module.exports = {
	name: 'two',
	description: 'two',
	aliases: ['two'],
	usage: '+two',
	cooldown: 5,
	execute(message, args) {
		const Discord = require("discord.js");
        const Math = require("mathjs");
        const Enmap = require("enmap");
        const fetch = require('node-fetch');
		
		message.channel.send("https://www.youtube.com/watch?v=btHpHjabRcc")
	},
};