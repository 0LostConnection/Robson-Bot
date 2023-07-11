const { Schema, model } = require('mongoose')

const clientSchema = new Schema({
    webhooks: {
        ERROR: {
            id: String,
            token: String,
        }
    }
})

module.exports = model('config', clientSchema)