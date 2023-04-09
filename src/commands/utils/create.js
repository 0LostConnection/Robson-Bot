const Command = require('../../infra/structures/CommandStructure')
const Database = require('../../database/Database')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'criar',
            description: 'Cria algo baseado nas opções escolhidas.',
            dm_permissions: false,
            options: [
                {
                    type: 1,
                    name: 'canal',
                    description: 'Cria um canal na categoria de eventos.',
                    options: [
                        {
                            type: 3,
                            name: 'função',
                            description: 'Função do canal',
                            required: true,
                            choices: [
                                {
                                    name: 'Evento',
                                    value: 'channelFunction:Event'
                                }
                            ]
                        },
                        {
                            type: 3,
                            name: 'nome',
                            description: 'Nome do canal.',
                            required: true
                        },
                        {
                            type: 3,
                            name: 'emoji',
                            description: 'Emoji do canal.',
                        }
                    ]
                }
            ]
        })
    }

    run = async (interaction) => {
        interaction.deferReply({ ephemeral: true })

        const db = await Database(interaction.guild.id)

        const { Embeds } = interaction.client.config
        const { adminRoleId, eventsModRoleId } = db.guild.setup.roles
        db.disconnect()

        if (interaction.member.roles.cache.find(r => r.id === adminRoleId) || interaction.member.roles.cache.find(r => r.id === eventsModRoleId)) {
            const subCommand = interaction.options.getSubcommand()
            require(`../../subCommands/criar/${subCommand}`)(this.client, interaction)
        } else {
            interaction.editReply({ embeds: [Embeds.ERROR("**❌ | Você não tem permissão para executar esse comando!**", interaction)], ephemeral: true })
            return
        }
    }
}