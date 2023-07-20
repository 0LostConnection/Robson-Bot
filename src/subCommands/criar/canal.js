const Database = require('../../database/Database')
const { PermissionFlagsBits } = require('discord.js')

module.exports = async (client, interaction) => {
    if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ManageChannels, true)) {
        return interaction.editReply({ embeds: [client.config.Embeds.ERROR('Ocorreu um erro! Não tenho permissão de editar/criar canais!', interaction)] })
    }

    const channelFunction = interaction.options.getString('função')
    const channelEmoji = interaction.options.getString('emoji')
    let channelName = interaction.options.getString('nome')

    switch (channelFunction) {
        case 'channelFunction:Event':
            const db = await new Database(interaction.guild.id).connect()
            const { eventsCategoryId } = db.guild.setup.channels
            const { eventsModRoleId, staffRoleId } = db.guild.setup.roles

            await db.disconnect()

            if (channelEmoji) channelName = `・${channelEmoji}・${channelName}`

            channel = interaction.guild.channels.create({
                name: channelName,
                type: 0,
                parent: eventsCategoryId,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: [PermissionFlagsBits.SendMessages]
                    },
                    {
                        id: eventsModRoleId,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
                    },
                    {
                        id: staffRoleId,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
                    }
                ]
            }).then(channel => {
                interaction.editReply({ embeds: [client.config.Embeds.SUCCESS(`Canal criado com sucesso! ${channel}`, interaction)] })
                channel.send({ content: `${interaction.user}` })
            })
            break
    }
}