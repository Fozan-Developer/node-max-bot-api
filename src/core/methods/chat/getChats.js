async function getChats({ count = 50, marker = null }) {
    try {
        // Параметры для запроса
        const query = {
            count,
            marker,
        };

        // Выполняем запрос к API
        const response = await this.apiClient.request("GET", "chats", { query });

        return response;
    } catch (error) {
        throw new Error(`Ошибка при получении списка чатов: ${error.message}`);
    }
}

module.exports = getChats;
