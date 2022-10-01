class Command {
    constructor(client, options) {
        this.client = client
        this.name = options.name
        this.description = options.description
        this.options = options.options
        this.disable = options.disabled
        this.ownerOnly = options.ownerOnly
        //this.permissions = options.permissions
        this.default_member_permissions = options.default_member_permissions
    }
}

module.exports = Command