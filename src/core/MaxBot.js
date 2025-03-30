const ApiClient = require("./ApiClient"); // Подключаем ApiClient

// bot
const botMe = require("./methods/bot/me");
const botUpdateMe = require("./methods/bot/updateMe");

// chat
const getChats = require("./methods/chat/getChats");
const getChatByLink = require("./methods/chat/getChatByLink");
const getChatById = require("./methods/chat/getChatById");
const updateChatInfo = require("./methods/chat/updateChatInfo");
const sendChatAction = require("./methods/chat/sendChatAction");
const getPinnedMessage = require("./methods/chat/getPinnedMessage");
const unpinMessage = require("./methods/chat/unpinMessage");
const getChatMembership = require("./methods/chat/getChatMembership");
const leaveChat = require("./methods/chat/leaveChat");
const getChatAdmins = require("./methods/chat/getChatAdmins");
const getChatMembers = require("./methods/chat/getChatMembers");
const pinMessage = require("./methods/chat/pinMessage");
const removeChatMember = require("./methods/chat/removeChatMember");

// subscriptions
const getSubscriptions = require("./methods/subscriptions/getSubscriptions");
const subscribeToUpdates = require("./methods/subscriptions/subscribeToUpdates");
const unsubscribeFromUpdates = require("./methods/subscriptions/unsubscribeFromUpdates");
const PollingManager = require("./methods/subscriptions/PollingManager");

// upload
const getUploadUrl = require("./methods/upload/getUploadUrl");

// messages
const getMessages = require("./methods/messages/getMessages");
const sendMessage = require("./methods/messages/sendMessage");
const editMessage = require("./methods/messages/editMessage");
const deleteMessage = require("./methods/messages/deleteMessage");
const getMessage = require("./methods/messages/getMessage");
const answerCallback = require("./methods/messages/answerCallback");
const getVideoDetails = require("./methods/messages/getVideoDetails");
const sendMessageReply = require("./methods/messages/sendMessageReply");

// utils
const utilsGetChatStatus = require("../utils/getChatStatus");

class MaxBot {
    constructor({ token, options }) {
        if (!token) {
            throw new Error("Токен обязателен для работы бота");
        }

        this.apiClient = new ApiClient(token); // Инициализация клиента API
        this.bot = {}; // Инициализация объекта bot
        this.chats = {}; // Инициализация объекта chat
        this.subcriptions = {}; // Инициализация объекта subscriptions
        this.upload = {}; // Инициализация объекта upload
        this.messages = {}; // Инициализация объекта messages
        this.utils = {};
        this.events = {}; // Хранилище для событий
        this.options = options; // Инициализация опций

        // Инициализация методов
        this.bot.me = botMe.bind(this);
        this.bot.updateMe = botUpdateMe.bind(this);

        this.chats.getChats = getChats.bind(this);
        this.chats.getChatByLink = getChatByLink.bind(this);
        this.chats.getChatById = getChatById.bind(this);
        this.chats.updateChatInfo = updateChatInfo.bind(this);
        this.chats.sendChatAction = sendChatAction.bind(this);
        this.chats.getPinnedMessage = getPinnedMessage.bind(this);
        this.chats.unpinMessage = unpinMessage.bind(this);
        this.chats.getChatMembership = getChatMembership.bind(this);
        this.chats.leaveChat = leaveChat.bind(this);
        this.chats.getChatAdmins = getChatAdmins.bind(this);
        this.chats.getChatMembers = getChatMembers.bind(this);
        this.chats.pinMessage = pinMessage.bind(this);
        this.chats.removeChatMember = removeChatMember.bind(this);

        this.subcriptions.getSubscriptions = getSubscriptions.bind(this);
        this.subcriptions.subscribeToUpdates = subscribeToUpdates.bind(this);
        this.subcriptions.unsubscribeFromUpdates = unsubscribeFromUpdates.bind(this);

        this.upload.getUploadUrl = getUploadUrl.bind(this);

        this.messages.getMessages = getMessages.bind(this);
        this.messages.sendMessage = sendMessage.bind(this);
        this.messages.editMessage = editMessage.bind(this);
        this.messages.deleteMessage = deleteMessage.bind(this);
        this.messages.getMessage = getMessage.bind(this);
        this.messages.answerCallback = answerCallback.bind(this);
        this.messages.getVideoDetails = getVideoDetails.bind(this);
        this.messages.sendMessageReply = sendMessageReply.bind(this);

        // utils
        this.utils.getChatStatus = utilsGetChatStatus.bind(this);

        // Инициализация PollingManager
        this.pollingManager = new PollingManager(this.apiClient);
        this.pollingManager.events = this.events; // Передаем хранилище событий
        this.on = this.on.bind(this);
    }

    /**
     * Подписка на событие
     * @param {string} event - Тип события (например, 'message')
     * @param {function} handler - Функция-обработчик
     */
    on(event, handler) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(handler);
    }

    /**
     * Вызов обработчиков события
     * @param {string} event - Тип события (например, 'message')
     * @param {object} data - Данные, передаваемые в обработчик
     */
    trigger(event, data) {
        if (this.events[event]) {
            this.events[event].forEach((handler, index) => {
                try {
                    handler(data);
                } catch (error) {
                    console.error(`Ошибка при выполнении обработчика №${index + 1}:`, error);
                }
            });
        } else {
            console.log(`Нет обработчиков для события '${event}'`);
        }
    }

    /**
     * Запуск долгого опроса
     */
    startPolling() {
        this.pollingManager.startPolling();
    }
}

module.exports = MaxBot;
