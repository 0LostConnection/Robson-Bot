const { PermissionFlagsBits, AttachmentBuilder } = require('discord.js')
const Command = require('../../infra/structures/CommandStructure')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'grabber',
            description: 'teste.',
            disabled: false,
            default_member_permissions: Number(PermissionFlagsBits.ManagGuild),
            options: [
                {
                    name: 'canal',
                    description: 'Id do canal',
                    type: 7,
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {
        const channel = interaction.options.getChannel("canal")

        channel.messages.fetch({ limit: 5, cache: false })
            .then(messages => {
                messages.forEach(message => {

                    message.embeds.forEach(embed => {
                        const embedObject = embed.toJSON()
                        delete embedObject.type
                        delete embedObject.image?.proxy_url
                        delete embedObject.image?.height
                        delete embedObject.image?.width
                        if (embedObject.description.length > 2000) {
                            const atc = new AttachmentBuilder(Buffer.from(JSON.stringify(embedObject, null, 4)), { name: `${channel.name}.txt` })
                            interaction.channel.send({ content: `${channel}`, files: [atc] })
                        } else {
                            interaction.channel.send({ content: `${channel}\n\`\`\`JSON\n${JSON.stringify(embedObject, null, 4)}\`\`\`` })
                        }

                    })
                })
                interaction.reply({ content: "Ok...", ephemeral: true })
            })
    }
}
