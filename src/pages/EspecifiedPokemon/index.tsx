import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
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
  Line,
} from './styles';
import pokeball from '../../images/pokeball.png';
import { getCategories } from '../../../categories';
import Loading from '../../components/Loading';
import AboutComponent from '../../components/AboutComponent';

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

interface EggGroup {
  name: string;
  url: string;
}

interface Egg {
  egg_group: EggGroup;
}

const { height, width } = Dimensions.get('window');

const EspecifiedPokemon: React.FC = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [types, setTypes] = useState([]);
  const [typeColor, setTypeColor] = useState('');
  const [weight, setWeight] = useState(0);
  const [pokeHeight, setPokeHeight] = useState(0);
  const [abilities, setAbilities] = useState([]);
  const [eggGroup, setEggGroup] = useState<Egg | any>([]);
  const [type, setType] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('About');

  const GRASS_COLOR = '#48d1ae';
  const FIRE_COLOR = '#fc6c6d';
  const WATER_COLOR = '#75bdfd';
  const LIGHTNING_COLOR = '#ffd66f';

  const categories = getCategories();
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
          const ability = data.abilities;

          setAbilities(ability);

          setWeight(weightPoke);
          setPokeHeight(heightPoke);
          setData(data);
          setName(name);
          setTypes(types);
        });
    }
    loadPokemon();
  }, []);

  useEffect(() => {
    async function loadColor() {
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        .then((response) => {
          const data = response.data;

          setEggGroup(data.egg_groups);
          setTypeColor(data.color.name);
        });
    }
    loadColor();
  }, []);

  if (data === null) {
    return <Loading />;
  }

  const changeCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const color = (color: string) => {
    if (color === 'green') return GRASS_COLOR;
    if (color === 'red') return FIRE_COLOR;
    if (color === 'blue') return WATER_COLOR;
    if (color === 'black') return 'rgba(0, 0, 0, 0.6)';
    if (color === 'brown') return '#8B4513';
    if (color === 'gray') return '#d1d1e0';
    if (color === 'pink') return '#f4bdc9';
    if (color === 'yellow') return LIGHTNING_COLOR;
    if (color === 'purple') return '#8257E5';
    if (color === 'white') return '#FFF';
    return 'rgba(0, 0, 0, 0.7)';
  };

  const Item = (item: Type) => {
    const type = item.type.name;

    setType(type);
    return (
      <View style={styles.types}>
        <Text style={styles.typesText}>{type}</Text>
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
        style={{ marginTop: height * 0.21 }}
        resizeMode="contain"
        source={{
          uri: `https://pokeres.bastionbot.org/images/pokemon/${id}.png`,
        }}
      />
      <BottomContainer style={{ marginTop: height * 0.34 }}>
        <View
          style={{
            marginTop: 45,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          {categories.map((category, index) => {
            return (
              <TouchableOpacity
                onPress={() => changeCategory(category)}
                key={index}
                style={[styles.button]}
              >
                <Text
                  style={[
                    styles.textButton,
                    {
                      fontWeight:
                        selectedCategory === category ? 'bold' : '500',
                      color:
                        selectedCategory === category
                          ? '#000'
                          : 'rgba(0, 0, 0, 0.4)',
                    },
                  ]}
                >
                  {category}
                </Text>
                {selectedCategory === category && (
                  <View
                    style={{
                      backgroundColor: '#0000ff',
                      width: 50,
                      height: 2,
                      marginTop: 35,
                    }}
                  ></View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
        <Line></Line>
        {selectedCategory === 'About' && (
          <AboutComponent
            type={type}
            eggGroup={eggGroup}
            abilities={abilities}
            name={name}
            pokeHeight={pokeHeight}
            weight={weight}
          />
        )}
      </BottomContainer>
    </Container>
  );
};

export default EspecifiedPokemon;

const styles = StyleSheet.create({
  button: {
    height: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    letterSpacing: 2,
  },
  textButton: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 16,
  },
  types: {
    borderRadius: 10,
    width: 100,
    height: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    marginLeft: 20,
    marginTop: 10,
    alignSelf: 'center',
    textTransform: 'capitalize',
  },
  typesText: {
    fontSize: 17,
    color: '#FFF',
    marginLeft: 25,
    textTransform: 'capitalize',
  },
});
