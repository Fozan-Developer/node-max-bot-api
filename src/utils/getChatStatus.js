/**
 * Получает статус активности чата.
 *
 * @param {number} chatId - Идентификатор чата
 * @returns {Promise<object|null|undefined>} - Объект с данными о чате,
 *   null если чат не является диалогом,
 *   undefined если чат не найден или произошла ошибка.
 */
async function getChatStatus(chatId) {
    try {
        const chat = await this.apiClient.request("GET", `chats/${chatId}`);

        // Если запрос завершился ошибкой, возвращаем undefined
        if (chat.error) return undefined;

        // Проверяем, является ли чат диалогом
        if (chat.type !== "dialog" || !chat.dialog_with_user) return null;

        // Деструктурируем необходимые данные
        const { chat_id, status, last_event_time, dialog_with_user } = chat;

        return {
            chat_id,
            user_id: dialog_with_user.user_id,
            status,
            last_event_time,
            name: dialog_with_user.name,
        };
    } catch (error) {
        console.error(`Ошибка при получении статуса чата ${chatId}:`, error);
        return undefined; // Возвращаем undefined при непредвиденной ошибке
    }
}

module.exports = getChatStatus;
