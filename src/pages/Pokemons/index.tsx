import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import api from '../../services/api';

const { height, width } = Dimensions.get('window');

interface TypeOject {
  name: string;
  url: string;
}

interface Type {
  slot: number;
  type: TypeOject;
}
interface Data {
  name: string;
  url: string;
  color: string;
}

const Pokemons: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(10);
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState<Data | any>([]);

  async function loadPokemons(limit = page) {
    setLoading(true);
    await api.get(`offset=${offset}&limit=${limit}`).then((response) => {
      const data = response.data;

      setData(data.results);
      setOffset(offset + 10);
      setPage(page + 10);
      setLoading(false);
    });
  }

  useEffect(() => {
    loadPokemons();
  }, []);

  const Item = (item: Data) => {
    const urls = item.url;

    const pokeId = urls
      .replace('https://pokeapi.co/api/v2/pokemon/', '')
      .replace('/', '');

    return (
      <View key={item.name} style={[styles.card]}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={{
            uri: `https://pokeres.bastionbot.org/images/pokemon/${pokeId}.png`,
          }}
        />
        <View style={styles.bottomCard}>
          <Text style={styles.pokemonName}>{item.name}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pokemons}>Pokemons</Text>
      <FlatList
        data={data}
        keyExtractor={(item: any) => item.name}
        renderItem={({ item }: any) => <Item {...item} />}
        bounces={false}
        showsVerticalScrollIndicator={false}
        onEndReached={() => loadPokemons()}
        onEndReachedThreshold={0.1}
        numColumns={2}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 10 }}
        ListFooterComponent={
          (loading && (
            <ActivityIndicator color="#000" size="small" animating={loading} />
          )) ||
          null
        }
      />
    </SafeAreaView>
  );
};

export default Pokemons;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: height * 0.05,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
  },
  text: {
    color: '#FFF',
    fontSize: 20,
    letterSpacing: 2,
  },
  pokemons: {
    fontSize: 25,
    color: '#FFF',
  },
  loading: {
    fontSize: 24,
    letterSpacing: 1,
  },
  image: {
    height: height / 3.4,
    width: width / 2.8,
    alignSelf: 'center',
  },
  card: {
    height: height / 2.0,
    width: '45%',
    borderRadius: 8,
    margin: 10,
    flexGrow: 1,
    flexShrink: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
  },
  bottomCard: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    flex: 1,
    padding: 20,
  },
  pokemonName: {
    color: '#010101',
    fontSize: 15,
    letterSpacing: 1.5,
  },
});
