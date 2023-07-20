module.exports = (client, interaction, staffRoleId) => {
    interaction.editReply({ content: `${interaction.user}, pronto!`})
    interaction.channel.send({ content: `> **🔓 | Visualização de canal ativada por: ${interaction.user}!**` })
    interaction.channel.permissionOverwrites.edit(interaction.guild.id, { ViewChannel: null })
    interaction.channel.permissionOverwrites.edit(staffRoleId, { SendMessages: true })
}