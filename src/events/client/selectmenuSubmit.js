const eventStructure = require(`../../infra/structures/EventStructure`)
const ticketChannel = require(`../../infra/ticket/ticketChannel`)
const { EmbedBuilder } = require('discord.js')

module.exports = class extends eventStructure {
    constructor(client) {
        super(client, {
            name: 'interactionCreate'
        })
    }

    run = async (interaction) => {
        if (!interaction.isStringSelectMenu()) return
        //console.log(interaction)
        
        // Ticket Suporte
        if (interaction.customId === "selectmenu_help") {
            const categoryChannels = interaction.channel.parent

            switch (interaction.values[0]) {
                case "option_denunciar":

                    if (categoryChannels.children.cache.find(c => c.name.startsWith(`denúncia`) && c.name.includes(interaction.user.id))) {
                        interaction.reply({ content: "Você já tem um ticket aberto!", ephemeral: true })
                    } else {
                        ticketChannel(interaction, [
                            {
                                name: `denúncia-${interaction.user.id}`,
                                supportRoleId: "1023701403371323463",
                                parentId: "1031666309668286564",
                                replyMessage: `Criei um ticket para você!`
                            },
                            new EmbedBuilder()
                                .setDescription(`**📩 | ${interaction.user} Ticket de denúncia criado!**\n\nEnvie todas as informações possíveis sobre seu caso e aguarde até que um atendente responda.\n\nApós a sua questão ser sanada, você pode usar clicar em **\"\\close\"** para encerrar o atendimento!`)
                                .setColor("ee9356")
                        ])
                    }
                    break

                case "option_suporte":
                    if (categoryChannels.children.cache.find(c => c.name.startsWith(`suporte`) && c.name.includes(interaction.user.id))) {
                        interaction.reply({ content: "Você já tem um ticket aberto!", ephemeral: true })
                    } else {
                        ticketChannel(interaction, [
                            {
                                name: `suporte-${interaction.user.id}`,
                                supportRoleId: "1023701403371323463",
                                parentId: "1031666309668286564",
                                replyMessage: `Criei um ticket para você!`
                            },
                            new EmbedBuilder()
                                .setDescription(`**📩 | ${interaction.user} Ticket de suporte criado!**\n\nEnvie todas as informações possíveis sobre seu caso e aguarde até que um atendente responda.\n\nApós a sua questão ser sanada, você pode usar clicar em **\"\\close\"** para encerrar o atendimento!`)
                                .setColor("ee9356")
                        ])
                    }
                    break
            }
            // Tentar fazer com que a seleção do selectmenu reinicie, assim, voltando para o placeholder.
            //interaction.components[0].placeholder = "Escolha uma opção..."
        }


    }
}