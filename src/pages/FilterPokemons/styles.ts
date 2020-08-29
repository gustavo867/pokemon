import { Platform, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import Constants from 'expo-constants';

const { width } = Dimensions.get('window');

const inputWidth = width * 0.6;
const buttonWidth = width * 0.35;
const textWidth = width * 0.8;

const statusBarHeight =
  Platform.OS === 'android' ? Constants.statusBarHeight : 0;

export const Container = styled.SafeAreaView`
  flex: 1;
  padding-top: ${statusBarHeight}px;
  background-color: #fff;
`;

export const CenterContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const SearchInput = styled.TextInput`
  margin-top: 27px;
  align-items: center;
  flex-direction: row;
  width: ${inputWidth}px;
  background-color: #ffffff;
  border-radius: 27px;
  border-color: #d9d0e3;
  height: 47px;
  margin-left: 5px;
  font-size: 17px;
  color: #2d0c57;
  text-align: center;
  border-width: 1px;
  text-transform: lowercase;
`;

export const FilterText = styled.Text`
  color: #000;
  font-size: 23px;
  align-self: center;
  margin-top: 15px;
`;

export const SubmitButton = styled.TouchableOpacity`
  background-color: #ffffff;
  width: ${buttonWidth}px;
  align-items: center;
  justify-content: center;
  height: 47px;
  margin-top: 27px;
  border-radius: 27px;
  margin-right: 10px;
`;

export const ButtonText = styled.Text`
  color: #2d0c57;
  font-size: 17px;
`;

export const BottomText = styled.Text`
  font-weight: 400;
  font-size: 17px;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 25px;
  margin-left: 25px;
  line-height: 15px;
  width: ${textWidth}px;
`;
