/**
 * Получение информации о видео по его токену.
 * @param {object} client - Экземпляр API-клиента.
 * @param {string} videoToken - Токен видео-вложения.
 * @returns {Promise<object>} - Возвращает объект с данными о видео.
 */
async function getVideoDetails(videoToken) {
    try {
      if (!videoToken) {
        throw new Error("Необходимо указать videoToken.");
      }
  
      const response = await this.apiClient.request("GET", `videos/${videoToken}`);
  
      if (!response) {
        throw new Error("Видео не найдено.");
      }
  
      return response; // Возвращает объект с данными о видео
    } catch (error) {
      throw new Error(`Ошибка при получении данных о видео: ${error.message}`);
    }
  }
  
  module.exports = getVideoDetails;
  