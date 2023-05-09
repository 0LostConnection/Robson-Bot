const Command = require('../../infra/structures/CommandStructure')
const { AttachmentBuilder } = require('discord.js')
const { profileImage } = require('discord-arts')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'perfil',
            description: 'Seu perfil do Discord de uma maneira diferente!',
            disable: true
        })
    }

    run = async (interaction) => {
        interaction.deferReply()

        //const user = interaction.user //interaction.options.getString("user")
        const imageBuffer = await profileImage(interaction.user.id, {
            locale: 'pt-BR',
            badgesFrame: true,
            squareAvatar: true,
            usernameColor: '#f6f6f6',
            borderColor: ['#f6f6f6', '#ffffff'],
            presenceStatus: interaction.member.presence.status
        })

        const attachment = new AttachmentBuilder(imageBuffer, { name: 'profile.png' })
        interaction.followUp({ files: [attachment] })
    }
}