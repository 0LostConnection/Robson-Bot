module.exports = (client, interaction) => {
    interaction.reply({ content: `> **🔓 | Canal desbloqueado por: ${interaction.user}!**` })
    interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: null })
    interaction.channel.permissionOverwrites.edit(client.config.staffRoleId, { SendMessages: null })
}