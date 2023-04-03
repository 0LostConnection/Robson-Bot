module.exports = (interaction, databaseEntry) => {
    interaction.update({ embeds: [interaction.client.config.Embeds.INFO('Envie o **@cargo** no canal.', interaction)], components: [] })

    messageFilter = m => m.author.id === interaction.user.id;
    messageCollector = interaction.channel.createMessageCollector({ messageFilter, time: 15000 });

    messageCollector.on('collect', m => {
        messageCollector.stop()
        /* console.log(m.mentions.roles)
        console.log(`\n\n${m.mentions.roles.size}\n\n${m.content}`) */
        if (m.mentions.roles.size === 0) return interaction.channel.send({ embeds: [interaction.client.config.Embeds.ERROR('**Por favor, envie um cargo!**', interaction)], ephemral: true })
        if (m.mentions.roles.size > 1) return interaction.channel.send({ embeds: [interaction.client.config.Embeds.ERROR('**Por favor, envie apenas __um__ cargo!**', interaction)], ephemral: true })

        interaction.channel.send({ embeds: [interaction.client.config.Embeds.SUCCESS('**Configuração salva com sucesso!**')] })
        console.log(m.mentions.roles.first().id, databaseEntry)
    })
}