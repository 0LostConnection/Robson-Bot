const { PermissionFlagsBits, ChannelType, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js')
const { writeFileSync } = require('fs')
const Command = require('../../infra/structures/CommandStructure')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'setup_ticket',
            description: 'teste.',
            disabled: false,
            default_member_permissions: Number(PermissionFlagsBits.ManagGuild),
            options: [
                {
                    name: 'canal',
                    description: 'canal',
                    type: 7,
                    required: true,
                },
                {
                    name: 'cargo-suporte',
                    description: 'cargo de suporte',
                    type: 8,
                    required: true,
                },
                {
                    name: 'categoria-aberto',
                    description: 'categoria para tickets abertos',
                    type: 7,
                    required: true,
                },
                {
                    name: 'categoria-fechado',
                    description: 'categoria para tickets fechados',
                    type: 7,
                    required: true,
                },
                {
                    name: 'tipo',
                    description: 'tipo do embed',
                    type: 3,
                    required: true,
                    choices: [
                        {
                            name: 'suporte',
                            value: 'suporte'
                        },
                        {
                            name: 'atendimento',
                            value: 'atendimento'
                        }

                    ]
                }
            ]
        })
    }

    run = async (interaction) => {
        const { Embeds, Colors } = interaction.client.config
        const channel = interaction.options.getChannel('canal')
        const supportRole = interaction.options.getRole('cargo-suporte')
        const openCategory = interaction.options.getChannel('categoria-aberto')
        const closeCategory = interaction.options.getChannel('categoria-fechado')
        const type = interaction.options.getString('tipo')

        await interaction.deferReply({ ephemeral: true })
        // Verificar se o canal é um canal de texto
        if (channel.type !== ChannelType.GuildText) return interaction.editReply({ embeds: [Embeds.ERROR('A opção `canal` precisa ser um canal de texto!')] })
        if (openCategory.type !== ChannelType.GuildCategory) return interaction.editReply({ embeds: [Embeds.ERROR('A opção \`categoria-aberto\` precisa ser uma categoria!')] })
        if (closeCategory.type !== ChannelType.GuildCategory) return interaction.editReply({ embeds: [Embeds.ERROR('A opção \`categoria-fechado\` precisa ser uma categoria!')] })

        let panel = {},
            panel_message = {},
            message = {},
            ticketData = {}

        switch (type) {
            case 'suporte':
                panel = new ActionRowBuilder().addComponents(
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

                panel_message = new EmbedBuilder()
                    .setColor(Colors.custom.Orange)
                    .setTitle("👮‍♀️ | Central de Ajuda Mini Fazenda")
                    .setDescription("Nessa seção, você poderá tirar suas dúvidas, entrar em contato com a equipe do Mini Fazenda para denúncias ou resolução de problemas.\n\nPara evitar problemas, leia atentanmente todas as opções!")
                    .setImage("https://images-ext-1.discordapp.net/external/n4iDV71GduYbaUUr1JbvNwrjv4SWp_i0JkMQ0Wp8V5U/%3Fwidth%3D3840%26format%3Dpng%26auto%3Dwebp%26v%3Denabled%26s%3D06049e204412f85d0a1f2dcd8ed7f38ce81b35b6/https/preview.redd.it/oe901qo4hth61.png")

                message = await channel.send({ embeds: [panel_message], components: [panel] })
                await interaction.editReply({ embeds: [Embeds.SUCCESS('🎫 O sistema de ticket foi configurado!')] })

                ticketData = {
                    type: type,
                    channelId: channel.id,
                    messageId: message.id,
                    supportRoleId: supportRole.id,
                    openCategoryId: openCategory.id,
                    closeCategoryId: closeCategory.id
                }
                writeFileSync(`${process.cwd()}/data/tickets/${channel.id}.json`, JSON.stringify(ticketData, null, 4)) // Write the data to the file.

                break
            case 'atendimento':
                panel = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId("selectmenu_help")
                        .setPlaceholder("Escolha uma opção...")
                        .addOptions([
                            {
                                value: "option_pagamentos",
                                label: "Pagamentos",
                                description: "Realize aqui suas compras",
                                emoji: "💵"
                            },
                            {
                                value: "option_cores",
                                label: "Cores",
                                description: "Já possuí vantagem? Troque a cor do seu nick!",
                                emoji: "🌈"
                            },
                            {
                                value: "option_gerenciar",
                                label: "Cargo/Canais",
                                description: "Já possuí vantagem? Crie um cargo/canal para você!",
                                emoji: "🚧"
                            }
                        ])
                )

                panel_message = new EmbedBuilder()
                    .setColor(Colors.custom.Orange)
                    .setTitle("🔔 | Central de Atendimento Mini Fazenda")
                    .setDescription("**Crie um ticket para:**\n> :dollar: | **Pagamentos**\n> Realizar suas compras de **__Vantagens__** e **__VIPs__ ** e **__etc__**.\n\n> :rainbow: | **Cores**\n> Trocar a cor de seu nome se você é da **__Família__**, **__Booster__**, **__VIP__** ou comprou a **__Troca de Cor__**.\n\n> :construction: | **Cargos/Canais**\n> Conferir criar/gerenciar seus **__Cargos__** e **__Canais__**.")
                    .setImage("https://images-ext-1.discordapp.net/external/n4iDV71GduYbaUUr1JbvNwrjv4SWp_i0JkMQ0Wp8V5U/%3Fwidth%3D3840%26format%3Dpng%26auto%3Dwebp%26v%3Denabled%26s%3D06049e204412f85d0a1f2dcd8ed7f38ce81b35b6/https/preview.redd.it/oe901qo4hth61.png")

                message = await channel.send({ embeds: [panel_message], components: [panel] })
                await interaction.editReply({ embeds: [Embeds.SUCCESS('🎫 O sistema de ticket foi configurado!')] })

                ticketData = {
                    type: type,
                    channelId: channel.id,
                    messageId: message.id,
                    supportRoleId: supportRole.id,
                    openCategoryId: openCategory.id,
                    closeCategoryId: closeCategory.id
                }
                writeFileSync(`${process.cwd()}/data/tickets/${channel.id}.json`, JSON.stringify(ticketData, null, 4)); // Write the data to the file.
                break
        }


    }

}