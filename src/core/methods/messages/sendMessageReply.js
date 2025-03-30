async function sendMessageReply({
    message,
    text = "",
    disableLinkPreview = false,
    attachments = [],
    notify = true,
    format,
}) {
    try {
        if (!message) {
            throw new Error("Необходимо указать message.");
        }

        const recipient = message.recipient;
        const chatId = recipient.chat_id;
        const link = {
            type: "reply",
            mid: message.body.mid,
        };

        const query = {
            chat_id: chatId,
            disable_link_preview: disableLinkPreview,
        };

        const typeFormat = () => {
            if (format === undefined) {
                if (this.options.format) {
                    return this.options.format;
                }
                return null;
            }
            if (format) {
                return format;
            }
        };

        const payload = {
            text,
            attachments: attachments.length ? attachments : undefined,
            link,
            notify,
            format: typeFormat(),
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

module.exports = sendMessageReply;
