/**
 * Получение списка администраторов чата.
 * @param {object} params - Параметры запроса.
 * @param {number} params.chatId - Идентификатор чата.
 * @returns {Promise<object>} - Список администраторов чата.
 */
async function getChatAdmins(chatId ) {
    if (!chatId || typeof chatId !== 'number') {
      throw new Error('Некорректный chatId: требуется число.');
    }
  
    try {
      return await this.apiClient.request('GET', `chats/${chatId}/members/admins`);
    } catch (error) {
      throw new Error(`Ошибка при получении списка администраторов: ${error.message}`);
    }
  }
  
  module.exports = getChatAdmins;
  