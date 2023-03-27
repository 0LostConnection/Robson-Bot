module.exports = (client, interaction) => {
    interaction.reply({ content: `> **🔒 | Canal bloqueado por: ${interaction.user}!**` })
    interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: false })
    interaction.channel.permissionOverwrites.edit(client.config.staffRoleId, { SendMessages: true })
}