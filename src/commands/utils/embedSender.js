const Command = require('../../infra/structures/CommandStructure')
const { PermissionFlagsBits } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'test',
            description: 'Envia um embed baseado no código JSON provido.',
            disabled: false,
            default_member_permissions: Number(PermissionFlagsBits.ManageGuild),
            options: [
                {
                    type: 'STRING',
                    name: 'JSON',
                    description: 'Código JSON da mensagem.',
                    required: true,
                    choices: [
                        {
                            name: 'JSON code',
                            description: 'Código JSON da mensagem'
                        }
                    ]
                }
            ]
        })
    }

    run = (interaction) => {
        interaction.reply({ content: 'Hello!', ephemeral: true })
    }
}