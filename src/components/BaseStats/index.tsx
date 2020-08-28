import React from 'react';
import { View, Text } from 'react-native';

import {
  Container,
  ProgressBar,
  StatsText,
  StatsContainer,
  ProgressContainer,
  RightText,
} from './styles';

interface Props {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  spAttack: number;
  spDefense: number;
}

const BaseStats: React.FC<Props> = ({
  hp,
  attack,
  defense,
  speed,
  spAttack,
  spDefense,
}: Props) => {
  const total = hp + attack + defense + speed;

  return (
    <Container>
      <StatsContainer>
        <View>
          <StatsText>HP</StatsText>
          <StatsText>Attack</StatsText>
          <StatsText>Defense</StatsText>
          <StatsText>Sp.Defense</StatsText>
          <StatsText>Sp.Attack</StatsText>
          <StatsText>Speed</StatsText>
          <StatsText>Total</StatsText>
        </View>
        <View style={{ marginLeft: 20 }}>
          <View style={{ flexDirection: 'row' }}>
            <RightText>{hp}</RightText>
            <ProgressContainer>
              <ProgressBar
                colors={
                  hp < 50 ? ['#f2709c', '#ff9472'] : ['#00FF00', '#00FF7F']
                }
                style={{ width: `${hp}%`, opacity: 1 }}
              />
            </ProgressContainer>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <RightText>{attack}</RightText>
            <ProgressContainer>
              <ProgressBar
                colors={
                  attack < 50 ? ['#f2709c', '#ff9472'] : ['#00FF00', '#00FF7F']
                }
                style={{ width: `${attack}%`, opacity: 1 }}
              />
            </ProgressContainer>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <RightText>{spAttack}</RightText>
            <ProgressContainer>
              <ProgressBar
                colors={
                  attack < 50 ? ['#f2709c', '#ff9472'] : ['#00FF00', '#00FF7F']
                }
                style={{ width: `${spAttack}%`, opacity: 1 }}
              />
            </ProgressContainer>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <RightText>{spDefense}</RightText>
            <ProgressContainer>
              <ProgressBar
                colors={
                  attack < 50 ? ['#f2709c', '#ff9472'] : ['#00FF00', '#00FF7F']
                }
                style={{ width: `${spDefense}%`, opacity: 1 }}
              />
            </ProgressContainer>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <RightText>{speed}</RightText>
            <ProgressContainer>
              <ProgressBar
                colors={
                  speed < 50 ? ['#f2709c', '#ff9472'] : ['#00FF00', '#00FF7F']
                }
                style={{ width: `${speed}%`, opacity: 1 }}
              />
            </ProgressContainer>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <RightText>{defense}</RightText>
            <ProgressContainer>
              <ProgressBar
                colors={
                  defense < 50 ? ['#f2709c', '#ff9472'] : ['#00FF00', '#00FF7F']
                }
                style={{ width: `${defense}%`, opacity: 1 }}
              />
            </ProgressContainer>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <RightText>{total}</RightText>
            <ProgressContainer>
              <ProgressBar
                colors={
                  total < 50 ? ['#f2709c', '#ff9472'] : ['#00FF00', '#00FF7F']
                }
                style={{ width: `${total}%`, opacity: 1 }}
              />
            </ProgressContainer>
          </View>
        </View>
      </StatsContainer>
    </Container>
  );
};

export default BaseStats;
