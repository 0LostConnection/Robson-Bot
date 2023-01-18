const { ChannelType, PermissionFlagsBits, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require('discord.js')

const closeButton = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("ticket_close")
            .setStyle(ButtonStyle.Secondary)
            .setLabel("Fechar Ticket")
            .setEmoji("🔒")
    )

module.exports = (interaction, options) => {
    interaction.guild.channels.create(
        {
            name: options[0].name,
            type: ChannelType.GuildText,
            permissionOverwrites: [
                {
                    id: interaction.user.id,
                    allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
                },
                {
                    id: options[0].supportRoleId,
                    allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
                },
                {
                    id: interaction.guild.id,
                    deny: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
                }
            ]
        }
    ).then(async channel => {
        await channel.setParent(options[0].parentId, { lockPermissions: false })
        await channel.send({ content: `${interaction.user}\n<@&${options[0].supportRoleId}>`, embeds: [options[1]], components: [closeButton] })
        await interaction.reply({ content: `${options[0].replyMessage} ${channel}`, ephemeral: true })
    }).catch(async err => {
        await console.log(err)
    })
}