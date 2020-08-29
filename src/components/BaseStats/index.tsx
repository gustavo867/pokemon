import React from 'react';
import { FlatList } from 'react-native';
import {
  Container,
  ProgressBar,
  StatsText,
  StatsContainer,
  ProgressContainer,
  RightText,
  Title,
  SmallText,
} from './styles';

interface StatProps {
  name: string;
  url: string;
}

interface StatsProps {
  base_stat: number;
  effort: number;
  stat: StatProps;
}

interface Stat {
  stats: StatsProps[];
  name: string;
}

const BaseStats: React.FC<Stat> = ({ stats, name }: Stat) => {
  const Item = (item: StatsProps) => {
    const stat = item.base_stat;

    const colors = stat < 50 ? ['#f2709c', '#ff9472'] : ['#00FF00', '#00FF7F'];

    const name = (name: string) => {
      if (name === 'hp') return 'Hp';
      if (name === 'attack') return 'Attack';
      if (name === 'defense') return 'Defense';
      if (name === 'special-attack') return 'Sp.Attack';
      if (name === 'special-defense') return 'Sp.Defense';
      if (name === 'speed') return 'Speed';
      return 'HP';
    };

    return (
      <StatsContainer>
        <StatsText>{name(item.stat.name)}</StatsText>
        <RightText>{stat}</RightText>
        <ProgressContainer>
          <ProgressBar
            colors={colors}
            style={{ width: `${stat}%`, opacity: 1 }}
          />
        </ProgressContainer>
      </StatsContainer>
    );
  };

  return (
    <Container>
      <FlatList
        keyExtractor={(item) => item.stat.url}
        data={stats}
        renderItem={({ item }: any) => <Item {...item} />}
      />
      <Title>Type Defenses</Title>
      <SmallText>The effectiveness of each type on {name}</SmallText>
    </Container>
  );
};

export default BaseStats;
