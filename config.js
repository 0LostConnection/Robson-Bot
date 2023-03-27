const { EmbedBuilder } = require('discord.js')

module.exports = {
    // Guild
    guildId: "",

    // Guild Roles
    staffRoleId: "1023701403371323463",
    adminRoleId: "1023704577746403419",
    modRoleId: "1023704709812465707",
    eventsModRoleId: "1023704577746403419",
    // Webhooks
    webhooks: {
        error: {
            id: '',
            token: '',
        }
    },

    Embeds: {
        // ERROR: ({ title, description, author, footer }) => {
        ERROR: (description, interaction) => {
            const embed = new EmbedBuilder()
                .setDescription(description)
                .setColor(module.exports.Colors.clear.Red)
            if (interaction) embed.setAuthor({ name: interaction?.guild.name, iconURL: interaction?.guild.iconURL({ animated: true }) })
            return embed
        },
        SUCCESS: (description, interaction) => {
            const embed = new EmbedBuilder()
                .setDescription(description)
                .setColor(module.exports.Colors.clear.Green)
            if (interaction) embed.setAuthor({ name: interaction?.guild.name, iconURL: interaction?.guild.iconURL({ animated: true }) })
            return embed
        },
        INFO: (description, interaction) => {
            const embed = new EmbedBuilder()
                .setDescription(description)
                .setColor(module.exports.Colors.clear.Blue)
            if (interaction) embed.setAuthor({ name: interaction?.guild.name, iconURL: interaction?.guild.iconURL({ animated: true }) })
            return embed
        }
    },

    // Colors
    Colors: {
        clear: {
            Red: "#FF0400",
            Orange: "#FF7400",
            Yellow: "#fcd700",
            Green: "#77B255",
            Blue: "#0875F1",
            Purple: "#B600FF",
            Pink: "#FFC0CB",
            White: "#FFFFFF",
            Black: "#000000",
            Cyan: "#0AA1BF",
            Water: "#00FFC9"
        },
        dark: {
            Red: "#A80000",
            Orange: "#cc6112",
            Olive: "#A0A800",
            Green: "#487d29",
            Blue: "#1F4996",
            Purple: "#593695",
            Pink: "#ed0c5b",
            White: "#DFEBE9",
            Black: "#2A302F"
        },
        custom: {
            LimeGreen: "#258F73",
            Orange: "#ee9356"
        }
    },
}