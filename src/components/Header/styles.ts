import { Platform } from 'react-native';
import styled from 'styled-components/native';
import Constants from 'expo-constants';

const statusBarHeight =
  Platform.OS === 'android' ? Constants.statusBarHeight : 0;

export const Wrapper = styled.View`
  padding-top: ${statusBarHeight}px;
  flex-direction: row;
  justify-content: space-between;
`;

export const Button = styled.TouchableOpacity`
  margin-right: 20px;
  margin-left: 20px;
`;
