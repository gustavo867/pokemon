import React, { useEffect, useMemo, useState } from 'react';
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
import Input from '../../components/Input';

const { height } = Dimensions.get('window');

interface Data {
  name: string;
  url: string;
  color: string;
}

const Pokemons: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [pokemons, setPokemons] = useState<Data | any>([]);
  const [pokeName, setPokeName] = useState('');
  const { navigate } = useNavigation();

  const loadPokemons = useMemo(async () => {
    setLoading(true);
    setRefreshing(true);
    await api.get(`offset=0&limit=1050`).then((response) => {
      const data = response.data;
      const results = data.results;

      setPokemons(results);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    loadPokemons;
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
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png`,
          }}
        />
      </Card>
    );
  };

  if (pokemons.map === undefined) {
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
        data={pokemons.filter((pokemon: Data) => {
          return pokemon.name.includes(pokeName);
        })}
        keyExtractor={(item: any) => item.url}
        renderItem={({ item }: any) => <Item {...item} />}
        bounces={false}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        numColumns={2}
        ListHeaderComponent={
          (loading && (
            <ActivityIndicator color="#000" size="small" animating={loading} />
          )) || (
            <Input
              label="Search"
              value={pokeName}
              onChangeText={(text) => setPokeName(text)}
              autoCorrect={false}
              autoCapitalize="none"
            />
          )
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
