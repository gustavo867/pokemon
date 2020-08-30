import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';

import { Container, Row, StyledImage, PokemonName, Level } from './styles';

interface Evolution {
  min_level: number;
}

interface Species {
  name: string;
  url: string;
}

interface Item {
  evolution_details: Evolution[];
  species: Species;
}

interface Props {
  id: number | string;
  name: string;
}

const { width, height } = Dimensions.get('window');

const Evolution: React.FC<Props> = ({ id, name }: Props) => {
  const [evolution, setEvolution] = useState([]);
  const [url, setUrl] = useState('');
  const [evolutionId, setEvolutionId] = useState(0);
  const [load, setLoad] = useState(true);
  const [evolutionDetails, setEvolutionDetails] = useState<Evolution[] | any>();

  useEffect(() => {
    async function loadEvolution() {
      await axios
        .get(`https://pokeapi.co/api/v2/evolution-chain/${id}`)
        .then((response) => {
          const data = response.data;
          const evolves = data.chain.evolves_to;

          setEvolution(evolves);
        });
    }
    loadEvolution();
  }, []);

  useEffect(() => {
    async function loadId() {
      await axios.get(url).then((response) => {
        const id = response.data.id;

        setEvolutionId(id);
      });
    }
    !load && loadId();
  }, [url]);

  const Item = (item: Item) => {
    setUrl(item.species.url);
    setLoad(false);
    setEvolutionDetails(item.evolution_details);
    return (
      <View>
        <StyledImage
          resizeMode="contain"
          source={{
            uri: `https://pokeres.bastionbot.org/images/pokemon/${evolutionId}.png`,
          }}
        />
        <PokemonName>{item.species.name}</PokemonName>
      </View>
    );
  };

  return (
    <View>
      <Row>
        <View style={{ marginLeft: 20 }}>
          <StyledImage
            resizeMode="contain"
            source={{
              uri: `https://pokeres.bastionbot.org/images/pokemon/${id}.png`,
            }}
          />
          <PokemonName>{name}</PokemonName>
        </View>
        <View style={{ marginTop: 30 }}>
          <AntDesign
            style={{ marginTop: 20, marginLeft: 35 }}
            name="arrowright"
            size={24}
            color="black"
          />
          {evolutionDetails !== undefined &&
            evolutionDetails.map((item: Evolution, index: number) => {
              return (
                <View key={index} style={{ marginTop: 10, marginLeft: 30 }}>
                  <Level>Lvl {item.min_level}</Level>
                </View>
              );
            })}
        </View>
        <FlatList
          keyExtractor={(item: any) => item.species.name}
          data={evolution}
          renderItem={({ item }: any) => <Item {...item} />}
          style={{
            position: 'absolute',
            marginLeft: width * 0.6,
          }}
        />
      </Row>
    </View>
  );
};

export default Evolution;
