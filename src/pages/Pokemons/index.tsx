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

interface PokeData {
  name: string;
  id: number;
  types: string;
}

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
  id: number;
  types: Type;
}

const Pokemons: React.FC = () => {
  const [page, setPage] = useState(20);
  const [offset, setOffset] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/1/');
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [types, setTypes] = useState<Type[]>();
  const [data, setData] = useState<Data[]>([]);

  async function loadPokemons(limit = page) {
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
      .then((response) => {
        const data = response.data;

        setPokemons(data);

        const pokemonResults = data.results;

        if (pokemonResults === null) {
          return;
        }

        pokemonResults.forEach((element: any) => {
          setUrl(element.url);
        });

        const pokemonNames = pokemonResults.map((item: any) => item.name);

        setPage(page + 20);
        setOffset(offset + 20);
      });
  }

  async function loadUrl() {
    await axios.get(url).then((response) => {
      const data = response.data;

      setData(data);
      setName(data.name);
      setId(data.id);
      setTypes(data.types);
    });
  }

  useEffect(() => {
    async function load() {
      await loadPokemons();
      await loadUrl();
    }
    load();
  }, []);

  {
    pokemons.map === undefined && <Text style={styles.text}>Loading</Text>;
  }

  // Card
  const Item = (item: any, index: number) => {
    return (
      <View key={index}>
        <Text style={styles.text}>{item.name}</Text>
      </View>
    );
  };

  // const dados = data?.forEach((element) => {
  //   console.log(element.name);
  // });

  console.log(data);

  if (data == null) {
    return (
      <View
        style={{
          backgroundColor: '#ccc',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={styles.loading}>Loading</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.pokemons}>Pokemons</Text>
      <ScrollView
        style={{ paddingTop: 20 }}
        bounces={false}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
      >
        {/* Card Provisorio */}
        {/* {data.map((item) => {
          return (
            <View style={styles.card}>
              <Image
                resizeMode="contain"
                style={styles.image}
                source={{
                  uri: `https://pokeres.bastionbot.org/images/pokemon/${item.id}.png`,
                }}
              />
              <View style={styles.bottomCard}>
                <Text style={styles.pokemonName}>{item.name}</Text>
                <Text>#{item.id}</Text>
                {types?.map((item, index) => {
                  return <Text key={index}>{item.type.name}</Text>;
                })}
              </View>
            </View>
          );
        })} */}

        {/* // Nome dos pokemons */}
        {/* {pokemonsNames.map((item: any, index: number) => {
          return (
            <View
              style={{ alignItems: 'center', justifyContent: 'center' }}
              key={index}
            >
              <Text style={styles.text}>{item}</Text>
            </View>
          );
        })} */}

        {/* {pokeData!.map((item: Item) => {
          return (
            <View>
              <Text>{item.name}</Text>
              <Text>{item.id}</Text>
            </View>
          );
        })} */}
      </ScrollView>
      {/* <FlatList
        keyExtractor={(item: any) => item.id}
        data={data}
        renderItem={({ item }: any) => <Item {...item} />}
      /> */}
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
  loading: {
    fontSize: 24,
    letterSpacing: 1,
  },
});
