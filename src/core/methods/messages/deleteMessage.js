/**
 * Удаление сообщения в чате или диалоге.
 * @param {object} client - Экземпляр API-клиента.
 * @param {string} messageId - Идентификатор удаляемого сообщения.
 * @returns {Promise<boolean>} - Возвращает true, если сообщение успешно удалено.
 */
async function deleteMessage(messageId) {
    try {
        if (!messageId) {
            throw new Error("Необходимо указать messageId.");
        }

        const response = await this.apiClient.request("DELETE", "messages", { params: { message_id: messageId } });

        if (!response || !response.success) {
            throw new Error(response?.message || "Не удалось удалить сообщение.");
        }

        return true; // Успешное удаление
    } catch (error) {
        throw new Error(`Ошибка при удалении сообщения: ${error.message}`);
    }
}

module.exports = deleteMessage;
