const eventStructure = require(`../../infra/structures/EventStructure`)
const Database = require('../../database/Database')
const { EmbedBuilder } = require('discord.js')
const boostMessages = [
    '**Acabou de dar boost no servidor! :scream_cat:**',
    '**Acabou de boostar o servidor! :scream_cat:\nAgradeçam! :pleading_face:**',
    '**O que é isso?! :face_with_monocle:\nObrigado pelo boost! :pleading_face:**'
]

module.exports = class extends eventStructure {
    constructor(client) {
        super(client, {
            name: 'guildMemberUpdate',
            disabled: true
        })
    }

    run = async (memberBefore, memberAfter) => {
        const db = new Database(memberAfter.guild.id)
        const connection = await db.connect()

        const { boostersRoleId } = connection.guild.setup.roles
        const { boosterAnnouncementChannelId } = connection.guild.setup.channels
        await connection.disconnect()

        const { Colors } = memberAfter.client.config
        const rolesBefore = memberBefore.roles.cache.find(role => role.id === boostersRoleId)
        const rolesAfter = memberAfter.roles.cache.find(role => role.id === boostersRoleId)

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