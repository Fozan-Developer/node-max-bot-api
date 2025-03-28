function extractChatIdFromLink(chatLink) {
  console.log(chatLink);
  chatLink = String(chatLink || '').trim();
  const match = chatLink.match(/https:\/\/max\.ru\/join\/([a-zA-Z0-9_-]+)/);
  if (!match) {
    throw new Error('Неверная ссылка на чат');
  }
  return match[1];
}

module.exports = extractChatIdFromLink; // Должно экспортироваться именно как функция!
