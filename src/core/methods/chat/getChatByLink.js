async function getChatByLink(chatLink) {
    try {
      // Проверяем, передана ли ссылка на чат
      if (!chatLink) {
        throw new Error('chatLink обязателен');
      }
  
      // Выполняем запрос к API
      const response = await this.apiClient.request('GET', `chats/${chatLink}`);
  
      return response;
    } catch (error) {
      throw new Error(`Ошибка при получении чата по ссылке: ${error.message}`);
    }
  }
  
  module.exports = getChatByLink;
  