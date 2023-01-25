const { ActionRowBuilder, StringSelectMenuBuilder, ChannelType } = require('discord.js')
const { writeFileSync } = require('fs')


/*
data = {
    panel: {
        customId, STRING
        placeHolder, STRING
        options, ARRAY { value, label, description, emoji }
    },
    embed - EmbedBuilder
}
*/
module.exports = async (interaction, data) => {
    const { Embeds } = interaction.client.config
    const channel = interaction.options.getChannel('canal')
    const supportRole = interaction.options.getRole('cargo-suporte')
    const openCategory = interaction.options.getChannel('categoria-aberto')
    const closeCategory = interaction.options.getChannel('categoria-fechado')
    const type = interaction.options.getString('tipo')

    // Verificar se o canal é um canal de texto
    if (channel.type !== ChannelType.GuildText) return interaction.editReply({ embeds: [Embeds.ERROR('A opção `canal` precisa ser um canal de texto!')] })
    if (openCategory.type !== ChannelType.GuildCategory) return interaction.editReply({ embeds: [Embeds.ERROR('A opção \`categoria-aberto\` precisa ser uma categoria!')] })
    if (closeCategory.type !== ChannelType.GuildCategory) return interaction.editReply({ embeds: [Embeds.ERROR('A opção \`categoria-fechado\` precisa ser uma categoria!')] })


    const panel = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
            .setCustomId(data.panel.customId)
            .setPlaceholder(data.panel.placeHolder)
            .addOptions(data.panel.options)
    )

    const panel_message = data.embed

    const message = await channel.send({ embeds: [panel_message], components: [panel] })
    await interaction.editReply({ embeds: [Embeds.SUCCESS('🎫 O sistema de ticket foi configurado!')] })

    const ticketData = {
        type: type,
        channelId: channel.id,
        messageId: message.id,
        supportRoleId: supportRole.id,
        openCategoryId: openCategory.id,
        closeCategoryId: closeCategory.id
    }

    writeFileSync(`${process.cwd()}/data/tickets/${channel.id}.json`, JSON.stringify(ticketData, null, 4)) // Write the data to the file.
}