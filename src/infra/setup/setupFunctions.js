const GuildDB = require('../../database/GuildDB');

module.exports = {
    roleCollector: (interaction, databaseEntry) => {
        interaction.update({ embeds: [interaction.client.config.Embeds.INFO('Mencione o `@cargo` no canal.', interaction)], components: [] })

        messageFilter = m => m.author.id === interaction.user.id;
        messageCollector = interaction.channel.createMessageCollector({ filter: messageFilter, time: 15000 });

        messageCollector.on('collect', async (m) => {
            messageCollector.stop()

            if (m.mentions.roles.size === 0) return interaction.channel.send({ embeds: [interaction.client.config.Embeds.ERROR('Por favor, mencione um `@cargo`!', interaction)] })
            if (m.mentions.roles.size > 1) return interaction.channel.send({ embeds: [interaction.client.config.Embeds.ERROR('Por favor, mencione apenas __um__ `@cargo`!', interaction)] })
           
            const roleId = m.mentions.roles.first().id

            const guildDB = new GuildDB()
            const guild = await guildDB.guild(interaction.guild.id)
            guild.setup.roles[databaseEntry] = roleId   
            await guild.save()
            await guildDB.disconnect()

            interaction.channel.send({ embeds: [interaction.client.config.Embeds.SUCCESS('**Configuração salva com sucesso!**')] })
            //console.log(m.mentions.roles.first().id, databaseEntry)
        })
    },
    channelCollector: (interaction, databaseEntry, channelType) => {
        interaction.update({ embeds: [interaction.client.config.Embeds.INFO('Mencione o `#canal` no canal.', interaction)], components: [] })

        messageFilter = m => m.author.id === interaction.user.id
        messageCollector = interaction.channel.createMessageCollector({ filter: messageFilter, time: 15000 });

        messageCollector.on('collect', async (m) => {
            messageCollector.stop()

            if (m.content.includes('<id:browse>')) return interaction.channel.send({ embeds: [interaction.client.config.Embeds.ERROR('Por favor, mencione um `#canal`!', interaction)], ephemral: true })
            if (m.mentions.channels.size === 0) return interaction.channel.send({ embeds: [interaction.client.config.Embeds.ERROR('Por favor, mencione um `#canal`!', interaction)] })
            if (m.mentions.channels.size > 1) return interaction.channel.send({ embeds: [interaction.client.config.Embeds.ERROR('Por favor, mencione apenas __um__ `#canal`!', interaction)] })
            if (m.mentions.channels.first().type !== channelType) return interaction.channel.send({ embeds: [interaction.client.config.Embeds.ERROR('O `#canal` precisa ser um canal de texto ou categoria!', interaction)] })

            const channelId = m.mentions.channels.first().id

            const guildDB = new GuildDB()
            const guild = await guildDB.guild(interaction.guild.id)
            guild.setup.channels[databaseEntry] = channelId   
            await guild.save()
            await guildDB.disconnect()

            interaction.channel.send({ embeds: [interaction.client.config.Embeds.SUCCESS('**Configuração salva com sucesso!**')] })
            //console.log(m.mentions.channels.first().id, databaseEntry)
        })
    }
}