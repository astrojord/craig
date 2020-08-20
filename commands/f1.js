const Discord = require("discord.js");
const Math = require("mathjs");
const Enmap = require("enmap");
const fetch = require('node-fetch');

const F1_LOGO = 'https://1000logos.net/wp-content/uploads/2020/02/F1-Logo-500x281.png';
const F1_COLOR = '0xFF2800';

function getRaces(data) {
	return data.MRData.RaceTable.Races;
}

function sorryNo(message, title) {
	const e = new Discord.MessageEmbed()
		.setColor(F1_COLOR)
		.setThumbnail(F1_LOGO) // F1 logo lolz
		.setTimestamp()
		.setTitle(title)
		.addField("‍",`sorry no`);
	message.channel.send(e);
}

const handlers = (message, args) => ({
	next: () => {
		const now = new Date();
		fetch("https://ergast.com/api/f1/current.json")
			.then(res => res.json())
			.then(data => {
				let nextRace;
				for (race of getRaces(data)) {
					if (!nextRace && new Date(race.date) - now > 0) {
						nextRace = race;
						// console.log('we in da thing', race.date);
					}
				};

				if (nextRace) {
					const title = `F1 ${now.getFullYear()}: Next Race`;
					const e = new Discord.MessageEmbed()
						.setColor(F1_COLOR)
						.setThumbnail(F1_LOGO)
						.setTimestamp()
						.setTitle(title)
						.addField(`${nextRace.raceName} @ ${nextRace.Circuit.circuitName} (Round ${nextRace.round})`,`${nextRace.url} \n${nextRace.Circuit.url}\n\nTime: ${nextRace.date} @ ${nextRace.time}\nCircuit location: ${nextRace.Circuit.Location.locality}, ${nextRace.Circuit.Location.country}`);
					message.channel.send(e);
				} else {
					sorryNo(message, title)
				};
			})
			.catch(e => console.error(e));
	},
	schedule: () => {
		const season = args[1];
		if (season) {
			fetch(`https://ergast.com/api/f1/${season}.json`)
				.then(res => res.json())
				.then(data => {
					const e = new Discord.MessageEmbed()
						.setColor(F1_COLOR)
						.setThumbnail(F1_LOGO)
						.setTimestamp()
						.setTitle(`F1 ${season}: Full Schedule`);
					const races = getRaces(data);
					if (races && races.length > 0) {
						for (race of getRaces(data)) {
							e.addField(`${race.raceName} (Round ${race.round})`,`${race.date} @ ${race.Circuit.circuitName}`);
						};
					} else {
						e.addField("sorry no");
					}
					message.channel.send(e);
				})
				.catch(e => console.error(e));
		} else {
			sorryNo(message, `F1 szn????: Full ScheduLe`);
		}
	},
	results: () => {
		let season = args[1];
		let round = args[2];
		if (season && round) {
			if (round > 100 || season < 1000) {
				season = args[2];
				round = args[1];
				message.channel.send("btw just letting u know the usage is \`>f1 results [season] [round]\`");
			}
			let fastest;
			fetch(`https://ergast.com/api/f1/${season}/${round}/fastest/1/results.json`)
				.then(res => res.json())
				.then(data => {
					//console.log(getRaces(data)[0].Results);
					fastest = getRaces(data)[0].Results[0];
				})
				.catch(e => {
					console.error(e);
					sorryNo(message, "unacceptable")
				})
			fetch(`https://ergast.com/api/f1/${season}/${round}/results.json`)
				.then(res => res.json())
				.then(data => {
					const race = getRaces(data)[0];
					const podiums = []
					for (i of ["1", "2", "3"]) {
						podiums.push(race.Results.find(r => r.position === i))
					}
					const e = new Discord.MessageEmbed()
						.setColor(F1_COLOR)
						.setThumbnail(F1_LOGO)
						.setTimestamp()
						.setTitle(`F1 ${season}: ${race.raceName}`)
						.addField("Race Information", `${race.date} @ ${race.Circuit.circuitName}`)
					let s = "";
					for (podium of podiums) {
						s += `${podium.position}: ${podium.Driver.familyName} (${podium.Constructor.name}) @ ${podium.Time.time}\n`;
					}
					e.addField("Podiums", s);
					e.addField("Fastest Lap", `${fastest.Driver.familyName} (${fastest.Constructor.name}) @ ${fastest.FastestLap.Time.time}`);
					message.channel.send(e);
				})
				.catch(e => {
					console.error(e);
					sorryNo(message, "ohno")
				});
		} else {
			sorryNo(message, 'szn or rnd not give ?!');
		}
	}
})

module.exports = {
	name: 'f1',
	description: 'desc',
	aliases: ['formula1','formulaone'],
	usage: '>f1',
	cooldown: 5,
	execute(message, args) {
		const actualHandlers = handlers(message, args);
		// F1 API requests have form: https://ergast.com/api/f1/<season>/<round>/... + append .json at end

		// +f1 or +f1 next -> next round
		// +f1 schedule 2020 -> full season schedule (less details)
		// +f1 race 1 -> more info on that race # specifically (more details)
		// +f1 results 2020 3 -> specific round info w/ wikipedia link and picture of track bc cute
		// +f1 laps 2020 1

		if (args.length > 0) {
			if (actualHandlers[args[0]]) {
				actualHandlers[args[0]](args);
			} else {
				sorryNo(message, `${args[0]} command ??? never met her`)
			}
		} else {
			actualHandlers.next();
		}
	},
};