import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Pokemons from './pages/Pokemons';
import EspecifiedPokemon from './pages/EspecifiedPokemon';
import FilterPokemons from './pages/FilterPokemons';
import Home from './pages/Home';

const { Navigator, Screen } = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Navigator headerMode="none">
        <Screen name="Home" component={Home} />
        <Screen name="Pokemons" component={Pokemons} />
        <Screen name="Pokemon" component={EspecifiedPokemon} />
        <Screen name="Filter" component={FilterPokemons} />
      </Navigator>
    </NavigationContainer>
  );
}

export default Routes;
