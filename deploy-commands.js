const {Routes} = require('discord.js');
const {REST} = require('@discordjs/rest');
const dotenv = require('dotenv');
const Zmrd = require('./modules/Zmrd');

dotenv.config();

const bot = new Zmrd();
bot.loadCommands();
const commands = bot.commandsJSON;
const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

rest.put(
	Routes.applicationCommands(
		process.env.CLIENT_ID
	),
	{body: commands}
)
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
