const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const TaskManager = require("../managers/TaskManager");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("tasks")
        .setDescription("Shows tasks")
        .addUserOption(option =>
            option.setName("target")
                .setDescription("For who")
        )
    ,
    execute: async (interaction = null, channel = null) => {
        const tm = new TaskManager();
        await tm.showTasks(interaction, channel);
    }
}


