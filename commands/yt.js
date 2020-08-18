module.exports = {
	name: 'yt',
	description: 'Returns the top YouTube search result for the given string',
	aliases: ['youtube'],
	usage: '+yt [search string]',
	cooldown: 0,
	execute(message, args) {
        const Discord = require("discord.js");
        const Math = require("mathjs");
        const Enmap = require("enmap");
        const fetch = require('node-fetch');
        const YouTube = require("discord-youtube-api");
		const yt = new YouTube("AIzaSyAv9wi-P89N1WORUe05TWa-QGfjbvCXAJc");
        const s = args.slice(1).join(" ")
        async function get(s){
            const v = await yt.searchVideos(s);
            //console.log(v)
        message.channel.send(`${v.url} (${v.length})`);
        }
        get(s);
	},
};


