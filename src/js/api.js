import axios from 'axios';

export class GetProduct {
  static #API_KEY = '';

  constructor() {
    this.query = '';
    this.page = 1;
    this.totalPages = 1;
    this.perPage = 40;
    this.baseUrl = 'https://pixabay.com';
    this.endPoint = '/api/';
  }

  async getProducts() {
    const PARAMS = new URLSearchParams({
      key: GetImage.#API_KEY,
      q: this.query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: this.page,
      per_page: this.perPage,
    });
    const url = this.baseUrl + this.endPoint + '?' + PARAMS;

    try {
      const response = await axios.get(url);
      if (response.status === 200 && response.hits !== []) return response;
      return Promise.reject(response.status);
    } catch (error) {
      return Promise.reject(response.status);
    }
  }
  async searchProducts(query) {
    query = query.replace(/ +/g, ' ').trim();

    if (!query) return;

    this.query = query;
    this.page = 1;

    try {
      const {
        data,
        data: { totalHits },
      } = await this.getImages();

      if (totalHits === 0) {
        notifyStr(
          'Sorry, there are no products matching your search query. Please try again.'
        );
        loadOff();
        return;
      }

      this.totalPages = Math.ceil(totalHits / this.perPage);
      return data;
    } catch (error) {
      return Promise.reject(response.status);
    }
  }

  async loadMoreProducts() {
    this.page++;

    try {
      const { data } = await this.getImages();
      loadOff();
      return data;
    } catch (error) {
      return Promise.reject(response.status);
    }
  }
}
