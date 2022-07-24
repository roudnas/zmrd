const DB = require("../modules/DB");
const {EmbedBuilder} = require("discord.js");
const Zmrd = require("../modules/Zmrd");
const Utils = require("../modules/Utils");

class TaskManager {
    async showTasks(interaction = null, channel = null) {
        try {
            const user = (interaction)
                ? interaction.options.getUser("target")
                : null;
            const ch = await this.getChannel(interaction, channel);

            const data = await DB.getAll("tasks", (user) ? {
                where: {
                    for: user.id
                }
            } : {});
            if (interaction)
                interaction.reply("👍👍👍");
            ch.send({
                embeds: [await this.getUserEmbed(data)],
                //components: [await getButtons(data)]
            })
        } catch (e) {
            console.error(e);
            if ( interaction )
                interaction.reply("NECO SE POSRALO");
        }
    }

    async getChannel(interaction, channelId) {
        return (interaction)
            ? interaction.channel
            : await Zmrd.getChannel(channelId);
    }

    async getForUser(row) {
        let str = "";
        if (row.dataValues.for) {
            const forUser = await Zmrd.getUser(row.dataValues.for);
            str = `${forUser.username}#${forUser.discriminator}`
        } else {
            str = "All";
        }
        return str;
    }

    async getUserEmbed(data) {
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Tasks')
            .setTimestamp();
        if (!data.length)
            return embed.setDescription("No tasks");
        for (let i = 0; i < data.length; ++i) {
            data[i].dataValues.for = await this.getForUser(data[i]);
            data[i].dataValues.createdAt = Utils.parseDate(data[i].dataValues.createdAt)
            embed.addFields(
                {name: "ID", value: data[i].dataValues.id},
                {name: "TODO", value: data[i].dataValues.name, inline: true},
                {name: "For", value: data[i].dataValues.for, inline: true},
                {name: "Created at", value: data[i].dataValues.createdAt, inline: true}
            );
        }
        return embed;
    }
}

module.exports = TaskManager;