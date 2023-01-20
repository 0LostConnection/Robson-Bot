const { ButtonStyle, ComponentType, ButtonBuilder, ActionRowBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')
const { readdirSync, readFileSync } = require('fs')

const confimationRow = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("ticket:close_channel:confirm")
            .setStyle(ButtonStyle.Danger)
            .setLabel("Fechar Ticket"),
        new ButtonBuilder()
            .setCustomId("ticket:close_channel:cancel")
            .setStyle(ButtonStyle.Secondary)
            .setLabel("Cancelar")
    )

module.exports = (interaction) => {
    const { Embeds } = interaction.client.config

    interaction.reply({ content: "Você tem certeza que deseja fechar esse ticket?", components: [confimationRow], ephemeral: true })

    const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, time: 15000 })

    collector.on("collect", async (i) => {

        switch (i.customId) {
            case "ticket:close_channel:confirm":
                const ticketsDataDir = readdirSync(`${process.cwd()}/data/tickets/`)

                for (const ticketDataFile of ticketsDataDir) {
                    const ticketData = JSON.parse(readFileSync(`${process.cwd()}/data/tickets/${ticketDataFile}`))
                    if (ticketData.openCategoryId === interaction.channel.parentId) {
                        const authorId = interaction.channel.topic.match(/ (\d+)/)[0]
                        const closeCategory = interaction.guild.channels.cache.get(ticketData.closeCategoryId)

                        await interaction.channel.setParent(closeCategory, { lockPermissions: false })
                        await interaction.channel.permissionOverwrites.delete(authorId)
                        await interaction.editReply({ content: 'O ticket foi fechado!', components: [] })
                        await interaction.channel.send({ embeds: [Embeds.INFO(`🎫 ${i.user} fechou o ticket!`)], components: [] })

                    } else if (ticketData.closeCategoryId === interaction.channel.parentId) {
                        await interaction.editReply({ content: 'O ticket já foi fechado!', components: [] })
                    }
                }
                break

            case "ticket:close_channel:cancel":
                await interaction.editReply({ content: "Interacação cancelada.", components: [], ephemeral: true })
                break
        }
        collector.stop()
    })

    collector.on('end', (collected, reason) => {
        switch (reason) {
            case "time":
                interaction.editReply({ content: "Tempo Expirado!", components: [] })
                break
        }
    })













    /* const { Colors } = interaction.client.config
    const authorId = interaction.channel.name.match(/\d+/g).join("")
    const type = interaction.channel.name.replace(/-\d+/i, "")

    if (interaction.channel.name.includes("closed")) return interaction.reply({ content: "Esse ticket já está fechado!", ephemeral: true })
    
    interaction.reply({ content: "Você tem certeza que deseja fechar esse ticket?", components: [confimationRow], ephemeral: true })

    const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, time: 15000 })
    collector.on("collect", (i) => {

        switch (i.customId) {
            case "ticket_close:confirm":
                interaction.editReply({ content: "Ticket fechado!", components: [], ephemeral: true })
                interaction.channel.send({ embeds: [new EmbedBuilder().setDescription(`Ticket fechado por ${i.user}`).setColor(Colors.clear.Yellow)] })
                interaction.channel.permissionOverwrites.delete(authorId)                
                interaction.channel.setName(`closed-${type}-${authorId}`)
                break

            case "ticket_close:cancel":
                interaction.editReply({ content: "Interacação cancelada.", components: [], ephemeral: true })
                break
        }
        collector.stop()
    })

    collector.on('end', (collected, reason) => {
        switch (reason) {
            case "time":
                interaction.editReply({ content: "Tempo Expirado!", components: [] })
                break
        }
    }) */
}   