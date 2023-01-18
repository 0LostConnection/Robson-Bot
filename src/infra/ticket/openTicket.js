const { PermissionFlagsBits } = require('discord.js')

module.exports = (interaction) => {

    if (!interaction.channel.name.includes('closed')) return
    
    const authorId = interaction.channel.name.match(/\d+/g).join("")
    console.log(authorId)
    const type = interaction.channel.name.replace(/-\d+/i, "").replace(/closed-/i, "")
    interaction.channel.setName(`${type}-${authorId}`)
    interaction.channel.permissionOverwrites.set = {
        id: authorId,
        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
    }
    
    console.log(type)
}