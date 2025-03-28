/**
 * Удаляет бота из участников чата.
 * @param {object} params - Параметры запроса.
 * @param {number} params.chatId - Идентификатор чата.
 * @returns {Promise<object>} - Результат выполнения запроса.
 */
async function leaveChat(chatId) {
    if (!chatId || typeof chatId !== 'number') {
      throw new Error('Некорректный chatId: требуется число.');
    }
  
    try {
      const response = await this.apiClient.request('DELETE', `chats/${chatId}/members/me`);
      return response;
    } catch (error) {
      throw new Error(`Ошибка при выходе из чата: ${error.message}`);
    }
  }
  
  module.exports = leaveChat;
  