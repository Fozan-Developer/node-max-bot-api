/**
 * Получение сообщений из чата
 * @param {object} client - Экземпляр API клиента.
 * @param {number} chatId - Идентификатор чата.
 * @param {Array<number>} [messageIds] - Список ID сообщений, которые нужно получить.
 * @param {number} [from] - Временная метка начала диапазона сообщений (Unix timestamp).
 * @param {number} [to] - Временная метка окончания диапазона сообщений (Unix timestamp).
 * @param {number} [count=50] - Количество сообщений (по умолчанию 50, максимум 100).
 * @returns {Promise<object>} - Объект с массивом сообщений и маркером следующей страницы.
 */
async function getMessages({ chatId, messageIds = null, from = null, to = null, count = 50 }) {
    try {
      if (!chatId) {
        throw new Error("chatId обязателен.");
      }
      if (count < 1 || count > 100) {
        throw new Error("Параметр count должен быть в диапазоне от 1 до 100.");
      }
      if (from && to && to >= from) {
        throw new Error("Параметр 'to' должен быть меньше 'from'.");
      }
  
      // Формируем параметры запроса
      const params = { chat_id: chatId, count };
      if (messageIds) params.message_ids = messageIds.join(",");
      if (from) params.from = from;
      if (to) params.to = to;
  
      // Выполняем GET-запрос к API
      const response = await this.apiClient.request("GET", "messages", params);
  
      if (!response || !response.messages) {
        throw new Error("Не удалось получить сообщения.");
      }
  
      return response; // Возвращаем массив сообщений и маркер следующей страницы
    } catch (error) {
      throw new Error(`Ошибка при получении сообщений: ${error.message}`);
    }
  }
  
  module.exports = getMessages;
  