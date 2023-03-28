const DiscordClientHandler = require('./src/infra/structures/DiscordClientHandler')
const { GatewayIntentBits } = require('discord.js')
require('dotenv').config()

const botInstance = new DiscordClientHandler({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
})

botInstance.config = require('./config.js')
botInstance.login("MTA5MDA5NDMyOTQ0OTY4MDkyNg.GAaIa9.AzhVqlfkeBLYmYSyOxOftW3lcXFNpy513SgEcA")