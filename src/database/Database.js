module.exports = async (guildId) => {
    if (!guildId) return console.log('Provide and ID!')
    const { connect, set, connection, disconnect } = require('mongoose')
    const Models = require('./Models')

    set("strictQuery", true)
    const databaseConnection = await connect(process.env.DATABASE_SECRET, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log('\x1b[32m%s\x1b[0m', 'Banco de dados conectado com sucesso!'))
        .catch(err => console.error('Erro ao conectar com MongoDB: ' + err));

    const database = { databaseConnection, ...Models }
    return {
        //client: await database.client 
        guild: await database.guilds.findById(guildId) || new database.guilds({ _id: guildId }),
        disconnect: () => {
            connection.close(function (err) {
                if (err) {
                    console.error('Erro ao desconectar do banco de dados: ' + err);
                } else {
                    disconnect()
                    console.log('\x1b[32m%s\x1b[0m', 'Desconexão do banco de dados bem-sucedida!');
                }
            });
        }
    }
}
