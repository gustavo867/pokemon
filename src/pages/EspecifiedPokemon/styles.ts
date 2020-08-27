import { Platform, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import Constants from 'expo-constants';

interface Props {
  color: string;
}

const { height, width } = Dimensions.get('window');

const lineWidth = width / 1.1;

const statusBarHeight =
  Platform.OS === 'android' ? Constants.statusBarHeight : 0;

export const Container = styled.SafeAreaView`
  flex: 1;
  padding-top: ${statusBarHeight}px;
  background-color: ${(props: Props) => props.color};
`;

export const StyledImage = styled.Image`
  width: ${width}px;
  height: 250px;
  position: absolute;
  z-index: 1;
`;

export const PokemonName = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  text-transform: capitalize;
  margin-left: 25px;
  margin-top: 15px;
`;

export const BackgroundImage = styled.Image`
  position: absolute;
  z-index: -10;
  height: 200px;
  width: 200px;
  transform: rotateY(0deg) rotateX(0deg) rotateZ(-10deg);
`;

export const BottomContainer = styled.View`
  flex: 1;
  background-color: #fff;
  border-top-right-radius: 24px;
  border-top-left-radius: 24px;
`;

export const Line = styled.View`
  border-color: rgba(0, 0, 0, 0.3);
  border-width: 1px;
  width: ${lineWidth}px;
  height: 1px;
  margin-top: 15px;
  align-self: center;
`;
