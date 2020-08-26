import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Pokemons from './pages/Pokemons';
import EspecifiedPokemon from './pages/EspecifiedPokemon';

const { Navigator, Screen } = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Navigator headerMode="none">
        <Screen name="Pokemons" component={Pokemons} />
        <Screen name="Pokemon" component={EspecifiedPokemon} />
      </Navigator>
    </NavigationContainer>
  );
}

export default Routes;
