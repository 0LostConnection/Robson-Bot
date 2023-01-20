const { EmbedBuilder, ChannelType, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { readFileSync, existsSync } = require('fs')

const closeButton = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("ticket:close_channel")
            .setStyle(ButtonStyle.Secondary)
            .setLabel("Fechar Ticket")
            .setEmoji("🔒")
    )

module.exports = async (interaction, { channelName, createdMessage }) => {
    const { Embeds } = interaction.client.config

    let ticketData = {},
        supportRole = {},
        openCategory = {},
        closeCategory = {},
        createdChannel = {},
        ticketEmbed = {}

    if (!existsSync(`${process.cwd()}/data/tickets/${interaction.channel.id}.json`)) return interaction.editReply({ embeds: [Embeds.ERROR('Algo deu errado...')], ephemeral: true })
    ticketData = JSON.parse(readFileSync(`${process.cwd()}/data/tickets/${interaction.channel.id}.json`))
    supportRole = interaction.guild.roles.cache.get(ticketData.supportRoleId)
    openCategory = interaction.guild.channels.cache.get(ticketData.openCategoryId)
    closeCategory = interaction.guild.channels.cache.get(ticketData.closeCategoryId)

    if (!supportRole) return interaction.editReply({ embeds: [Embeds.ERROR('O cargo de suporte não existe!')] })
    if (!openCategory) return interaction.editReply({ embeds: [Embeds.ERROR('A categoria de ticket aberto não existe!')] })
    if (!closeCategory) return interaction.editReply({ embeds: [Embeds.ERROR('A categoria de ticket fechado não existe!')] })

    createdChannel = await interaction.guild.channels.create({
        name: `${channelName}-${interaction.user.username}`,
        type: ChannelType.GuildText,
        topic: `🎫 Ticket criado por ${interaction.user.tag}! - ${interaction.user.id}`,
        parent: openCategory,
        permissionOverwrites: [
            {
                id: interaction.guild.id,
                deny: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
            },
            {
                id: interaction.user.id,
                allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
            },
            {
                id: supportRole.id,
                allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
            }
        ]
    })

    ticketEmbed = new EmbedBuilder()
        .setDescription(createdMessage)
        .setColor("ee9356")

    await createdChannel.send({ content: `${interaction.user}\n${supportRole}`, embeds: [ticketEmbed], components: [closeButton] })
    await interaction.editReply({ embeds: [Embeds.SUCCESS(`🎫 Seu ticket foi criado! ${createdChannel}`)] })
}