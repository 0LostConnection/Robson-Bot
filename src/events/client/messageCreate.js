const eventStructure = require('../../infra/structures/EventStructure')

module.exports = class extends eventStructure {
    constructor(client) {
        super(client, {
            name: 'messageCreate'
        })
    }

    run = async (message) => {
        
    }
}