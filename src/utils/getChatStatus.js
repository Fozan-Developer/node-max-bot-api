async function getChatStatus(chatId) {
    const chat = await this.apiClient.request("GET", `chats/${chatId}`);
    if (chat.error) return undefined;

    if (chat.type != "dialog" || !chat.dialog_with_user) return null;

    const { chat_id, status, last_event_time, dialog_with_user } = chat;

    return {
        chat_id,
        user_id: dialog_with_user.user_id,
        status: status,
        last_event_time,
        name: dialog_with_user.name,
    };
}

module.exports = getChatStatus;
