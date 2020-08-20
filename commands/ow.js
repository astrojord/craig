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

    // username no number
    // number, no username
    // correct: username#number
    // correct: username-number
    // incorrect: username number
    // incorrect number (an)

		if(!args[0]){
      message.channel.send("please provide a Battle.net tag to look up!");
      return;
    } else {
      // fix tag to be in correct format for API
      // get index of first result of #1234 or -1234 (i.e. # or - then 4 digits)
      const n = tag.search(/(#|-)(\d{4,})/); 
      if (n === -1) {
        message.channel.send("the Battle.net tag is incorrectly formatted -- please give in the form of [username]#[numbers]");
        return;
      } else {
        if (tag[n] == '#' || tag[n] == '-'){
          tag = tag.slice(0, n) + '-' + tag.slice(n+1);
        } else {
          message.channel.send("your Battle.net tag is incorrectly formatted -- please give in the form of [username]#[numbers]");
          return;
        }
      }
      //console.log(platform, region, tag)
      fetch(`https://ow-api.com/v1/stats/${platform}/${region}/${tag}/profile`)
        .then(res => res.json())
        .then(profile => {
          // handle when people have 0 stats in either/both quick play and competitive
          let qpWins = "N/A";
          let compWins = "N/A";

          if (Object.keys(profile.quickPlayStats) > 0){
            qpWins = profile.quickPlayStats.games.won.toString();
          };
          if (Object.keys(profile.competitiveStats) > 0){
            qpWins = profile.competitiveStats.games.won.toString();
          };
          // put together our fun and spicy message 
          const e = new Discord.MessageEmbed()
            .setTimestamp()
            .setColor('0xFA9C1D') // apparently the overwatch league orange
            .setAuthor(`Overwatch Profile: ${profile.name}`,profile.icon)
            .setThumbnail("https://img.pngio.com/overwatch-logo-icon-225668-free-icons-library-overwatch-icon-png-256_256.jpg")
            .addField('Level',`${profile.level}`,true)
            .addField('Prestige',`${profile.prestige}`,true)
            .addField('Rating',`${profile.rating}`,true)
            .addField('Quick Play Wins',qpWins,true)
            .addField('Competitive Wins',compWins,true)
            .addField('Total Wins',`${profile.gamesWon}`,true);
          message.channel.send(e);
        }).catch(e => console.error(e));
    };
    
	},
};