import { useLocalSearchParams } from 'expo-router';
import React, { useMemo } from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { NewsArticle } from '../model/services/NewsService';

const Details: React.FC = () => {
  const { article } = useLocalSearchParams();

  const newsArticle = useMemo<NewsArticle | null>(() => {
    if (!article) return null;
    try {
      const decoded = decodeURIComponent(article as string);
      return JSON.parse(decoded) as NewsArticle;
    } catch (err) {
      console.warn('Erro ao parsear o parâmetro "article":', err);
      return null;
    }
  }, [article]);

  if (!newsArticle) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Carregando ou artigo inválido.</Text>
      </View>
    );
  }

  const formattedDate = useMemo(() => {
    if (!newsArticle.publishedAt) return 'Data desconhecida';
    try {
      const date = new Date(newsArticle.publishedAt);
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return 'Data inválida';
    }
  }, [newsArticle.publishedAt]);

  const isTruncated = newsArticle.content?.includes('[+') ?? false;
  const cleanContent =
    newsArticle.content?.replace(/\[\+\d+\schars\]/, '').trim() ||
    newsArticle.description ||
    'Conteúdo indisponível.';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.articleCard}>
        {newsArticle.urlToImage && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: newsArticle.urlToImage }} style={styles.image} />
          </View>
        )}

        <Text style={styles.title}>{newsArticle.title ?? 'Título indisponível'}</Text>
        <Text style={styles.date}>Publicado em {formattedDate}</Text>

        <View style={styles.separator} />

        <Text style={styles.content}>{cleanContent}</Text>

        {isTruncated && newsArticle.url && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => Linking.openURL(newsArticle.url)}
          >
            <Text style={styles.buttonText}>Ler matéria completa no site 🔗</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4', // fundo neutro, tipo papel jornal
  },
  scrollContent: {
    padding: 16,
  },
  articleCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  imageContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#222',
    marginBottom: 10,
    lineHeight: 30,
    fontFamily: 'serif', // estilo mais editorial
  },
  date: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginBottom: 16,
  },
  content: {
    fontSize: 17,
    lineHeight: 26,
    color: '#333',
    textAlign: 'justify',
    marginBottom: 20,
    fontFamily: 'serif',
  },
  button: {
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Details;
