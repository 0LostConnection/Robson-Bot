const eventStructure = require(`../../infra/structures/EventStructure`)
const { EmbedBuilder } = require('discord.js')
const boostMessages = [
    '**Acabou de dar boost no servidor! :scream_cat:**',
    '**Acabou de boostar o servidor! :scream_cat:\nAgradeçam! :pleading_face:**',
    '**O que é isso?! :face_with_monocle:\nObrigado pelo boost! :pleading_face:**'
]

module.exports = class extends eventStructure {
    constructor(client) {
        super(client, {
            name: 'guildMemberUpdate'
        })
    }

    run = async (memberBefore, memberAfter) => {
        const { boosterRoleId, boosterAnnouncementChannelId, Colors } = memberAfter.client.config
        const rolesBefore = memberBefore.roles.cache.find(role => role.id === boosterRoleId)
        const rolesAfter = memberAfter.roles.cache.find(role => role.id === boosterRoleId)

        if (!rolesBefore && rolesAfter) {
            const randomMessage = boostMessages[Math.floor(Math.random() * boostMessages.length)]
            const embed = new EmbedBuilder()
                .setAuthor({ name: memberAfter.user.username, iconURL: memberAfter.user.avatarURL() })
                .setDescription(randomMessage)
                .setColor(Colors.custom.Booster)
                //.setThumbnail('https://i.imgur.com/SkvI1rD.gif')
            memberAfter.guild.channels.cache.get(boosterAnnouncementChannelId).send({ embeds: [embed] })
        }
    }
}