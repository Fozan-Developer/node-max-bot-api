/**
 * Получение информации о членстве текущего бота в чате.
 * @param {object} params - Параметры запроса.
 * @param {number} params.chatId - Идентификатор чата.
 * @returns {Promise<object>} - Информация о членстве бота в чате.
 */
async function getChatMembership(chatId) {
    if (!chatId || typeof chatId !== 'number') {
      throw new Error('Некорректный chatId: требуется число.');
    }
  
    try {
      const response = await this.apiClient.request('GET', `chats/${chatId}/members/me`);
      return response;
    } catch (error) {
      throw new Error(`Ошибка при получении информации о членстве в чате: ${error.message}`);
    }
  }
  
  module.exports = getChatMembership;
  