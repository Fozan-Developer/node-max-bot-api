const axios = require("axios");

class ApiClient {
    constructor(token) {
        if (!token) {
            throw new Error("Токен обязателен для работы бота");
        }
        this.token = token;
        this.apiUrl = "https://botapi.max.ru"; // Обновленный URL для MAX
    }

    async request(method, endpoint, { params = {}, query = {} }) {
        try {
            // Фильтруем параметры в query, чтобы исключить undefined
            const filteredQuery = Object.fromEntries(
                Object.entries(query).filter(([key, value]) => value !== undefined)
            );

            // Строим строку запроса с токеном и фильтруемыми параметрами
            const queryString = new URLSearchParams({
                access_token: this.token,
                ...filteredQuery, // Добавляем только валидные параметры из query
            }).toString();

            const url = `${this.apiUrl}/${endpoint}?${queryString}`;
            const options = {
                method,
                url,
            };

            // GET-запросы передают параметры через query
            if (method === "GET") {
                options.params = params; // Дополнительные параметры для GET-запроса
            } else {
                options.data = params; // Для других методов используем data
            }

            const response = await axios(options);
            return response.data;
        } catch (error) {
            // Извлекаем подробности ошибки
            const errorMessage = error.response?.data ? JSON.stringify(error.response.data, null, 2) : error.message;

            throw new Error(`Ошибка запроса: ${errorMessage}`);
        }
    }
}

module.exports = ApiClient;
