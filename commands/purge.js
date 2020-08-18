module.exports = {
	name: 'purge',
	description: 'Deletes the previous n messages from the channel.',
	aliases: ['purge'],
	usage: '+purge [n]',
	cooldown: 5,
	execute(message, args) {
		const Discord = require("discord.js");
    const Math = require("mathjs");
    const Enmap = require("enmap");
    const fetch = require('node-fetch');
    const n = args[0];
    if (n > 100){
    	message.reply("the amount of messages to purge may not exceed 100.");
    		return;
   	}
    message.channel.bulkDelete(n)
    	.catch(error => message.reply(`couldn't delete messages because of: ${error}`));
	},
};