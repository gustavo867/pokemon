import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import { RectButton } from 'react-native-gesture-handler';

const { height, width } = Dimensions.get('window');

const Pokemons: React.FC = () => {
  const [page, setPage] = useState(20);
  const [offset, setOffset] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonsNames, setPokemonsNames] = useState([]);
  const [url, setUrl] = useState('');
  const [pokeData, setPokeData] = useState();

  async function loadPokemons(limit = page) {
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
      .then((response) => {
        const data = response.data;

        const pokemonResults = data.results;

        pokemonResults.forEach((element: any) => {
          setPokemonName(element.name);
          setUrl(element.url);
        });

        const pokemonNames = pokemonResults.map((item: any) => item.name);

        setPokemonsNames(pokemonNames);
        setPage(page + 20);
        setOffset(offset + 20);
      });
  }

  async function loadUrl() {
    await axios.get(url).then((response) => {
      const data = response.data;

      setPokeData(data);
      console.log(data);
    });
  }

  useEffect(() => {
    loadPokemons();
    {
      url !== null && loadUrl();
    }
  }, []);

  {
    pokemons.map === undefined && <Text style={styles.text}>Loading</Text>;
  }

  const Item = (item: any, index: number) => {
    return (
      <View key={index}>
        <Text style={styles.text}>{item.name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pokemons}>Pokemons</Text>
      <ScrollView
        style={{ paddingTop: 20 }}
        bounces={false}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={{
              uri: 'https://pokeres.bastionbot.org/images/pokemon/1.png',
            }}
          />
          <View style={styles.bottomCard}>
            <Text style={styles.pokemonName}>Bulbasaur</Text>
            <Text>#1</Text>
            <Text style={styles.ability}>poison</Text>
            <Text style={styles.ability}>grass</Text>
          </View>
        </View>
        {pokemonsNames.map((item: any, index: number) => {
          return (
            <View
              style={{ alignItems: 'center', justifyContent: 'center' }}
              key={index}
            >
              <Text style={styles.text}>{item}</Text>
            </View>
          );
        })}
        {/* <FlatList
          keyExtractor={(item: any) => item.id}
          data={pokeData}
          renderItem={({ item }: any) => <Item {...item} />}
        /> */}
        {pokeData!.map((item: any) => {
          return <Text>{item.name}</Text>;
        })}
      </ScrollView>
      <RectButton onPress={() => loadPokemons()} style={styles.loadButton}>
        <Text style={styles.load}>Load More Pokemons</Text>
      </RectButton>
    </View>
  );
};

export default Pokemons;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
  },
  text: {
    color: '#FFF',
    fontSize: 20,
    letterSpacing: 2,
  },
  load: {
    color: '#010101',
    fontSize: 22,
  },
  loadButton: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 56,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  pokemons: {
    fontSize: 25,
    color: '#FFF',
  },
  image: {
    height: height / 2.5,
    width: width,
    alignSelf: 'center',
  },
  card: {
    height: height / 1.6,
    width: width * 0.9,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 8,
  },
  bottomCard: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    flex: 1,
    padding: 20,
  },
  pokemonName: {
    color: '#010101',
    fontSize: 24,
    letterSpacing: 1.5,
  },
  ability: {
    color: '#010101',
    fontSize: 14,
    letterSpacing: 1,
  },
});
