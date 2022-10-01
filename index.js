const DiscordClientHandler = require('./src/infra/structures/DiscordClientHandler')
// const { BOT_TOKEN } = require('./assets/config.json')
const { GatewayIntentBits } = require('discord.js')
require('dotenv').config() //process.env.BOT_TOKEN

const botInstance = new DiscordClientHandler({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
})

process.openStdin('unhandledRejection', error => {
    console.error("Error:\n", error)
})

botInstance.login(process.env.BOT_TOKEN)