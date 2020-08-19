const Discord = require("discord.js");
const Math = require("mathjs");
const client = new Discord.Client();
const Enmap = require("enmap");
const fetch = require('node-fetch');
const fs = require('fs');
const YouTube = require("discord-youtube-api");

const config = require("./config.json");
client.config = config;

client.on('error', console.error)
client.on('warn', console.warn)
//client.on('debug', console.log)
client.on('ready', () => {
  console.log(`Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
  client.user.setActivity("beep boop");
})
client.on('disconnect', () => { console.warn('Disconnected :('); })
client.on('reconnecting', () => { console.warn('Reconnecting...'); })

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("message", (message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  if (!command) return;
  const prettyArgs = args.map(a => a.toLowerCase())
  try {
	  command.execute(message, args);
	} catch (error) {
	  console.error(error);
	  message.reply('there was an error trying to execute that command.');
	}
});

client.login(config.token).catch(console.error);
