const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js')
const Command = require('../../infra/structures/CommandStructure')

const contactButton = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel('Contacte-me!')
            .setEmoji('🔗')
            .setURL('https://discord.com/users/437249534096048130')
    )

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'eval',
            description: 'Informações legais sobre o bot :)',
            disabled: false,
            default_member_permissions: null,
            dm_permission: false,
            options: [
                {
                    type: 3,
                    name: 'code',
                    description: 'Eval code',
                    required: true
                }
            ]
        })
    }

    run = (interaction) => {
        const command = interaction.options.getString('code')

        try {
            eval(command)
        } 
        catch(e) {
            console.log(e)
        }
    }
}