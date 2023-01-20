const { PermissionFlagsBits, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js')
const Command = require('../../infra/structures/CommandStructure')
const { ClearColors } = require('../../infra/utils/Colors')
const closeTicket = require('../../infra/ticket/closeTicket')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'close',
            description: 'Envia o painel de ticket de suporte.',
            disabled: true,
            default_member_permissions: Number(PermissionFlagsBits.ManageGuild)
        })
    }

    run = (interaction) => {
        closeTicket(interaction)
    }

}