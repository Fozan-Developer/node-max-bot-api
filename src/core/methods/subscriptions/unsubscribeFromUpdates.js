/**
 * Отписка от обновлений через WebHook
 * @param {object} client - Экземпляр API клиента.
 * @param {object} params - Параметры запроса.
 * @param {string} params.url - URL, который нужно удалить из подписок на WebHook.
 * @returns {Promise<object>} - Результат запроса.
 */
async function unsubscribeFromUpdates(url) {
    try {
      // Проверка параметров
      if (!url || typeof url !== 'string' || !url.startsWith('http')) {
        throw new Error('Некорректный URL. Он должен начинаться с http(s)://');
      }
  
      // Запрос через API Client
      const response = await this.apiClient.request('DELETE', 'subscriptions', { url });
  
      return response; // Возвращаем ответ от API
    } catch (error) {
      throw new Error(`Ошибка при отписке от обновлений: ${error.message}`);
    }
  }
  
  module.exports = unsubscribeFromUpdates;
  