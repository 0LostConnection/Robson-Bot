const { Schema, model } = require('mongoose')

const guildSchema = new Schema({
    _id: String,
    setup: {
        channels: {
            boosterAnnouncementChannelId: String
        },
        roles: {
            staffRoleId: String,
            adminRoleId: String,
            modRoleId: String,
            eventsModRoleId: String,
            boosterRoleId: String
        }
    }
})

module.exports = model('guilds', guildSchema)