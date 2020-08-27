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
          <RightText>{pokeHeight}</RightText>
          <RightText>{weight}</RightText>
        </View>
        <AbilityContainer>
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
