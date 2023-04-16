const Command = require('../../infra/structures/CommandStructure')
const Database = require('../../database/Database')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'test',
            description: 'Teste :)',
            disabled: false,
            default_member_permissions: null,
            dm_permission: false,
        })
    }

    run = async (interaction) => {
        // Testing new database class
        /* const db = await new Database(interaction.guild.id).connect()
        db.config.webhooks.ERROR.id = '123123123'
        db.config.save()
        await db.disconnect() */

        const { getGuildChannels } = require('../../utils/discordSerializer')

        const guildChannels = getGuildChannels(interaction.guild, false, true)
        console.log(guildChannels)

    }
}