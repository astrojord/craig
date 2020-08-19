module.exports = {
	name: 'yt',
	description: 'Returns the top YouTube search result for the given string',
	aliases: ['youtube'],
	usage: '+yt [search string]',
	cooldown: 0,
	execute(message, args) {
        const Discord = require("discord.js");
        const YouTube = require("discord-youtube-api");
        const yt = new YouTube("AIzaSyAjvWXAPRxxnO6GlDMs7LLCD-Kmpp-S_0o");
        const s = args.slice(1).join(" ");
        yt.searchVideos(s,1).then(result => {
            message.channel.send(`${result[0].url} (${result[0].duration})`);
        }).catch(e => {message.channel.send(`error encountered while fetching video :( - ${e}`)});
    }
};