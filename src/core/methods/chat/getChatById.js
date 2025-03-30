/**
 * Получение информации о чате по его идентификатору.
 * @param {object} client - Экземпляр API клиента.
 * @param {object} params - Параметры запроса.
 * @param {number} params.chatId - Идентификатор запрашиваемого чата.
 * @returns {Promise<object>} - Информация о чате.
 */
async function getChatById(chatId) {
    if (!chatId || typeof chatId !== "number") {
        throw new Error("Некорректный chatId: требуется число.");
    }

    return await this.apiClient.request("GET", `chats/${chatId}`);
}

module.exports = getChatById;
