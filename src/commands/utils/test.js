const Command = require('../../infra/structures/CommandStructure')
const Database = require('../../database/Database')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'test',
            description: 'Teste :)',
            disabled: true,
            default_member_permissions: null,
            dm_permission: false,
        })
    }

    run = async (interaction) => {
        // Testing new database class
        const db = await new Database(interaction.guild.id).connect()
        console.log(db)
        await db.disconnect()
    }
}