const axios = require("axios"); // Используем axios для запросов

/**
 * Получение обновлений через долгий опрос (long polling)
 * @param {object} client - Экземпляр API клиента.
 * @param {object} params - Параметры запроса.
 * @param {number} [params.limit=100] - Максимальное количество обновлений для получения.
 * @param {number} [params.timeout=30] - Тайм-аут для долгого опроса в секундах.
 * @param {number} [params.marker] - Указатель на следующее ожидаемое обновление.
 * @param {string[]} [params.types] - Список типов обновлений, которые бот хочет получить.
 * @returns {Promise<object>} - Список обновлений.
 */
async function getUpdates({ limit = 100, timeout = 30, marker, types } = {}) {
    try {
        const params = { limit, timeout, marker, types: types ? types.join(",") : undefined };

        // Отправляем запрос через API Client
        const response = await client.apiClient.request("GET", "updates", params);

        // Возвращаем полученные обновления
        return response.data;
    } catch (error) {
        throw new Error(`Ошибка при получении обновлений: ${error.message}`);
    }
}

/**
 * Функция для старта долгого опроса
 * Опрашиваем API каждые 1 секунду
 * @param {object} client - Экземпляр API клиента.
 * @returns {Promise<void>} - Пустой результат (можно обработать в другом месте)
 */
async function startLongPolling(client) {
    let marker; // Указатель на следующее обновление
    let updates = []; // Массив для хранения полученных обновлений

    // Создаём новый Promise для возврата результатов
    return new Promise((resolve, reject) => {
        const intervalId = setInterval(async () => {
            try {
                // Получаем обновления
                const response = await getUpdates(client, { limit: 100, timeout: 30, marker });

                // Если есть обновления, добавляем их в массив
                if (response && response.updates && response.updates.length > 0) {
                    updates = [...updates, ...response.updates];
                }

                // Если обновлений больше нет, останавливаем опрос
                if (response && response.updates && response.updates.length === 0) {
                    clearInterval(intervalId);
                    resolve(updates); // Возвращаем собранные обновления
                }

                // Обновляем маркер для следующего запроса
                if (response && response.marker) {
                    marker = response.marker;
                }
            } catch (error) {
                clearInterval(intervalId); // Останавливаем опрос при ошибке
                reject(new Error(`Ошибка при получении обновлений: ${error.message}`)); // Возвращаем ошибку
            }
        }, 1000); // Опрашиваем каждые 1 секунду для быстрого реагирования
    });
}

module.exports = startLongPolling;
