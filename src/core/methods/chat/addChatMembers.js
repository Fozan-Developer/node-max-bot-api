/**
 * Добавление участников в чат
 * @param {object} client - Экземпляр API клиента.
 * @param {object} params - Параметры запроса.
 * @param {number} params.chatId - Идентификатор чата.
 * @param {array} params.userIds - Список идентификаторов пользователей, которых нужно добавить в чат.
 * @returns {Promise<object>} - Результат операции с полем success и возможным сообщением об ошибке.
 */
async function addChatMembers({ chatId, userIds }) {
    if (!chatId || typeof chatId !== "number") {
        throw new Error("Некорректный chatId: требуется число.");
    }

    if (!Array.isArray(userIds) || userIds.length === 0) {
        throw new Error("Некорректный список userIds: требуется массив с хотя бы одним элементом.");
    }

    const data = {
        user_ids: userIds,
    };

    try {
        // Запрос через API Client
        const response = await this.apiClient.request("POST", `chats/${chatId}/members`, { data });

        return response;
    } catch (error) {
        throw new Error(`Ошибка при добавлении участников в чат: ${error.message}`);
    }
}

module.exports = addChatMembers;
