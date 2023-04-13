<h1 align="center">
Robson
</h1>

<p align="center" style="border-radius: 50%;">
  <img src="https://i.imgur.com/1UgYUYp.png" />
</p>

## To-do

* Make a smart way to handle errors.

## Setup

### 1. Configuring - Bot

On the root folder, create a file named `release.env` with the model below:
```env
# RELEASE
DATABASE_SECRET=
BOT_TOKEN=
CLIENT_ID=
```

### 1.1 Configuring - Bot Status

Open the `config.js` file, and on the `statusArray` array, edit as you wish.

Ex.:
```js
statusArray: [
        {
            type: 3,
            content: `Robson Bot`,
            status: 'online'
        },
        {
            type: 0,
            content: `Made By LostConnection#4460`,
            status: 'online'
        }
    ],
```
*NOTE: The object key `type` needs to be a number. For more references, [click here](https://discord-api-types.dev/api/discord-api-types-v10/enum/ActivityType).* 

### 2. Starting the bot
Just type `node index.js`.

</br>
Made with ❤️ by LostConnection
