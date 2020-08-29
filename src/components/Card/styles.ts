import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const cardWidth = width * 0.9;
const cardHeight = height * 0.7;

const imageWidth = width * 0.6;
const imageHeight = width * 0.5;

export const CardContainer = styled.TouchableOpacity`
  height: ${cardHeight}px;
  width: ${cardWidth}px;
  box-shadow: 0 5px 15px black;
  background-color: white;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const Row = styled.View`
  flex-direction: row;
`;

export const Heading = styled.Text`
  font-weight: 500;
  font-size: 32px;
  color: black;
  margin-left: 5.5px;
  margin-top: 10px;
  margin-bottom: 15px;
  text-transform: capitalize;
`;

export const StyledImage = styled.Image`
  height: ${imageHeight}px;
  width: ${imageWidth}px;
`;

export const Types = styled.View`
  border-radius: 10px;
  width: 100px;
  height: 28px;
  background-color: rgba(255, 255, 255, 0.25);
  margin-left: 20px;
  margin-top: 10px;
  align-self: center;
  justify-content: center;
`;

export const TypesText = styled.Text`
  font-size: 17px;
  color: #fff;
  margin-left: 25px;
  text-transform: capitalize;
`;
