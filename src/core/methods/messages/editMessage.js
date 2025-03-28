/**
 * Редактирование сообщения в чате.
 * @param {object} client - Экземпляр API-клиента.
 * @param {object} params - Параметры запроса.
 * @param {string} params.messageId - ID редактируемого сообщения.
 * @param {string} [params.text] - Новый текст сообщения (до 4000 символов).
 * @param {Array<object>} [params.attachments] - Вложения (если пусто, вложения удаляются).
 * @param {object} [params.link] - Ссылка на сообщение.
 * @param {boolean} [params.notify=true] - Уведомлять участников чата.
 * @param {string} [params.format] - Форматирование текста ("markdown" или "html").
 * @returns {Promise<object>} - Ответ API с результатом редактирования.
 */
async function editMessage({ messageId, text = "", attachments = null, link = null, notify = true, format = null }) {
    try {
      if (!messageId) {
        throw new Error("Необходимо указать messageId.");
      }
  
      const payload = {
        message_id: messageId,
        text,
        attachments,
        link,
        notify,
        format
      };
  
      const response = await this.apiClient.request("PUT", "messages", payload);
  
      if (!response || !response.success) {
        throw new Error(response?.message || "Не удалось отредактировать сообщение.");
      }
  
      return response; // Возвращаем результат запроса
    } catch (error) {
      throw new Error(`Ошибка при редактировании сообщения: ${error.message}`);
    }
  }
  
  module.exports = editMessage;
  