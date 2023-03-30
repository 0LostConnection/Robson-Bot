const eventStructure = require(`../../infra/structures/EventStructure`)
const setPresence = require(`../../infra/utils/Presence`)

module.exports = class extends eventStructure {
    constructor(client) {
        super(client, {
            name: 'ready'
        })
    }

    run = async (interaction) => {
        console.log(`
Status          Online
Nome            ${this.client.user.tag}
Servidores      ${this.client.guilds.cache.size}
        `)
        this.client.deployCommands()

        // Presence
        setInterval(await setPresence(this.client), 5000);
    }
}