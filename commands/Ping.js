const {SlashCommandBuilder} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("pings")
	,
	execute: async (interaction) => {
		console.log(interaction)
		interaction.reply("LADA PRISEL");
	}
}
