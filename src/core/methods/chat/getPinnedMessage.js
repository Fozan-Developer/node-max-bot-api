/**
 * Получение закрепленного сообщения в чате или канале.
 * @param {object} client - Экземпляр API клиента.
 * @param {object} params - Параметры запроса.
 * @param {number} params.chatId - Идентификатор чата.
 * @returns {Promise<object|null>} - Закрепленное сообщение или null, если его нет.
 */
async function getPinnedMessage(chatId) {
    if (!chatId || typeof chatId !== 'number') {
        throw new Error('Некорректный chatId: требуется число.');
    }

    try {
        const response = await this.apiClient.request('GET', `chats/${chatId}/pin`);
        return response.message || null;
    } catch (error) {
        throw new Error(`Ошибка при получении закрепленного сообщения: ${error.message}`);
    }
}

module.exports = getPinnedMessage;
