const Command = require('../../infra/structures/CommandStructure')
const roleCollector = require('../../infra/setup/roleCollector')
const channelCollector = require('../../infra/setup/channelCollector')
const { embedSetup, embedSetupRoles, embedSetupChannels, buttonsSetup, buttonsSetupRoles, buttonsSetupChannels } = require('../../infra/setup/messageComponents')
const { PermissionFlagsBits } = require('discord.js')
const { Embeds } = require('../../../config')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'setup',
            description: 'setup',
            default_member_permissions: Number(PermissionFlagsBits.ManageGuild),
            dm_premission: false
        })
    }

    run = (interaction) => {
        // First setup page
        interaction.reply({ embeds: [embedSetup], components: [buttonsSetup] })

        const buttonFilter = i => i.user.id === interaction.user.id
        let buttonCollector = interaction.channel.createMessageComponentCollector({ buttonFilter, time: 15000 })

        // Secong setup page: Roles or Channels
        buttonCollector.on('collect', async i => {
            switch (i.customId) {
                case 'button:SetupRoles':
                    i.update({ embeds: [embedSetupRoles], components: [buttonsSetupRoles] })
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
                    i.update({ embeds: [embedSetupChannels], components: [buttonsSetupChannels] })
                    buttonCollector.stop()

                    // Start of the second step: initializing collector and doing some shit
                    buttonCollector = interaction.channel.createMessageComponentCollector({ buttonFilter, time: 15000 })
                    buttonCollector.on('collect', async i => {
                        switch (i.customId) {
                            case 'button:SetupChannels:BoostChannel':
                                buttonCollector.stop()
                                channelCollector(i, 'boosterAnnouncementChannelId')
                                break
                        }
                    })
                    break
            }
        })
    }
}