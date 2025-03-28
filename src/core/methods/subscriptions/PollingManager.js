class PollingManager {
    constructor(apiClient) {
        this.apiClient = apiClient;
        this.isPolling = false;
        this.marker = null;
        this.events = {}; // Хранилище событий
    }

    async longPolling() {
        try {
            const params = {
                limit: 100,
                timeout: 30,
                marker: this.marker,
            };

            const response = await this.apiClient.request("GET", "updates", params);

            if (response && response.updates && response.updates.length > 0) {
                response.updates.forEach(update => {
                    if (update.message) {
                        // Генерация события для 'message'
                        this.trigger("message", update.message);
                    }
                });

                if (response.marker) {
                    this.marker = response.marker;
                }
            } else {
            }
        } catch (error) {
            console.error("Ошибка при получении обновлений:", error.message);
        }
    }

    async startPolling() {
        if (this.isPolling) return;

        this.isPolling = true;

        while (this.isPolling) {
            await this.longPolling(); // Запуск долгого опроса
            await new Promise(resolve => setTimeout(resolve, 1000)); // Задержка 1 секунда между запросами
        }
    }

    stopPolling() {
        this.isPolling = false;
    }

    // Метод для вызова обработчиков событий
    trigger(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(handler => handler(data));
        }
    }

    // Метод для подписки на событие
    on(event, handler) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(handler);
    }
}

module.exports = PollingManager;
