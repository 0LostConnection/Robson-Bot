const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js')
const Command = require('../../infra/structures/CommandStructure')

const contactButton = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel('Contacte-me!')
            .setEmoji('🔗')
            .setURL('https://discord.com/users/437249534096048130')
    )

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'info',
            description: 'Informações legais sobre o bot :)',
            disabled: false,
            default_member_permissions: null,
            dm_permission: true,
        })
    }

    run = (interaction) => {
        const { Colors } = interaction.client.config
        const embed = new EmbedBuilder()
            .setTitle("Robson Bot")
            .setDescription("Versão desenvolvida especialmente para o **Mini Fazenda**.\n\n**Criado por**: `LostConnection#4460`\n**Versão**: `1.0.1`\n**Hospedagem**: `Discloud - Plano Gratuito`")
            .setFooter({ text: "Mini Fazenda", iconURL: interaction.guild.iconURL({ animated: true }) })
            .setColor(Colors.custom.Emerald)

        interaction.reply({ embeds: [embed], components: [contactButton]})
    }
}