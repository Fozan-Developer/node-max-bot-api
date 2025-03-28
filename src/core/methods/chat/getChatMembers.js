/**
 * Получение участников чата
 * @param {object} client - Экземпляр API клиента.
 * @param {object} params - Параметры запроса.
 * @param {number} params.chatId - Идентификатор чата.
 * @param {array} [params.userIds] - Список идентификаторов пользователей, чье членство нужно получить.
 * @param {number} [params.marker] - Указатель на следующую страницу данных.
 * @param {number} [params.count=20] - Количество участников, которых нужно вернуть.
 * @returns {Promise<object>} - Список участников чата с информацией о времени последней активности.
 */
async function getChatMembers({ chatId, userIds = [], marker, count = 20 }) {
    if (!chatId || typeof chatId !== 'number') {
      throw new Error('Некорректный chatId: требуется число.');
    }
  
    const params = {
      chatId,
      user_ids: userIds,
      marker,
      count
    };
  
    try {
      // Запрос через API Client
      const response = await this.apiClient.request('GET', `chats/${chatId}/members`, params);
  
      return response;
    } catch (error) {
      throw new Error(`Ошибка при получении участников чата: ${error.message}`);
    }
  }
  
  module.exports = getChatMembers;
  