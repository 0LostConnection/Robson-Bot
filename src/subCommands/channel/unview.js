module.exports = (client, interaction, staffRoleId) => {
    interaction.editReply({ content: `${interaction.user}, pronto!`})
    interaction.channel.send({ content: `> **🔒 | Visualização de canal desativada por: ${interaction.user}!**` })
    interaction.channel.permissionOverwrites.edit(interaction.guild.id, { ViewChannel: false })
    interaction.channel.permissionOverwrites.edit(staffRoleId, { SendMessages: true })
}