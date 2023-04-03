module.exports = {
    roleCollector: (interaction, databaseEntry) => {
        interaction.update({ embeds: [interaction.client.config.Embeds.INFO('Envie o **@cargo** no canal.', interaction)], components: [] })

        messageFilter = m => m.author.id === interaction.user.id;
        messageCollector = interaction.channel.createMessageCollector({ messageFilter, time: 15000 });

        messageCollector.on('collect', m => {
            messageCollector.stop()

            if (m.mentions.roles.size === 0) return interaction.channel.send({ embeds: [interaction.client.config.Embeds.ERROR('**Por favor, envie um cargo!**', interaction)], ephemral: true })
            if (m.mentions.roles.size > 1) return interaction.channel.send({ embeds: [interaction.client.config.Embeds.ERROR('**Por favor, envie apenas __um__ cargo!**', interaction)], ephemral: true })

            interaction.channel.send({ embeds: [interaction.client.config.Embeds.SUCCESS('**Configuração salva com sucesso!**')] })
            console.log(m.mentions.roles.first().id, databaseEntry)
        })
    },
    channelCollector: (interaction, databaseEntry) => {
        interaction.update({ embeds: [interaction.client.config.Embeds.INFO('Envie o **#canal** no canal.', interaction)], components: [] })

        messageFilter = m => m.author.id === interaction.user.id;
        messageCollector = interaction.channel.createMessageCollector({ messageFilter, time: 15000 });

        messageCollector.on('collect', m => {
            messageCollector.stop()

            if (m.content.includes('<id:browse>')) return interaction.channel.send({ embeds: [interaction.client.config.Embeds.ERROR('**Por favor, mencione um #canal!**', interaction)], ephemral: true })
            if (m.mentions.channels.size === 0) return interaction.channel.send({ embeds: [interaction.client.config.Embeds.ERROR('**Por favor, mencione um #canal!**', interaction)] })
            if (m.mentions.channels.size > 1) return interaction.channel.send({ embeds: [interaction.client.config.Embeds.ERROR('**Por favor, mencione apenas __um__ #canal!**', interaction)] })
            if (m.mentions.channels.first().type !== 0) return interaction.channel.send({ embeds: [interaction.client.config.Embeds.ERROR('O `canal` precisa ser um canal de texto!', interaction)] })

            interaction.channel.send({ embeds: [interaction.client.config.Embeds.SUCCESS('**Configuração salva com sucesso!**')] })
            console.log(m.mentions.channels.first().id, databaseEntry)
        })
    }
}