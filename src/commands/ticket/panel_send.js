const { PermissionFlagsBits, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js')
const Command = require('../../infra/structures/CommandStructure')
const { ClearColors } = require('../../infra/utils/Colors')

const panel = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
        .setCustomId("selectmenu_help")
        .setPlaceholder("Escolha uma opção...")
        .addOptions([
            {
                value: "option_denunciar",
                label: "Denúnciar alguém",
                description: "Denunciar um membro do servidor.",
                emoji: "🚨"
            },
            {
                value: "option_suporte",
                label: "Suporte",
                description: "Dúvidas, resolução de problemas, etc...",
                emoji: "❔"
            }
        ])
)

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'panel',
            description: 'Envia o painel de ticket de suporte.',
            disabled: false,
            default_member_permissions: Number(PermissionFlagsBits.ManageGuild)
        })
    }

    run = (interaction) => {
        const panel_message = new EmbedBuilder()
            .setColor("#ee9356")
            .setTitle("Central de ajuda Mini Fazenda")
            .setDescription("Nessa seção, você poderá tirar suas dúvidas ou entrar em contato com a equipe do Mini Fazenda.\n\nPara evitar problemas, leia atentanmente todas as opções!")
            .setImage("https://images-ext-1.discordapp.net/external/n4iDV71GduYbaUUr1JbvNwrjv4SWp_i0JkMQ0Wp8V5U/%3Fwidth%3D3840%26format%3Dpng%26auto%3Dwebp%26v%3Denabled%26s%3D06049e204412f85d0a1f2dcd8ed7f38ce81b35b6/https/preview.redd.it/oe901qo4hth61.png")

        interaction.reply({ content: "Ok", ephemeral: true })
        interaction.channel.send({ embeds: [panel_message], components: [panel] })
    }

}