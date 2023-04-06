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
        const db = await Database(interaction.guild.id)
        db.config.webhooks.ERROR.id = '123123123123123'
        console.log(db.config)
        db.disconnect()
    }
}