/**
 * Удаление участника из чата
 * @param {object} client - Экземпляр API клиента.
 * @param {object} params - Параметры запроса.
 * @param {number} params.chatId - Идентификатор чата.
 * @param {number} params.userId - Идентификатор пользователя, которого нужно удалить из чата.
 * @param {boolean} [params.block=false] - Если установлено в true, пользователь будет заблокирован в чате.
 * @returns {Promise<object>} - Результат операции с полем success и возможным сообщением об ошибке.
 */
async function removeChatMember({ chatId, userId, block = false }) {
    if (!chatId || typeof chatId !== "number") {
        throw new Error("Некорректный chatId: требуется число.");
    }

    if (!userId || typeof userId !== "number") {
        throw new Error("Некорректный userId: требуется число.");
    }

    const data = {
        user_id: userId,
        block, // Если установлено в true, пользователь будет заблокирован
    };

    try {
        // Запрос через API Client
        const response = await this.apiClient.request("DELETE", `chats/${chatId}/members`, { query: data });

        return response;
    } catch (error) {
        throw new Error(`Ошибка при удалении участника из чата: ${error.message}`);
    }
}

module.exports = removeChatMember;
