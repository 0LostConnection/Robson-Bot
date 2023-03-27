const Command = require('../../infra/structures/CommandStructure')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'channel',
            description: 'Opções de utilitários para o canal.',
            disabled: false,
            default_member_permissions: null,
            dm_permission: false,
            options: [
                {
                    type: 1,
                    name: "lock",
                    description: "lock"
                },
                {
                    type: 1,
                    name: "unlock",
                    description: "unlock"
                },
                {
                    type: 1,
                    name: "view",
                    description: "view"
                },
                {
                    type: 1,
                    name: "unview",
                    description: "unview"
                },
            ]
        })
    }

    run = (interaction) => {
        // Filtrar cargo da pessoa por moderador, administrador e eventos
        /* switch(subCommand) {
            case "lock":
                break
            case "unlock": 
                break
            case "view":
                break
            case "unview":
                break 
        } */
        const { adminRoleId, modRoleId, eventsModRoleId } = interaction.client.config
        if (interaction.member.roles.cache.find(r => r.id === adminRoleId) || interaction.member.roles.cache.find(r => r.id === modRoleId) || interaction.member.roles.cache.find(r => r.id === eventsModRoleId)) {
            const subCommand = interaction.options.getSubcommand()
            require(`../../subCommands/channel/${subCommand}`)(this.client, interaction)
        } else {
            interaction.reply({ content: "Not ok" })
            return
        }
    }
}