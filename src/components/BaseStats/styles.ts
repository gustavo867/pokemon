import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const halfWidth = width / 2;

export const Container = styled.View`
  width: ${width}px;
  margin-left: 25px;
  margin-top: 15px;
`;

export const ProgressContainer = styled.View`
  background-color: #d8d8d8;
  border-radius: 20px;
  margin-top: 20px;
  height: 10px;
  width: ${halfWidth}px;
`;

export const StatsContainer = styled.View`
  flex-direction: row;
`;

export const ProgressBar = styled(LinearGradient)`
  border-radius: 20px;
  color: #fff;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 0;
  opacity: 0;
  max-width: 200px;
`;

export const StatsText = styled.Text`
  font-weight: 400;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 10px;
  line-height: 25px;
`;

export const RightText = styled.Text`
  font-weight: 700;
  font-size: 15px;
  color: #000;
  line-height: 25px;
  margin-top: 10px;
  margin-right: 10px;
  width: 30px;
`;
