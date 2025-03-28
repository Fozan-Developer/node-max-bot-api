/**
 * Закрепление сообщения в чате или канале.
 * Выполняет PUT-запрос к эндпоинту /chats/{chatId}/pin.
 *
 * @param {object} params - Параметры запроса.
 * @param {number} params.chatId - Идентификатор чата, где должно быть закреплено сообщение.
 * @param {string} params.message_id - Идентификатор сообщения, которое нужно закрепить.
 * @param {boolean} [params.notify=true] - Если true, участники получат уведомление о закреплении.
 * @returns {Promise<object>} - Результат операции, содержащий success и message.
 */
async function pinMessage({ chatId, message_id, notify = true }) {
    if (!chatId || typeof chatId !== "number") {
        throw new Error("Некорректный chatId: требуется число.");
    }
    if (!message_id) {
        throw new Error("Необходимо указать message_id для закрепления.");
    }

    const payload = {
        message_id,
        notify,
    };

    try {
        const response = await this.apiClient.request("PUT", `chats/${chatId}/pin`, { params: payload });
        return response;
    } catch (error) {
        throw new Error(`Ошибка при закреплении сообщения: ${error.message}`);
    }
}

module.exports = pinMessage;
