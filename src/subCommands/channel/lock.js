module.exports = (client, interaction, staffRoleId) => {
    interaction.editReply({ content: `${interaction.user}, pronto!`})
    interaction.channel.send({ content: `> **🔒 | Canal bloqueado por: ${interaction.user}!**` })
    interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: false })
    interaction.channel.permissionOverwrites.edit(staffRoleId, { SendMessages: true })
}