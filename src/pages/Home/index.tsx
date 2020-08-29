import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 25 }}>Hello</Text>
      <TouchableOpacity onPress={() => navigate('Pokemons')}>
        <Text>Go to Pokemons</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
