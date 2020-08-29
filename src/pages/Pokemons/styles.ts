import styled from 'styled-components/native';

export const Card = styled.TouchableOpacity`
  height: 115px;
  width: 46.5%;
  box-shadow: 0 5px 15px black;
  margin-bottom: 35px;
  margin-left: 10px;
  background-color: white;
`;

export const Heading = styled.Text`
  font-weight: 500;
  font-size: 16px;
  color: black;
  margin-left: 5.5px;
  margin-top: 10px;
  margin-bottom: 15px;
  text-transform: capitalize;
`;

export const StyledImage = styled.Image`
  position: absolute;
  height: 75%;
  bottom: 2.5%;
  right: 5%;
  width: 50%;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
