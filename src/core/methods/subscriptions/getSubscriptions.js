/**
 * Получение списка подписок
 * @param {object} client - Экземпляр API клиента.
 * @returns {Promise<object>} - Список текущих подписок.
 */
async function getSubscriptions() {
    try {
      // Запрос через API Client
      const response = await this.apiClient.request('GET', 'subscriptions');
  
      return response; // Список подписок будет доступен в response.subscriptions
    } catch (error) {
      throw new Error(`Ошибка при получении подписок: ${error.message}`);
    }
  }
  
  module.exports = getSubscriptions;
  