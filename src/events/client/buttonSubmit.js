const eventStructure = require(`../../infra/structures/EventStructure`)
const closeTicket =  require(`../../infra/ticket/closeTicket`)

module.exports = class extends eventStructure {
    constructor(client) {
        super(client, {
            name: 'interactionCreate'
        })
    }

    run = (interaction) => {
        if (!interaction.isButton()) return

        switch (interaction.customId) {
            case "ticket_close":
                closeTicket(interaction)
                break
        }
    }
}