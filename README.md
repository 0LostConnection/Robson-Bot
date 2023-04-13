<h1 align="center">
Robson -  Bot oficial do <a href="https://discord.gg/minifazenda" target="_blank">Mini Fazenda</a> 🐂
</h1>

<p align="center">
  <img src="https://i.imgur.com/1UgYUYp.png" />
</p>

## To-do

* Fazer uma maneira de ler os erros de maneira inteligente;
* Criar um comando de "temas" para o servidor;
* **Bugfix:** ao enviar uma mensagem, o collector de mensagem detecta mensagens que não são do autor

## Setup

### 1. Configurando - Bot

Na pasta raiz, crie um arquivo chamado `release.env` com o modelo abaixo:
```env
# RELEASE
DATABASE_SECRET=
BOT_TOKEN=
CLIENT_ID=
```

### 1.1 Configurando - Status do Bot 

Abra o arquivo `config.js` e edite como quiser a array `statusArray`.

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
            content: `Feito por  LostConnection#4460`,
            status: 'online'
        }
    ],
```
*NOTA: O valor da chame `type` precisa ser um número. Para mais referências, <a href="https://discord-api-types.dev/api/discord-api-types-v10/enum/ActivityType/" target="_blank">clique aqui</a>.* 

### 2. Iniciando o bot
Apenas use `node index.js`.

</br>
Made with ❤️ by LostConnection
