/**
 * Подписка на обновления через WebHook
 * @param {object} client - Экземпляр API клиента.
 * @param {object} params - Параметры запроса.
 * @param {string} params.url - URL HTTP(S)-эндпойнта для получения обновлений.
 * @param {Array<string>} params.update_types - Список типов обновлений для получения.
 * @param {string} [params.version] - Версия API (необязательная).
 * @returns {Promise<object>} - Результат запроса.
 */
async function subscribeToUpdates({ url, update_types, version }) {
    try {
      // Проверка параметров
      if (!url || typeof url !== 'string' || !url.startsWith('http')) {
        throw new Error('Некорректный URL. Он должен начинаться с http(s)://');
      }
      if (!Array.isArray(update_types) || update_types.length === 0) {
        throw new Error('Список типов обновлений обязателен.');
      }
  
      // Формируем тело запроса
      const data = { url, update_types };
      if (version) {
        data.version = version;
      }
  
      // Запрос через API Client
      const response = await this.apiClient.request('POST', 'subscriptions', data);
  
      return response; // Возвращаем ответ от API
    } catch (error) {
      throw new Error(`Ошибка при подписке на обновления: ${error.message}`);
    }
  }
  
  module.exports = subscribeToUpdates;
  