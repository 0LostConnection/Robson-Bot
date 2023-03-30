module.exports = async (client) => {
    const { statusArray } = client.config
    const option = Math.floor(Math.random() * statusArray.length);
    try {
        await client.user.setPresence({
            activities: [
                {
                    name: statusArray[option].content,
                    type: statusArray[option].type,
                    url: statusArray[option].url
                },
            ],
            status: statusArray[option].status
        })
    } catch (error) {
        console.error(error);
    }
}