const CommandStructure = require('../../infra/structures/CommandStructure')
const createCache = require('../../infra/utils/createCache')
const { PermissionFlagsBits } = require('discord.js')

module.exports = class extends CommandStructure {
    constructor(client) {
        super(client, {
            name: 'atualizar-cache',
            description: 'Atualiza o cache do servidor',
            default_member_permissions: Number([PermissionFlagsBits.Administrator]),
            dm_permission: false,
        })
    }
    
    run = async (interaction) => {
        createCache(interaction, interaction.guild.id)
    }
}