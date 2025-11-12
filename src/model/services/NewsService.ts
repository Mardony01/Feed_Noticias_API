import axios from 'axios';

const API_KEY = '61a94310bf2545ef80a405bca0bfdb6d'; // Substitua pela sua chave da News API
const BASE_URL = 'https://newsapi.org/v2/everything?';

export interface NewsArticle {
  title: string;
  description: string;
  urlToImage: string;
  source: { name: string };
  content: string;
  publishedAt: string; // Adicionada a propriedade para a data de publicação
  url: string; // Adicionada a propriedade para o link da notícia completa
}

export const NewsService = {
  async fetchNews(query: string = ''): Promise<NewsArticle[]> {
    try {
      const response = await axios.get(`${BASE_URL}/everything`, {
        params: {
          q: query || 'notícias',
          language: 'pt',
          apiKey: API_KEY,
        },
      });
      return response.data.articles;
    } catch (error) {
      throw new Error('Erro ao buscar notícias. Verifique sua conexão.');
    }
  },
};
