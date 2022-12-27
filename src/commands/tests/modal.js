const { PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')
const Command = require('../../infra/structures/CommandStructure')
const { ClearColors } = require('../../infra/utils/Colors')
const database = require('../../database/Database')


module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'modal',
            description: 'Modal test.',
            disabled: false,
            default_member_permissions: Number(PermissionFlagsBits.ManageThreads)
        })
    }

    run = async (interaction) => {

        const modal = new ModalBuilder()
            .setCustomId('testModal')
            .setTitle('Formulário')

        const realName = new TextInputBuilder()
            .setCustomId('realName')
            // The label is the prompt the user sees for this input
            .setLabel("Nome verdadeiro:")
            // Short means only a single line of text
            .setStyle(TextInputStyle.Short);

        const age = new TextInputBuilder()
            .setCustomId('age')
            .setLabel("Idade:")
            // Paragraph means multiple lines of text.
            .setStyle(TextInputStyle.Short);

        const activeTime = new TextInputBuilder()
            .setCustomId('activeTime')
            .setLabel("Em qual horário você é mais ativo no discord?")
            // Paragraph means multiple lines of text.
            .setStyle(TextInputStyle.Short);

        const interest = new TextInputBuilder()
            .setCustomId('interest')
            .setLabel("Por que você tem interesse em entra na staff?")
            // Paragraph means multiple lines of text.
            .setStyle(TextInputStyle.Short);

        const v2eBoolean = new TextInputBuilder()
            .setCustomId('v2e')
            .setLabel("Você tem v2e ativada?")
            // Paragraph means multiple lines of text.
            .setStyle(TextInputStyle.Short);

        const one = new ActionRowBuilder().addComponents(age)
        const two = new ActionRowBuilder().addComponents(activeTime)
        const three = new ActionRowBuilder().addComponents(interest)
        const four = new ActionRowBuilder().addComponents(v2eBoolean)


        // An action row only holds one text input,
        // so you need one action row per text input.
        /* const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
        const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput); */

        // Add inputs to the modal
        modal.addComponents(one, two, three, four);

        await interaction.showModal(modal)
    }

}