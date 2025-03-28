/**
 * Получение сообщения по его идентификатору.
 * @param {object} client - Экземпляр API-клиента.
 * @param {string} messageId - Идентификатор сообщения.
 * @returns {Promise<object>} - Возвращает объект сообщения.
 */
async function getMessage(messageId) {
    try {
        if (!messageId) {
            throw new Error("Необходимо указать messageId.");
        }

        const response = await this.apiClient.request("GET", `messages/${messageId}`, { query: { messageId } });

        if (!response) {
            throw new Error("Сообщение не найдено.");
        }

        return response; // Возвращает объект сообщения
    } catch (error) {
        throw new Error(`Ошибка при получении сообщения: ${error.message}`);
    }
}

module.exports = getMessage;
