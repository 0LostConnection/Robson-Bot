const Command = require('../../infra/structures/CommandStructure')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'ppt',
            description: 'Pedra papel tesouuura!',
            options: [
                {
                    type: 3,
                    name: 'escolha',
                    description: 'Escolha entra pedra, papel e tesoura.',
                    required: true,
                    choices: [
                        {
                            name: 'Pedra',
                            value: 'rock',
                        },
                        {
                            name: 'Papel',
                            value: 'paper'
                        },
                        {
                            name: 'Tesoura',
                            value: 'scissors'
                        }
                    ]
                }
            ]
        })
    }

    run = (interaction) => {
        const possibleChoices = ['rock', 'paper', 'scissors']
        const dictionary = {
            'rock': 'pedra',
            'paper': 'papel',
            'scissors': 'tesoura'
        }
        const chosenOption = interaction.options.getString('escolha')
        const randomChoice = possibleChoices[Math.floor(Math.random() * possibleChoices.length)]


        interaction.reply({ content: `Você escoheu ${dictionary[chosenOption]}!\nO bot escolheu ${dictionary[randomChoice]}` })
    }
}