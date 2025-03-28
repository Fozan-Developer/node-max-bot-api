/**
 * Отправка ответа на callback после нажатия кнопки пользователем.
 * @param {object} client - Экземпляр API-клиента.
 * @param {string} callbackId - Идентификатор нажатой кнопки.
 * @param {object} [options] - Опции ответа (изменение сообщения или уведомление).
 * @param {object} [options.message] - Новое сообщение (если нужно изменить текущее).
 * @param {string} [options.notification] - Одноразовое уведомление пользователю.
 * @returns {Promise<object>} - Возвращает объект с результатом запроса.
 */
async function answerCallback(callbackId, options = {}) {
    try {
        if (!callbackId) {
            throw new Error("Необходимо указать callbackId.");
        }

        const body = {};
        if (options.message) body.message = options.message;
        if (options.notification) body.notification = options.notification;

        const response = await this.apiClient.request("POST", "answers", {
            params: body,
            query: { callback_id: callbackId },
        });

        return response;
    } catch (error) {
        throw new Error(`Ошибка при ответе на callback: ${error.message}`);
    }
}

module.exports = answerCallback;
