module.exports = (client, interaction) => {
    interaction.reply({ content: `> **🔓 | Visualização de canal ativada por: ${interaction.user}!**` })
    interaction.channel.permissionOverwrites.edit(interaction.guild.id, { ViewChannel: null })
    interaction.channel.permissionOverwrites.edit(client.config.staffRoleId, { ViewChannel: null })

}