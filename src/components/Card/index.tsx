import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

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
  types: any;
}

const { height, width } = Dimensions.get('window');

const Card: React.FC<Data> = ({ name, id, types }: Data) => {
  return (
    <View style={styles.card}>
      <Image
        resizeMode="contain"
        style={styles.image}
        source={{
          uri: `https://pokeres.bastionbot.org/images/pokemon/${id}.png`,
        }}
      />
      <View style={styles.bottomCard}>
        <Text style={styles.pokemonName}>{name}</Text>
        <Text>#{id}</Text>
        <Text>{types}</Text>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
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
