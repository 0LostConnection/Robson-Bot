const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { Colors } = require('../../../config')

module.exports = {
    // Embeds
    embedSetup: new EmbedBuilder()
        .setTitle('Configuração')
        .setColor(Colors.custom.Emerald)
        .setDescription(`**Escolha uma das categorias abaixo para configurar:**`),
    //.setImage('https://i.imgur.com/UWJwuGw.png'),

    embedSetupRoles: new EmbedBuilder()
        .setTitle('Configuração - Cargos')
        .setColor(Colors.custom.Emerald)
        .setDescription(`**Escolha uma das configurações de \`@cargo\` abaixo para alterar:**`),
    //.setImage('https://i.imgur.com/UWJwuGw.png'),

    embedSetupChannels: new EmbedBuilder()
        .setTitle('Configuração - Canais')
        .setColor(Colors.custom.Emerald)
        .setDescription(`**Escolha uma das configurações de \`#canal\` abaixo para alterar:**`),
    //.setImage('https://i.imgur.com/UWJwuGw.png'),

    embedSetupCancel: new EmbedBuilder()
        .setTitle('Operação cancelada')
        .setColor(Colors.clear.Red)
        .setDescription(`Ok, configuração cancelada.`),

    // Buttons
    buttonsSetup: new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('button:SetupRoles')
                .setStyle(ButtonStyle.Secondary)
                .setLabel('Cargos')
                .setEmoji('👥'),
            new ButtonBuilder()
                .setCustomId('button:SetupChannels')
                .setStyle(ButtonStyle.Secondary)
                .setLabel('Canais')
                .setEmoji('💬'),
            /* new ButtonBuilder()
                .setCustomId('button:SetupCancel')
                .setStyle(ButtonStyle.Danger)
                .setLabel('Cancelar')
                .setEmoji('🙅') */
        ),

    buttonsSetupRoles: new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('button:SetupRoles:Staff')
                .setStyle(ButtonStyle.Secondary)
                .setLabel('Membro Staff')
                .setEmoji('👥'),
            new ButtonBuilder()
                .setCustomId('button:SetupRoles:Adms')
                .setStyle(ButtonStyle.Secondary)
                .setLabel('Administrador')
                .setEmoji('🔱'),
            new ButtonBuilder()
                .setCustomId('button:SetupRoles:Mods')
                .setStyle(ButtonStyle.Secondary)
                .setLabel('Moderador')
                .setEmoji('🔰'),
            new ButtonBuilder()
                .setCustomId('button:SetupRoles:EventsMods')
                .setStyle(ButtonStyle.Secondary)
                .setLabel('Equipe de Eventos')
                .setEmoji('🎉'),
            new ButtonBuilder()
                .setCustomId('button:SetupRoles:Boosters')
                .setStyle(ButtonStyle.Secondary)
                .setLabel('Booster')
                .setEmoji('💠')
        ),

    buttonsSetupChannels: new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('button:SetupChannels:VentingChannel')
                .setStyle(ButtonStyle.Secondary)
                .setLabel('Desabafos')
                .setEmoji('😔'),
                new ButtonBuilder()
                .setCustomId('button:SetupChannels:BackupVentingChannel')
                .setStyle(ButtonStyle.Secondary)
                .setLabel('Backup Desabafos')
                .setEmoji('🧭'),
            new ButtonBuilder()
                .setCustomId('button:SetupChannels:BoostChannel')
                .setStyle(ButtonStyle.Secondary)
                .setLabel('Anúncio de Boost')
                .setEmoji('💠'),
            new ButtonBuilder()
                .setCustomId('button:SetupChannels:EventsCategory')
                .setStyle(ButtonStyle.Secondary)
                .setLabel('Categoria de Eventos')
                .setEmoji('🎉'),
        )
}