import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import { Card, Heading, StyledImage, Row } from './styles';
import { RectButton } from 'react-native-gesture-handler';
import Loading from '../../components/Loading';

const { height } = Dimensions.get('window');
interface Data {
  name: string;
  url: string;
  color: string;
}

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

  function handleToFilter() {
    navigate('Filter');
  }

  function handleToPokemon(id: string) {
    navigate('Pokemon', { id });
  }

  const Item = (item: Data) => {
    const url = item.url;

    const pokeId = url
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

  if (data.map === undefined) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Row>
        <Text style={styles.pokemons}>Pokédex</Text>
        <RectButton onPress={() => handleToFilter()}>
          <Text style={[styles.pokemons, { marginRight: 20 }]}>Filter</Text>
        </RectButton>
      </Row>
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
  pokemons: {
    fontSize: 25,
    color: '#000',
    marginLeft: 25,
    marginBottom: 25,
  },
});
