const messageComponents = require('../../infra/setup/messageComponents')
const { roleCollector, channelCollector } = require('../../infra/setup/setupFunctions')
const Command = require('../../infra/structures/CommandStructure')
const { PermissionFlagsBits } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'setup',
            description: 'Configuração do bot.',
            default_member_permissions: Number(PermissionFlagsBits.ManageGuild),
            dm_premission: false
        })
    }

    run = (interaction) => {
        // First setup page
        interaction.reply({ embeds: [messageComponents.embedSetup], components: [messageComponents.buttonsSetup] })

        const buttonFilter = i => i.user.id === interaction.user.id
        let buttonCollector = interaction.channel.createMessageComponentCollector({ buttonFilter, time: 15000 })

        // Secong setup page: Roles or Channels
        buttonCollector.on('collect', async i => {
            switch (i.customId) {
                case 'button:SetupRoles':
                    i.update({ embeds: [messageComponents.embedSetupRoles], components: [messageComponents.buttonsSetupRoles] })
                    buttonCollector.stop()

                    // Start of the second step: initializing collector and doing some shit
                    buttonCollector = interaction.channel.createMessageComponentCollector({ buttonFilter, time: 15000 })
                    buttonCollector.on('collect', async i => {
                        switch (i.customId) {
                            case 'button:SetupRoles:Staff':
                                buttonCollector.stop()
                                roleCollector(i, 'staffRoleId')
                                break
                            case 'button:SetupRoles:Adms':
                                buttonCollector.stop()
                                roleCollector(i, 'adminRoleId')
                                break
                            case 'button:SetupRoles:Mods':
                                buttonCollector.stop()
                                roleCollector(i, 'modRoleId')
                                break
                            case 'button:SetupRoles:EventsMods':
                                buttonCollector.stop()
                                roleCollector(i, 'eventsModRoleId')
                                break
                            case 'button:SetupRoles:Boosters':
                                buttonCollector.stop()
                                roleCollector(i, 'boostersRoleId')
                                break
                        }
                    })
                    break
                case 'button:SetupChannels':
                    i.update({ embeds: [messageComponents.embedSetupChannels], components: [messageComponents.buttonsSetupChannels] })
                    buttonCollector.stop()

                    // Start of the second step: initializing collector and doing some shit
                    buttonCollector = interaction.channel.createMessageComponentCollector({ buttonFilter, time: 15000 })
                    buttonCollector.on('collect', async i => {
                        switch (i.customId) {
                            case 'button:SetupChannels:BoostChannel':
                                buttonCollector.stop()
                                channelCollector(i, 'boosterAnnouncementChannelId', 0)
                                break
                            case 'button:SetupChannels:EventsCategory':
                                buttonCollector.stop()
                                channelCollector(i, 'eventsCategoryId', 4)
                                break
                        }
                    })
                    break
                case 'button:SetupCancel':
                    buttonCollector.stop()
                    i.channel.send({ embeds: [messageComponents.embedSetupCancel], components: [] })
                    break
            }
        })
    }
}