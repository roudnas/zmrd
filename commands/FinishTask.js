const {SlashCommandBuilder} = require('discord.js');
const DB = require("../modules/DB");
const {Op, Sequelize} = require("sequelize");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("finish_task")
		.setDescription("Finishes a task for someone")
		.addStringOption(option =>
			option.setName("id")
				.setDescription("Which task")
				.setRequired(true)
		)
	,
	execute: async (interaction) => {
		try {
			const id = interaction.options.getString("id");
			if (!id)
				return interaction.reply("SPATNY ID CO DELAS");
			await DB.del("tasks", {
				where: {
					[Op.or]: [
						{ id: id },
						{id: { [Op.like]: `${id}%` }}
					]
				}
			});
			interaction.reply("👍👍👍");

		} catch (e) {
			console.error(e);
			interaction.reply("NECO SE POSRALO");
		}

	}
}
