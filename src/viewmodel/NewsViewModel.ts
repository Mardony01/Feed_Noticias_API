import { useState } from 'react';
import { NewsArticle, NewsService } from '../model/services/NewsService';

export const useNewsViewModel = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchNews = async (query: string = '') => {
    setLoading(true);
    setError('');
    try {
      const articles = await NewsService.fetchNews(query);
      setNews(articles);
    } catch (err: any) {
      setError(err.message || 'Erro inesperado ao buscar notícias.');
    } finally {
      setLoading(false);
    }
  };

  return { news, loading, error, fetchNews };
};
