const {Client, Collection, GatewayIntentBits} = require('discord.js');
const dotenv = require('dotenv');
const FileManager = require('./FileManager');

class Zmrd {
	static _client = new Client({intents: [GatewayIntentBits.Guilds]});
	constructor() {
		dotenv.config();
		this.initClient();
		this.commandsJSON = [];
		this.fileManager = new FileManager();
	}

	initClient() {
		Zmrd._client.commands = new Collection();
		Zmrd._client.once("ready", () => {
			console.log("Online");
		})
	}

	loadCommands() {
		this.fileManager.load("commands", (command) => {
			this.commandsJSON.push(command.data.toJSON());
			Zmrd._client.commands.set(command.data.name, command);
		})
	}

	registerCommands() {
		Zmrd._client.on("interactionCreate", async interaction => {
			if (!interaction.isChatInputCommand()) return;

			const command = Zmrd._client.commands.get(interaction.commandName);

			if (!command) return;

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error);
				await interaction.reply("Pici nevim neco se nepovedlo.");
			}
		})
	}

	login() {
		Zmrd._client.login(process.env.TOKEN);
	}

	static async getUser(id) {
		return await Zmrd._client.users.fetch(id).catch(console.error);
	}

	static async getChannel(id) {
		console.log(`Fetching ${id}`)
		const guild = await Zmrd._client.guilds.fetch(process.env.GUILD_ID);
		return await guild.channels.fetch(id)
	}
}

module.exports = Zmrd;
