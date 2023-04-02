const Database = require('../../../database/Database')

module.exports = async (client, interaction) => {
    switch(interaction.options.resolved)

/*     const channel = interaction.options.getChannel('canal')
    const { Embeds } = client.config

    if (channel.type !== 0) return interaction.reply({ embeds: [Embeds.ERROR('O `canal` precisa ser um canal de texto!', interaction)], ephemeral: true })
    interaction.deferReply({ ephemeral: true })

    const db = await Database(interaction.guild.id)
    db.guild.setup.channels.boosterAnnouncementChannelId = channel.id

    await db.guild.save()
    await db.disconnect()
    await interaction.editReply({ embeds: [Embeds.SUCCESS('Salvo com sucesso!', interaction)], ephemeral: true }) */
}