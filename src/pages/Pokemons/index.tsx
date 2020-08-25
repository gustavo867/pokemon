import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  SafeAreaView,
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
  const [page, setPage] = useState(10);
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState<Data | any>([]);

  async function loadPokemons(limit = page) {
    await api.get(`offset=${offset}&limit=${limit}`).then((response) => {
      const data = response.data;

      setData(data.results);
      setOffset(offset + 10);
      setPage(page + 10);
    });
  }

  useEffect(() => {
    loadPokemons();
  }, []);

  // useEffect(() => {
  //   async function loadTypes() {
  //     await axios.get(url).then((response) => {
  //       const data = response.data;
  //       const types = data.types;

  //       types.forEach((element: Type) => {
  //         // console.log(element.slot);
  //       });

  //       setTypes(types);
  //     });
  //   }
  //   loadTypes();
  // }, []);

  const Item = (item: Data) => {
    const urls = item.url;

    const pokeId = urls
      .replace('https://pokeapi.co/api/v2/pokemon/', '')
      .replace('/', '');

    const colorsUrl = `https://pokeapi.co/api/v2/pokemon-color/${pokeId}`;

    // async function loadColor() {
    //   await axios.get(colorsUrl).then((response) => {
    //     const colorData = response.data;
    //     const color = colorData.name;

    //     setColors(color);

    //     // console.log(colors);
    //   });
    // }

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
          {/* {types.map((item: Type, index: number) => {
            return <Text key={index}>{item.type.name}</Text>;
          })} */}
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
        bounces={true}
        showsVerticalScrollIndicator={false}
        onEndReached={() => loadPokemons()}
        onEndReachedThreshold={0.1}
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
  ability: {
    color: '#010101',
    fontSize: 14,
    letterSpacing: 1,
  },
  loading: {
    fontSize: 24,
    letterSpacing: 1,
  },
  image: {
    height: height / 2.5,
    width: width,
    alignSelf: 'center',
  },
  card: {
    height: height / 1.6,
    width: width * 0.9,
    borderRadius: 8,
    margin: 20,
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
});
