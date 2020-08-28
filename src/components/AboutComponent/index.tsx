import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';

import {
  AboutContainer,
  AboutText,
  RightText,
  AbilityText,
  Title,
  Container,
  AbilityContainer,
} from './styles';

interface Ability {
  name: string;
  url: string;
}

interface Abilities {
  ability: Ability;
  isHidden: boolean;
  slot: number;
}

interface EggGroup {
  name: string;
  url: string;
}

interface Props {
  name: string;
  pokeHeight: number;
  weight: number;
  abilities: Abilities[];
  eggGroup: EggGroup[];
  type: string;
}

const { width } = Dimensions.get('window');

const AboutComponent: React.FC<Props> = ({
  name,
  pokeHeight,
  weight,
  abilities,
  eggGroup,
  type,
}: Props) => {
  function convertDecimetersToMetre(decimeter: number) {
    return decimeter / 10;
  }

  function convertDecimetersToFoot(decimeter: number) {
    return (decimeter / 3).toFixed(2);
  }

  function convertHectogramsToLbs(hectogram: number) {
    return (hectogram / 4.535).toFixed(2);
  }

  function convertHectogramsToKgs(hectogram: number) {
    return (hectogram / 10).toFixed(2);
  }

  return (
    <Container>
      <AboutContainer>
        <View>
          <AboutText>Name </AboutText>
          <AboutText>Height </AboutText>
          <AboutText>Weight </AboutText>
        </View>
        <View>
          <RightText>{name}</RightText>
          <RightText>
            {convertDecimetersToFoot(pokeHeight)} ft (
            {convertDecimetersToMetre(pokeHeight)}) m
          </RightText>
          <RightText>
            {convertHectogramsToLbs(weight)} Lbs{' '}
            {convertHectogramsToKgs(weight)} Kgs
          </RightText>
        </View>
        <AbilityContainer style={{ marginLeft: 180, position: 'absolute' }}>
          <AboutText>Abilities</AboutText>
          <View
            style={{
              flexDirection: 'column',
              marginLeft: 10,
              marginTop: 5,
            }}
          >
            {abilities.map((item: Abilities) => {
              return (
                <AbilityText key={item.slot}>{item.ability.name}</AbilityText>
              );
            })}
          </View>
        </AbilityContainer>
      </AboutContainer>
      <Title>Breeding</Title>
      <AboutContainer>
        <View>
          <AboutText>Egg Groups</AboutText>
          <AboutText>Egg Cycle</AboutText>
        </View>
        <View>
          <View style={{ flexDirection: 'row' }}>
            {eggGroup.map((item: EggGroup) => {
              return <RightText key={item.name}>{item.name}</RightText>;
            })}
          </View>
          <RightText>{type}</RightText>
        </View>
      </AboutContainer>
    </Container>
  );
};

export default AboutComponent;
