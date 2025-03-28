/**
 * Получение URL для загрузки файла
 * @param {object} client - Экземпляр API клиента.
 * @param {string} type - Тип загружаемого файла. Возможные значения: "image", "video", "audio", "file".
 * @returns {Promise<string>} - URL для загрузки файла.
 */
async function getUploadUrl(type) {
    try {
      if (!["image", "video", "audio", "file"].includes(type)) {
        throw new Error("Некорректный тип файла. Доступные значения: image, video, audio, file.");
      }
  
      // Отправляем запрос на получение URL загрузки
      const response = await this.apiClient.request("POST", "uploads", { type });
  
      if (!response || !response.url) {
        throw new Error("Не удалось получить URL для загрузки файла.");
      }
  
      return response.url; // Возвращаем URL для загрузки
    } catch (error) {
      throw new Error(`Ошибка при получении URL загрузки: ${error.message}`);
    }
  }
  
  module.exports = getUploadUrl;
  