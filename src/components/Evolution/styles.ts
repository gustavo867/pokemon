import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const topHeight = height * 0.03;

export const Container = styled.View``;

export const Row = styled.View`
  flex-direction: row;
  margin-top: 20px;
`;

export const StyledImage = styled.Image`
  width: 120px;
  height: 120px;
  margin-top: ${topHeight}px;
`;

export const PokemonName = styled.Text`
  font-weight: 500;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 5px;
  line-height: 25px;
  text-align: center;
  text-transform: capitalize;
`;

export const Level = styled.Text`
  font-weight: 500;
  font-size: 17px;
  color: #000;
  line-height: 28px;
`;
