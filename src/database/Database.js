module.exports = async (guildId) => {
    if (!guildId) return console.log('Provide and ID!')
    const { connect, set } = require('mongoose')
    const Models = require('./Models')
    
    set("strictQuery", true)
    const connection = await connect(process.env.DATABASE_SECRET)

    console.log('\x1b[32m%s\x1b[0m', 'Banco de dados conectado com sucesso!')

    const database = { connection, ...Models }
    return {
        guild: await database.guilds.findById(guildId) || new database.guilds({ _id: guildId }),
        disconnect: () => {
            connection.disconnect().then(() => {
                console.log('\x1b[32m%s\x1b[0m', 'Conexão com o banco de dados encerrada!')
            })
        }
    }
}