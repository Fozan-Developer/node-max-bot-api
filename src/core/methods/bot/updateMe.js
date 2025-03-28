async function updateMe(params) {
    try {
        // Формируем тело запроса с параметрами
        const { name, description, commands, photo } = params;

        const data = {};
        if (name) data.name = name;
        if (description) data.description = description;
        if (commands) data.commands = commands;
        if (photo) data.photo = photo;

        // Запрос через API Client
        const response = await this.apiClient.request("PATCH", "me", { data });

        return response;
    } catch (error) {
        throw new Error(`Ошибка при обновлении информации о боте: ${error.message}`);
    }
}

module.exports = updateMe;
