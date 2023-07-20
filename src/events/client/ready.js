const eventStructure = require(`../../infra/structures/EventStructure`)
const GuildDB = require('../../database/GuildDB')
const { writeFileSync } = require('fs')

module.exports = class extends eventStructure {
    constructor(client) {
        super(client, {
            name: 'ready'
        })
    }

    run = async (interaction) => {
        // Generate guild cache
        const guildsID = this.client.guilds.cache.map(guild => guild.id)
        guildsID.forEach(async guildId => {
            const guildDB = new GuildDB()
            const guild = await guildDB.guild(guildId)
            const tempJson = {
                ventingChannelId: guild.setup.channels.ventingChannelId ? guild.setup.channels.ventingChannelId : null
            }

            await guildDB.disconnect()

            try {
                writeFileSync(`${process.cwd()}/src/database/cache/${guildId}.json`, JSON.stringify(tempJson, null, 4))
                console.log(`${guildId} cached`)
            } catch (err) {
                console.log(`Error caching guild id ${guildId}!`)
            }
        })

        console.log(`
Status          Online
Nome            ${this.client.user.tag}
Servidores      ${this.client.guilds.cache.size}
        `)
        this.client.deployCommands()

        // Presence
        setInterval(() => {
            const { statusArray } = this.client.config
            const option = Math.floor(Math.random() * statusArray.length)
            this.client.user.setPresence({
                activities: [
                    {
                        name: statusArray[option].content,
                        type: statusArray[option].type,
                        url: statusArray[option].url
                    },
                ],
                status: statusArray[option].status
            })
        }, 30000)//1000*60*15);

    }
}