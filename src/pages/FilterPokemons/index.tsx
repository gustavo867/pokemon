import React, { useState } from 'react';
import {
  Container,
  SearchInput,
  FilterText,
  SubmitButton,
  Row,
  ButtonText,
  CenterContainer,
  BottomText,
} from './styles';
import axios from 'axios';
import pokemonApi from '../../services/pokemon';
import Card from '../../components/Card';
import { useNavigation } from '@react-navigation/native';

interface TypeOject {
  name: string;
  url: string;
}
interface Type {
  slot: number;
  type: TypeOject;
}

const FilterPokemons: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState('');
  const [id, setId] = useState(0);
  const [types, setTypes] = useState<Type>();
  const [value, setValue] = useState('');
  const [colorName, setColorName] = useState('');

  async function loadPokemon() {
    await pokemonApi.get(`${value}`).then((response) => {
      const data = response.data;
      const name = data.name;
      const id = data.id;
      const types = data.types;

      setTypes(types);
      setName(name);
      setId(id);
    });
  }

  async function loadColor() {
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      .then((response) => {
        const data = response.data;

        setColorName(data.color.name);
      });
  }

  function handleSubmit() {
    loadPokemon();
    loadColor();
    setIsVisible(true);
  }

  const GRASS_COLOR = '#48d1ae';
  const FIRE_COLOR = '#fc6c6d';
  const WATER_COLOR = '#75bdfd';
  const LIGHTNING_COLOR = '#ffd66f';
  const BROWN_COLOR = '#8B4513';
  const GRAY_COLOR = '#d1d1e0';
  const PIKN_COLOR = '#f4bdc9';
  const PURPLE_COLOR = '#8257E5';
  const WHITE_COLOR = '#FFFFFF';
  const BLACK_COLOR = 'rgba(0, 0, 0, 0.7)';

  const color = (color: string) => {
    if (color === 'green') return GRASS_COLOR;
    if (color === 'red') return FIRE_COLOR;
    if (color === 'blue') return WATER_COLOR;
    if (color === 'black') return BLACK_COLOR;
    if (color === 'brown') return BROWN_COLOR;
    if (color === 'gray') return GRAY_COLOR;
    if (color === 'pink') return PIKN_COLOR;
    if (color === 'yellow') return LIGHTNING_COLOR;
    if (color === 'purple') return PURPLE_COLOR;
    if (color === 'white') return WHITE_COLOR;
    return BLACK_COLOR;
  };

  return (
    <Container>
      <FilterText>Filter</FilterText>
      <Row>
        <SearchInput
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 1,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,
            elevation: 24,
          }}
          placeholder="Search for pokemon"
          value={value}
          onChangeText={(text) => setValue(text)}
          autoCorrect={false}
          placeholderTextColor="#2d0c57"
        />
        <SubmitButton
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 1,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,
            elevation: 24,
          }}
          onPress={() => handleSubmit()}
        >
          <ButtonText>Search</ButtonText>
        </SubmitButton>
      </Row>
      <CenterContainer>
        {isVisible && (
          <Card name={name} id={id} type={types} color={color(colorName)} />
        )}
      </CenterContainer>
      <BottomText>
        If color doesn't appear click twice on search button
      </BottomText>
    </Container>
  );
};

export default FilterPokemons;
