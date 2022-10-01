const { PermissionFlagsBits, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js')
const Command = require('../../infra/structures/CommandStructure')
const { ClearColors } = require('../../infra/utils/Colors')

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
            disabled: false,
            default_member_permissions: Number(PermissionFlagsBits.ManageThreads)
        })
    }

    run = async (interaction) => {

        let embed = new EmbedBuilder()
            .setTitle(`Perfil de ${interaction.user.tag}`)
            .setColor(ClearColors.Yellow)
            .setDescription(`[Clique aqui para acessar o perfil de ${interaction.user.tag}](https://discord.com/users/437249534096048130)`)
            .setFooter({ text: 'Ou clique no botão abaixo.' })

        embed = {
            "title": "EQUIPE DE MODERAÇÃO",
            "description": "> A equipe de moderação consiste em manter a ordem nos chats e calls, recepção e acolhimento dos membros e movimentação do chat",
            "color": 2884684,
            "fields": [
                {
                    "name": "Acolhimento e recepção",
                    "value": "> É importante sempre ficar atento a chegada de novos membros, dar as boas vindas e tentar puxar assunto para que o membro se sinta acolhido e confortável!"
                },
                {
                    "name": "Punições",
                    "value": "> Sempre fiquem atentos ao chat, para que caso vejam uma cena de desrespeito, exposição sem autorização e outras regras do servidor que estejam sendo quebrada, para que você peça que o membro pare, e caso não parar, de a devida punição para manter a paz no chat"
                },
                {
                    "name": "Movimentação",
                    "value": "> É importante que quando verem que o chat esta morto, marquem o ping e tentem puxar assunto com os membros, afinal só vocês podem marcar ele"
                }
            ],
            "image": {
                "url": "https://media.discordapp.net/attachments/871545524908601396/999101281538945135/246f1c3e-3739-4925-a6d7-749250d28a0f.png?width=1296&height=490"
            }
        }

        interaction.reply({ embeds: [embed], components: [replyButton], ephemeral: false })
    }

}