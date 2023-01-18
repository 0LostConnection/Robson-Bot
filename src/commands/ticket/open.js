const { PermissionFlagsBits, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js')
const Command = require('../../infra/structures/CommandStructure')
const { ClearColors } = require('../../infra/utils/Colors')
const openTicket = require('../../infra/ticket/openTicket')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'open',
            description: 'Envia o painel de ticket de suporte.',
            disabled: false,
            default_member_permissions: Number(PermissionFlagsBits.ManageGuild)
        })
    }

    run = (interaction) => {
        openTicket(interaction)
    }

}