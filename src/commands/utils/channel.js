const Command = require('../../infra/structures/CommandStructure')
const Database = require('../../database/Database')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'channel',
            description: 'Opções de utilitários para o canal.',
            disabled: true,
            default_member_permissions: null,
            dm_permission: false,
            options: [
                {
                    type: 1,
                    name: "lock",
                    description: "Trava o chat para que @everyone não consiga enviar mensagens."
                },
                {
                    type: 1,
                    name: "unlock",
                    description: "Destrava o chat."
                },
                {
                    type: 1,
                    name: "view",
                    description: "Torna o chat visível para @everyone."
                },
                {
                    type: 1,
                    name: "unview",
                    description: "Torna o chat invisível para @everyone."
                },
            ]
        })
    }

    run = async (interaction) => {
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
        interaction.deferReply({ ephemeral: true })

        const db = new Database(interaction.guild.id)
        const connection = await db.connect()

        const { Embeds } = interaction.client.config
        const { adminRoleId, modRoleId, eventsModRoleId, staffRoleId } = connection.guild.setup.roles
        await connection.disconnect()

        if (interaction.member.roles.cache.find(r => r.id === adminRoleId) || interaction.member.roles.cache.find(r => r.id === modRoleId) || interaction.member.roles.cache.find(r => r.id === eventsModRoleId)) {
            const subCommand = interaction.options.getSubcommand()
            require(`../../subCommands/channel/${subCommand}`)(this.client, interaction, staffRoleId)
        } else {
            return interaction.editReply({ embeds: [Embeds.ERROR("**❌ | Você não tem permissão para executar esse comando!**", interaction)], ephemeral: true })
        }
    }
}