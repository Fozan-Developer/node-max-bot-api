/**
 * Удаление закрепленного сообщения в чате или канале.
 * @param {number} chatId - Идентификатор чата.
 * @returns {Promise<object>} - Результат удаления закрепленного сообщения.
 */
async function unpinMessage(chatId) {
    if (!chatId || typeof chatId !== "number") {
        throw new Error("Некорректный chatId: требуется число.");
    }

    try {
        const response = await this.apiClient.request("DELETE", `chats/${chatId}/pin`, { quiry: { chat_id: chatId } });
        return response;
    } catch (error) {
        throw new Error(`Ошибка при удалении закрепленного сообщения: ${error.message}`);
    }
}

module.exports = unpinMessage;
