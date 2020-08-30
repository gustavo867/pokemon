import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';

import { AbilityText, Row } from './styles';

interface Move {
  name: string;
  url: string;
}

interface Item {
  move: Move;
}

interface Props {
  id: number | string;
}

const Moves: React.FC<Props> = ({ id }: Props) => {
  const [moves, setMoves] = useState([]);

  useEffect(() => {
    async function loadMoves() {
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => {
          const data = response.data;

          setMoves(data.moves);
        });
    }
    loadMoves();
  }, []);

  const Item = (item: Item) => {
    return (
      <Row>
        <AbilityText>{item.move.name}</AbilityText>
      </Row>
    );
  };

  return (
    <View>
      <FlatList
        keyExtractor={(item: Item) => item.move.name}
        data={moves}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: any) => <Item {...item} />}
        numColumns={2}
        style={{ marginBottom: 20 }}
        columnWrapperStyle={{
          justifyContent: 'space-around',
        }}
      />
    </View>
  );
};

export default Moves;
