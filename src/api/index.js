class APIService {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  /**
   * HTTP запрос
   * @param url
   * @param method
   * @param headers
   * @param options
   * @returns {Promise<{}>}
   */
  async request({ url, method = 'GET', headers = {}, ...options }) {
    if (!url.match(/^(http|\/\/)/)) url = this.config.baseUrl + url;
    const res = await fetch(url, {
      method,
      headers: { ...this.defaultHeaders, ...headers },
      ...options,
    });
    return { data: await res.json(), status: res.status, headers: res.headers };
  }

  /**
   * Установка или сброс заголовка
   * @param name {String} Название заголовка
   * @param value {String|null} Значение заголовка
   */
  setHeader(name, value = null) {
    if (value) {
      this.defaultHeaders[name] = value;
    } else if (this.defaultHeaders[name]) {
      delete this.defaultHeaders[name];
    }
  }

  /**
   * Создание комментария
   * @param data
   * @return {Promise<{}>}
   */
  async createComment(data) {
    const res = await this.request({
      url: '/api/v1/comments',
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res.data.result;
  }

  /**
   * Ответ на комментарий
   * @param commentId
   * @param data
   * @return {Promise<{}>}
   */
  async replyComment(commentId, data) {
    const res = await this.request({
      url: `/api/v1/comments/${commentId}/reply`,
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res.data.result;
  }
}


export default APIService;
