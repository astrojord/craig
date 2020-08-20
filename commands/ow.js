module.exports = {
	name: 'ow',
	description: 'get overwatch profile info',
	aliases: ['overwatch'],
	usage: '>ow [battlenet tag] [region] [platform]',
	cooldown: 5,
	execute(message, args) {
		const Discord = require("discord.js");
    const fetch = require('node-fetch');
		
    let tag = args[0];
    const region = (!args[1]) ? "us" : args[1];
    const platform = (!args[2]) ? "pc" : args[2];

    // fix tag to be in correct format for API
    n = tag.search(/\d+/);
    tag = (tag[n-1] == '#') ? tag : (tag.slice(0,n) + '-' + tag.slice(n));


		if(!args[0]){
			message.channel.send("please provide a Battle.net tag to look up!");
    } else {
      fetch(`https://ow-api.com/v1/stats/:${platform}/:${region}/:${tag}/profile`)
        .then(res => res.json())
        .then(profile => {
          const e = new Discord.MessageEmbed()
            .setTimestamp()
            .setColor('0xFA9C1D') // apparently the overwatch league orange
            .setTitle(`Overwatch Profile: ${profile.name}`)
            .setThumbnail(profile.icon)
            .addField('Level',`${profile.level}`,true)
            .addField('Prestige',`${profile.prestige}`,true)
            .addField('Rating',`${profile.rating}`,true)
            .addField('Games Won',`${profile.gamesWon}`,true);
        })
    };
    
	},
};