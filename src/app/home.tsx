import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NewsArticle } from '../model/services/NewsService';
import { useNewsViewModel } from '../viewmodel/NewsViewModel';

const NoResults: React.FC = () => (
  <View style={styles.noResultsContainer}>
    <Ionicons name="newspaper-outline" size={90} color="#bbb" style={styles.noResultsIcon} />
    <Text style={styles.noResultsText}>
      Nenhum conteúdo foi encontrado. Tente novamente com outro termo.
    </Text>
  </View>
);

export const Home: React.FC = () => {
  const { news, loading, error, fetchNews } = useNewsViewModel();
  const [query, setQuery] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSearch = () => {
    fetchNews(query);
  };

  const renderItem = ({ item }: { item: NewsArticle }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: '/Details',
          params: { article: encodeURIComponent(JSON.stringify(item)) },
        })
      }
    >
      {item.urlToImage ? (
        <Image source={{ uri: item.urlToImage }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.placeholderImage]}>
          <Ionicons name="image-outline" size={40} color="#aaa" />
        </View>
      )}
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Campo de busca com ícone */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar notícias..."
          placeholderTextColor="#888"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
        />
      </View>

      {loading && <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />}
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : news.length === 0 ? (
        <NoResults />
      ) : (
        <FlatList
          data={news}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },
  searchIcon: { marginRight: 6 },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 15,
    color: '#333',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center', // Centraliza verticalmente a imagem
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 14,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    paddingVertical: 8,
  },
  image: {
    width: 110,
    height: 90,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: 'center', // garante que a imagem fique centralizada verticalmente
  },
  placeholderImage: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    width: 110,
    height: 90,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#555',
    lineHeight: 18,
  },
  error: {
    color: '#c00',
    textAlign: 'center',
    marginTop: 20,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsIcon: { marginBottom: 16 },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    maxWidth: '80%',
  },
});

export default Home;
