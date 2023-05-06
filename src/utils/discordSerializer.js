function getGuildChannels(guild, stringify = false) {
    if (!guild) return undefined;
    const obj = {};
    if (guild.channels !== undefined) obj.channels = guild.channels?.cache?.map?.(s => formatChannel(s, false, false, true));
    return stringify ? JSON.stringify(obj, null, 4) : obj
}

function formatChannel(channel, minimal = false, stringify = false, mostMinimal = false) {
    if (!channel) return undefined;
    const obj = {};
    if (mostMinimal) {
        if ([0, 2, 15, 5, 15].includes(channel.type)) {
            if (channel.name !== undefined) obj.name = channel.name;
            if (channel.id !== undefined) obj.id = channel.id;
            obj.type = channel.type;
            return stringify ? JSON.stringify(obj) : obj;
        }
    }
    
    if (channel.id !== undefined) obj.id = channel.id;
    if (channel.name !== undefined) obj.name = channel.name;
    if (channel.type !== undefined) obj.type = channel.type;
    if (channel.guildId !== undefined) obj.guildId = channel.guildId;
    if (channel.parentId !== undefined) obj.parentId = channel.parentId;
    if (channel.position !== undefined) obj.position = channel.position;
    if (!minimal) {
        if (channel.bitrate !== undefined) obj.bitrate = channel.bitrate;
        if (channel.createdTimestamp !== undefined) obj.createdTimestamp = channel.createdTimestamp;
        if (channel.full !== undefined) obj.full = channel.full;
        if (channel.speakable !== undefined) obj.speakable = channel.speakable;
        if (channel.viewable !== undefined) obj.viewable = channel.viewable;
        if (channel.userLimit !== undefined) obj.userLimit = channel.userLimit;
        if (channel.url !== undefined) obj.url = channel.url;
        if (channel.joinable !== undefined) obj.joinable = channel.joinable;
        if (channel.rawPosition !== undefined) obj.rawPosition = channel.rawPosition;
        if (channel.permissionOverwrites !== undefined) obj.permissionOverwrites = channel.permissionOverwrites?.cache?.map?.(s => formatOverwrites(s, minimal, stringify, mostMinimal));
        if (channel.rateLimitPerUser !== undefined) obj.rateLimitPerUser = channel.rateLimitPerUser;
        if (channel.deleteable !== undefined) obj.deleteable = channel.deleteable;
    }
    return stringify ? JSON.stringify(obj) : obj;
}

module.exports = { getGuildChannels, formatChannel }