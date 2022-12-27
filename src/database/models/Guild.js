const { Schema, model } = require('mongoose')

const guildSchema = new Schema({
    _id: String,
    vips: [
        Object
    ],
})

module.exports = model('guilds', guildSchema)