import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import Header from '../../components/Header';
import { FlatList } from 'react-native-gesture-handler';

import {
  Container,
  StyledImage,
  PokemonName,
  BackgroundImage,
  BottomContainer,
  TitleText,
} from './styles';
import pokeball from '../../images/pokeball.png';

interface RouteProps {
  id: number;
}

interface TypeOject {
  name: string;
  url: string;
}

interface Type {
  slot: number;
  type: TypeOject;
}

const { height, width } = Dimensions.get('window');

const EspecifiedPokemon: React.FC = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [types, setTypes] = useState([]);
  const [slot, setSlot] = useState(0);
  const [typeColor, setTypeColor] = useState('');
  const [weight, setWeight] = useState(0);
  const [pokeHeight, setPokeHeight] = useState(0);

  const GRASS_COLOR = '#48d1ae';
  const FIRE_COLOR = '#fc6c6d';
  const WATER_COLOR = '#75bdfd';
  const LIGHTNING_COLOR = '#ffd66f';

  const route = useRoute();

  const { id } = route.params as RouteProps;

  useEffect(() => {
    async function loadPokemon() {
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => {
          const data = response.data;
          const name = data.name;
          const types = data.types;
          const weightPoke = data.weight;
          const heightPoke = data.height;

          setWeight(weightPoke);
          setPokeHeight(heightPoke);
          setData(data);
          setName(name);
          setTypes(types);
        });
    }
    loadPokemon();
  }, []);

  if (data === null) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#010101',
        }}
      >
        <Text style={{ color: '#FFF', fontSize: 24, fontFamily: '700' }}>
          Loading ...
        </Text>
      </View>
    );
  }

  const color = (color: string) => {
    if (color === 'grass') return GRASS_COLOR;
    if (color === 'fire') return FIRE_COLOR;
    if (color === 'water') return WATER_COLOR;
    if (color === 'lightning') return LIGHTNING_COLOR;
    if (color === 'poison') return GRASS_COLOR;
    return 'rgba(0, 0, 0, 0.7)';
  };

  const Item = (item: Type) => {
    const type = item.type.name;

    setTypeColor(type);
    setSlot(item.slot);

    return (
      <View
        style={{
          borderRadius: 10,
          width: 100,
          height: 28,
          backgroundColor: 'rgba(255, 255, 255, 0.25)',
          marginLeft: 20,
          marginTop: 10,
          alignSelf: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 17,
            color: '#FFF',
            marginLeft: 25,
          }}
        >
          {type}
        </Text>
      </View>
    );
  };

  return (
    <Container color={color(typeColor)}>
      <Header />
      <BackgroundImage
        style={{ marginLeft: width * 0.6, marginTop: height * 0.25 }}
        resizeMode="contain"
        source={pokeball}
      />
      <PokemonName>{name}</PokemonName>
      <FlatList
        horizontal={true}
        style={{
          height: 54,
          width: width,
          position: 'absolute',
          zIndex: 2,
          marginTop: height * 0.15,
        }}
        keyExtractor={(item: any) => item.type.name}
        data={types}
        renderItem={({ item }: any) => <Item {...item} />}
      />
      <StyledImage
        style={{ marginTop: height * 0.3 }}
        resizeMode="contain"
        source={{
          uri: `https://pokeres.bastionbot.org/images/pokemon/${id}.png`,
        }}
      />
      <BottomContainer style={{ marginTop: height * 0.34 }}>
        <TitleText>About</TitleText>
        <Text>{weight}</Text>
      </BottomContainer>
    </Container>
  );
};

export default EspecifiedPokemon;

const styles = StyleSheet.create({});
