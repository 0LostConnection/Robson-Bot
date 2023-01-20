const { PermissionFlagsBits } = require('discord.js')
const { readFileSync, existsSync } = require('fs')

module.exports = async (interaction) => {

    /* if (!interaction.channel.name.includes('closed')) return

    const authorId = interaction.channel.name.match(/\d+/g).join("")
    console.log(authorId)

    const type = interaction.channel.name.replace(/-\d+/i, "").replace(/closed-/i, "")
    interaction.channel.setName(`${type}-${authorId}`)
    const user = await interaction.guild.members.fetch(authorId)
    interaction.channel.permissionOverwrites.set([{
        id: user,//authorId,
        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
    }])

    if (interaction.channel.name.includes("closed")) {
        interaction.reply({ content: "API timeout", ephemeral: true })
    } else {
        interaction.reply({ content: "Ok", ephemeral: true })
    }

    console.log(type) */
}