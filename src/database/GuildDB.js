const Database = require('./Database')

module.exports = class extends Database {
    constructor() {
        super(process.env.DATABASE_SECRET)
    }

    async guild(guildId) {
        const guilds = require('./models/Guild')
        const connection = await super.connect()
        const database = { connection, guilds }

        return await database.guilds.findById(guildId) || new database.guilds({ _id: guildId })
    }

    async disconnect() {
        await super.disconnect()
    }
}