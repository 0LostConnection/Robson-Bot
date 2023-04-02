const Command = require('../../infra/structures/CommandStructure')
const { PermissionFlagsBits } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'setup',
            description: 'Configurar dados do servidor no bot.',
            dm_permission: false,
            default_member_permissions: Number(PermissionFlagsBits.ManageThreads),
            options: [
                {
                    type: 1, // SUB_COMMAND
                    name: 'canais',
                    description: 'empty for now',
                    options: [
                        {
                            type: 3, // STRING
                            name: 'cargo',
                            description: 'empty for now',
                            required: true,
                            choices: [
                                {
                                    name: 'Canal de Boost',
                                    value: 'boosterAnnouncementChannel'
                                },
                            ]
                        },
                        {
                            type: 7, // CHANNEL
                            name: 'canal',
                            description: 'empty for now',
                            required: true
                        }
                    ]
                },
                {
                    type: 1, // SUB_COMMAND
                    name: 'cargos',
                    description: 'empty for now',
                    options: [
                        {
                            type: 3, // STRING
                            name: 'cargo',
                            description: 'empty for now',
                            required: true,
                            choices: [
                                {
                                    name: 'Staff',
                                    value: 'staffRole'
                                },
                                {
                                    name: 'Adminstrador',
                                    value: 'adminRole'
                                },
                                {
                                    name: 'Moderador',
                                    value: 'modRole'
                                },
                                {
                                    name: 'Mod Eventos',
                                    value: 'eventsModRole'
                                }
                            ]
                        },
                        {
                            type: 8, // ROLE
                            name: 'menção',
                            description: 'empty for now',
                            required: true
                        }
                    ]
                },
            ]
        })
    }

    run = async (interaction) => {
        const subCommand = interaction.options.getSubcommand()

        console.log(subCommand, choice)
        //require(`../../subCommands/setup/${subCommand}`)(this.client, interaction)
    }
}