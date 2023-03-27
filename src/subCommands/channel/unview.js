module.exports = (client, interaction) => {
    interaction.reply({ content: `> **🔒 | Visualização de canal desativada por: ${interaction.user}!**` })
    interaction.channel.permissionOverwrites.edit(interaction.guild.id, { ViewChannel: false })
    interaction.channel.permissionOverwrites.edit(client.config.staffRoleId, { ViewChannel: true })
}