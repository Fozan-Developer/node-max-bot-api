/**
 * Изменение информации о чате.
 * @param {object} params - Параметры запроса.
 * @param {number} params.chatId - Идентификатор чата.
 * @param {string} [params.title] - Новое название чата (1-200 символов).
 * @param {object} [params.icon] - Объект с изображением (PhotoAttachmentRequestPayload).
 * @param {string} [params.pin] - Идентификатор сообщения для закрепления.
 * @param {boolean} [params.notify=true] - Нужно ли уведомлять участников об изменении.
 * @returns {Promise<object>} - Обновлённая информация о чате.
 */
async function updateChatInfo({ chatId, params}) {
    try {
      const { title, icon, pin, notify = true } = params;
      
      if (!chatId || typeof chatId !== 'number') {
        throw new Error('Некорректный chatId: требуется число.');
      }
  
      const requestData = {};
      if (title) requestData.title = title;
      if (icon) requestData.icon = icon;
      if (pin) requestData.pin = pin;
      requestData.notify = notify;
  
      // Запрос через API клиент
      const response = await this.apiClient.request('PATCH', `chats/${chatId}`, requestData);
      return response;
    } catch (error) {
      throw new Error(`Ошибка при обновлении информации о чате: ${error.message}`);
    }
  }
  
  module.exports = updateChatInfo;
  