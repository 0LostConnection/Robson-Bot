const { Schema, model } = require('mongoose')

const guildSchema = new Schema({
    _id: String,
})

module.exports = model('guilds', guildSchema)