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
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

interface Data {
  name: string;
  url: string;
  color: string;
}

const Card = styled.TouchableOpacity`
  background-color: white;
  height: 115px;
  width: 46.5%;
  box-shadow: 0 5px 15px black;
  margin-bottom: 35px;
  margin-left: 10px;
`;

const Heading = styled.Text`
  font-weight: 500;
  font-size: 16px;
  color: black;
  margin-left: 5.5px;
  margin-top: 10px;
  margin-bottom: 15px;
`;

const StyledImage = styled.Image`
  position: absolute;
  height: 75%;
  bottom: 2.5%;
  right: 5%;
  width: 50%;
`;

const Pokemons: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(35);
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState<Data | any>([]);

  const { navigate } = useNavigation();

  async function loadPokemons(limit = page) {
    setLoading(true);
    await api.get(`offset=${offset}&limit=${limit}`).then((response) => {
      const data = response.data;
      const results = data.results;

      setData(results);
      setOffset(offset + 30);
      setPage(page + 30);
      setLoading(false);
    });
  }

  useEffect(() => {
    loadPokemons();
  }, []);

  function handleToPokemon(id: string) {
    navigate('Pokemon', { id });
  }

  const Item = (item: Data) => {
    const urls = item.url;

    const pokeId = urls
      .replace('https://pokeapi.co/api/v2/pokemon/', '')
      .replace('/', '');

    return (
      <Card
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
        }}
        key={item.name}
        activeOpacity={0.5}
        onPress={() => handleToPokemon(pokeId)}
      >
        <Heading>{item.name}</Heading>
        <StyledImage
          resizeMode="contain"
          source={{
            uri: `https://pokeres.bastionbot.org/images/pokemon/${pokeId}.png`,
          }}
        />
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pokemons}>Pokédex</Text>
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
    backgroundColor: '#f5f5f5',
  },
  text: {
    color: '#000',
    fontSize: 20,
    letterSpacing: 2,
  },
  pokemons: {
    fontSize: 25,
    color: '#000',
    marginLeft: 25,
    marginBottom: 25,
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
