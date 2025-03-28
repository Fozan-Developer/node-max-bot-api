# 🤖 node-max-bot-api

## Описание
`node-max-bot-api` — это удобная библиотека для работы с ботами в сети MAX. Она предоставляет простой и интуитивно понятный API, аналогичный `node-telegram-bot-api`, что делает её удобной для использования.

## Установка
Установите библиотеку через npm:
```sh
npm install node-max-bot-api
```

## Быстрый старт
Создайте нового бота и начните получать обновления:
```js
const MaxBot = require('node-max-bot-api');

const bot = new MaxBot('YOUR_BOT_TOKEN');

bot.on('message', (msg) => {
  console.log('Получено сообщение:', msg);
  bot.message.sendMessage({chatId: msg.recipient.chat_id, text: 'Привет!'});
});

bot.startPolling();
```

## Источники
- **npmjs**: [Ссылка на npm](https://www.npmjs.com/package/node-max-bot-api)
- **github**: [Ссылка на git](https://github.com/Fozan-Developer/node-max-bot-api)
- **документация**: [Перейти](https://fozan.gitbook.io/node-max-bot-api/)
- **чат**: [Перейти](https://max.ru/join/oBGOuh2WqlAV6Ky0k4jHfbf8Dn6HZ0cCzTe4442jSOE)

