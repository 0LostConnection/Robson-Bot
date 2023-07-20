const eventStructure = require('../../infra/structures/EventStructure')
const { readFileSync } = require('fs')
const { EmbedBuilder } = require('discord.js')
const { Colors } = require('../../../config')

module.exports = class extends eventStructure {
    constructor(client) {
        super(client, {
            name: 'messageCreate'
        })
    }

    run = async (message) => {
        if (message.author.bot) return
        // Venting system
        const guildCache = JSON.parse(readFileSync(`${process.cwd()}/src/database/cache/${message.guild.id}.json`, 'utf-8'))
        if (guildCache.ventingChannelId == message.channel.id) {
            try {
                await message.delete()

                let urlRegex = new RegExp(/(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z][a-z]|[a-z][a-z][a-z]|[a-z][a-z][a-z][a-z]))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/g)
                if (urlRegex.test(message.content.toLowerCase())) {
                    message.channel.send({ content: `${message.author}, você não pode enviar links!` })
                        .then((message) => {
                            setTimeout(function () {
                                message.delete();
                            }, 5000)
                        })
                    return
                }

                const backupVentingChannel = message.guild.channels.cache.get(guildCache.backupVentingChannelId)
                const backupVentingEmbed = new EmbedBuilder()
                    .setColor(Colors.clear.Water)
                    .setDescription(`>>> ${message.content}`)
                    .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL(), url: `https://discord.com/users/${message.author.id}` })
                    .setFooter({ text: `Desabafos Anônimos - ${message.guild.name}` })

                const ventingEmbed = new EmbedBuilder()
                    .setColor(Colors.clear.Water)
                    .setDescription(`>>> ${message.content}`)
                    .setFooter({ text: `Desabafos Anônimos - ${message.guild.name}` })

                if (backupVentingChannel) backupVentingChannel.send({ embeds: [backupVentingEmbed] })
                message.channel.send({ embeds: [ventingEmbed] })
            } catch (err) {
                console.log(err)
            }
        }
    }
}