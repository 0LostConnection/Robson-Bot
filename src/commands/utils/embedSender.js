const Command = require('../../infra/structures/CommandStructure')
const { PermissionFlagsBits } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'test2',
            description: 'Envia um embed baseado no código JSON provido.',
            disabled: false,
            default_member_permissions: Number(PermissionFlagsBits.ManageGuild),
            options: [
                {
                    type: 7,
                    name: 'canal',
                    description: 'Canal para enviar a mensagem embed.',
                    required: true
                },
                {
                    type: 3,
                    name: 'json',
                    description: 'Código JSON da mensagem.',
                    required: true
                },
                {
                    type: 3,
                    name: 'thread',
                    description: 'ID da thread.',
                    required: false
                }
            ]
        })
    }

    run = async (interaction) => {
        let data = {}
        const channelId = interaction.options.getChannel('canal').id
        const channel = interaction.guild.channels.cache.get(channelId)

        try {
            const embedJSON = JSON.parse(interaction.options.getString('json')) //verificar se o json é válido ultils/isJson https://learnersbucket.com/examples/javascript/how-to-validate-json-in-javascript/
            data.embeds = [embedJSON]
        }
        catch (err) {
            interaction.reply({ content: `**Ocorreu um erro:**\n${err.message}`, ephemeral: true })
            console.log(err.message)
            return
        }

        const threadId = interaction.options.getString('thread')
        if (threadId) {
            if(channel.type !== 15) return interaction.reply({ content: `**Ocorreu um erro:**\nO canal provido não é um fórum!`, ephemeral: true })
            data.threadId = threadId
        }

        const webhooks = await channel.fetchWebhooks()
        const webhook = webhooks.first()
        if (!webhook) return interaction.reply({ content: '**Ocorreu um erro:**\nO canal não possui webhooks.', ephemeral: true })

        console.log(data)
        webhook.send(data)
            .then(() => {
                interaction.reply({content: `Embed enviado! Confira: ${channel}`, ephemeral: true})
            })
            .catch(err => {
                interaction.reply({ content: `**Ocorreu um erro:**\n${err.message}`, ephemeral: true })
                console.log(err.message)
            })
    }
}