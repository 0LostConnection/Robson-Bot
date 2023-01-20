const eventStructure = require(`../../infra/structures/EventStructure`)
const createTicket = require(`../../infra/ticket/createTicket`)

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

            switch (interaction.values[0]) {
                case "option_denunciar":
                    await interaction.deferReply({ ephemeral: true })
                    await createTicket(interaction, { channelName: 'denúncia', createdMessage: `**📩 | ${interaction.user} Ticket de denúncia criado!**\n\nEnvie todas as informações possíveis sobre seu caso e aguarde até que um atendente responda.\n\nApós a sua questão ser sanada, você pode usar clicar em **\"\\close\"** para encerrar o atendimento!`})
                    break

                case "option_suporte":
                    await interaction.deferReply({ ephemeral: true })
                    await createTicket(interaction, { channelName: 'suporte', createdMessage: `**📩 | ${interaction.user} Ticket de suporte criado!**\n\nEnvie todas as informações possíveis sobre seu caso e aguarde até que um atendente responda.\n\nApós a sua questão ser sanada, você pode usar clicar em **\"Fechar Ticket\"** para encerrar o atendimento!`})
                    break
            }
            // Tentar fazer com que a seleção do selectmenu reinicie, assim, voltando para o placeholder.
            //interaction.components[0].placeholder = "Escolha uma opção..."
        }


    }
}