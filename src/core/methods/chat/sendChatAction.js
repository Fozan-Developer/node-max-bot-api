/**
 * Отправка действия в чат (набор текста, отправка фото и т. д.).
 * @param {object} params - Параметры запроса.
 * @param {number} params.chatId - Идентификатор чата.
 * @param {string} params.action - Действие, которое выполняет бот.
 * Возможные значения: "typing_on", "sending_photo", "sending_video", "sending_audio", "sending_file", "mark_seen".
 * @returns {Promise<object>} - Результат выполнения запроса.
 */
async function sendChatAction({ chatId, action }) {
    if (!chatId || typeof chatId !== "number") {
        throw new Error("Некорректный chatId: требуется число.");
    }

    const validActions = ["typing_on", "sending_photo", "sending_video", "sending_audio", "sending_file", "mark_seen"];

    if (!validActions.includes(action)) {
        throw new Error(`Некорректное действие: ${action}. Доступные действия: ${validActions.join(", ")}`);
    }

    return await this.apiClient.request("POST", `chats/${chatId}/actions`, { params: { action } });
}

module.exports = sendChatAction;
