const GuildDB = require('../../database/GuildDB')
const { writeFileSync } = require('fs')

module.exports = async (interaction, guildId) => {
    const guildDB = new GuildDB()
    const guild = await guildDB.guild(guildId)
    const tempJson = {
        backupVentingChannelId: guild.setup.channels.backupVentingChannelId ? guild.setup.channels.backupVentingChannelId : null,
        ventingChannelId: guild.setup.channels.ventingChannelId ? guild.setup.channels.ventingChannelId : null
    }

    await guildDB.disconnect()

    try {
        writeFileSync(`${process.cwd()}/src/database/cache/${guildId}.json`, JSON.stringify(tempJson, null, 4))
        return interaction.reply({ content: 'Cache atualizado!', ephemeral: true })
    } catch (err) {
        console.log(`Error caching guild id ${guildId}!`)
        console.log(err)
        return interaction.reply({ content: 'Ocorreu um erro ao atualizar o cache!', ephemeral: true })
    }
}