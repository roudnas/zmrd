const {SlashCommandBuilder} = require('discord.js');
const DB = require("../modules/DB");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("set_task")
		.setDescription("Sets a task for someone")
		.addStringOption(option =>
			option.setName("name")
				.setDescription("What")
				.setRequired(true)
		)
		.addUserOption(option =>
			option.setName("target")
				.setDescription("For who")
		)
	,
	execute: async (interaction) => {
		try {
			const users = await DB.getAll("in_house_user");
			if (!users.find(user => user.dataValues.user === interaction.user.id))
				return interaction.reply("HM TOJO, JESTE BEJT NA BYTE CO");
			if (interaction.options.getUser("target") && !users.find(user => user.dataValues.user === interaction.options.getUser("target").id))
				return interaction.reply("TOMU TO ASI NEZADAM, CO")
			await DB.add("tasks", {
				name: interaction.options.getString("name"),
				for: interaction.options.getUser("target") ? interaction.options.getUser("target").id : null
			});
			interaction.reply(`Task zadanej bro`);
		} catch (e) {
			console.error(e);
			interaction.reply("NECO SE POSRALO");
		}

	}
}
