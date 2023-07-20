const Command = require('../../infra/structures/CommandStructure')
const GuildDB = require('../../database/GuildDB')

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
        const guildDB = new GuildDB()
        const guild = await guildDB.guild(interaction.guild.id)
        guild.setup.roles.staffRoleId = '1023701403371323463'
        await guild.save()
        guildDB.disconnect()
        console.log(guild)
    }
}