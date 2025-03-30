/**
 * Отправка сообщения в чат или пользователю.
 * @param {object} client - Экземпляр API-клиента.
 * @param {object} params - Параметры отправки.
 * @param {number} [params.userId] - ID пользователя, если сообщение отправляется в личку.
 * @param {number} [params.chatId] - ID чата, если сообщение отправляется в группу.
 * @param {string} [params.text] - Текст сообщения (до 4000 символов).
 * @param {boolean} [params.disableLinkPreview] - Отключить предпросмотр ссылок.
 * @param {Array<object>} [params.attachments] - Вложения (например, видео, фото, файлы).
 * @param {object} [params.link] - Ссылка на сообщение.
 * @param {boolean} [params.notify=true] - Уведомлять участников чата.
 * @param {string} [params.format] - Форматирование текста ("markdown" или "html").
 * @returns {Promise<object>} - Ответ API с отправленным сообщением.
 */
async function sendMessage({
    userId,
    chatId,
    text = "",
    disableLinkPreview = false,
    attachments = [],
    link = null,
    notify = true,
    format,
}) {
    try {
        if (!userId && !chatId) {
            throw new Error("Необходимо указать userId или chatId.");
        }
        const typeFormat = () => {
            if (format === undefined) {
                if (this.options.format) {
                    return this.options.format;
                }
            }
            if (format) {
                return format;
            }

            return undefined;
        };

        const payload = {
            text,
            attachments: attachments.length ? attachments : undefined,
            link: link || undefined,
            notify,
            format: typeFormat(),
        };

        const query = {
            user_id: userId || undefined,
            chat_id: chatId || undefined,
            disable_link_preview: disableLinkPreview,
        };

        const response = await this.apiClient.request("POST", "messages", { params: payload, query });

        if (!response || !response.message) {
            throw new Error("Не удалось отправить сообщение.");
        }

        return response.message; // Возвращаем объект сообщения
    } catch (error) {
        throw new Error(`Ошибка при отправке сообщения: ${error.message}`);
    }
}

module.exports = sendMessage;
