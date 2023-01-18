const { PermissionFlagsBits, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js')
const Command = require('../../infra/structures/CommandStructure')
const { ClearColors } = require('../../infra/utils/Colors')
//const database = require('../../database/Database')

const replyButton = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel('LostConnection#4460')
            .setEmoji('🔗')
            .setURL('https://discord.com/users/437249534096048130')
    )

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'test',
            description: 'teste.',
            disabled: true,
            default_member_permissions: Number(PermissionFlagsBits.ManageThreads)
        })
    }

    run = async (interaction) => {

        let embed = new EmbedBuilder()
            .setTitle(`Perfil de ${interaction.user.tag}`)
            .setColor(ClearColors.Yellow)
            .setDescription(`[Clique aqui para acessar o perfil de ${interaction.user.tag}](https://discord.com/users/437249534096048130)`)
            .setFooter({ text: 'Ou clique no botão abaixo.' })

        await interaction.deferReply({ epemeral: true })
        /* const db = await database(1014555852469964920)
        db.disconnect() */
        await interaction.editReply({ embeds: [embed], components: [replyButton], ephemeral: true })
    }

}