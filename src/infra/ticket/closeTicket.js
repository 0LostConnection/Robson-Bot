const { ButtonStyle, ComponentType, ButtonBuilder, ActionRowBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')
const { ClearColors } = require("../utils/Colors")

const confimationRow = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("ticket_close:confirm")
            .setStyle(ButtonStyle.Danger)
            .setLabel("Fechar Ticket"),
        new ButtonBuilder()
            .setCustomId("ticket_close:cancel")
            .setStyle(ButtonStyle.Secondary)
            .setLabel("Cancelar")
    )


module.exports = (interaction) => {
    const authorId = interaction.channel.name.match(/\d+/g).join("")
    const type = interaction.channel.name.replace(/-\d+/i, "")

    if (interaction.channel.name.includes("closed")) return interaction.reply({ content: "Esse ticket já está fechado!", ephemeral: true })
    
    interaction.reply({ content: "Você tem certeza que deseja fechar esse ticket?", components: [confimationRow], ephemeral: true })

    const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, time: 15000 })
    collector.on("collect", (i) => {

        switch (i.customId) {
            case "ticket_close:confirm":
                interaction.editReply({ content: "Ticket fechado!", components: [], ephemeral: true })
                interaction.channel.send({ embeds: [new EmbedBuilder().setDescription(`Ticket fechado por ${i.user}`).setColor(ClearColors.Yellow)] })
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
    })
}   