import styled from 'styled-components/native';

export const Container = styled.View``;

export const AboutContainer = styled.View`
  flex-direction: row;
  margin-left: 25px;
  margin-top: 15px;
`;

export const AbilityContainer = styled.View`
  margin-left: 25px;
  flex-direction: row;
`;

export const AboutText = styled.Text`
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
  margin-left: 15px;
  text-transform: capitalize;
`;

export const AbilityText = styled.Text`
  font-weight: 700;
  font-size: 15px;
  color: #000;
  line-height: 25px;
  margin-top: 5px;
  margin-left: 5px;
  text-transform: capitalize;
`;

export const Title = styled.Text`
  margin-left: 25px;
  margin-top: 25px;
  font-size: 16px;
  font-weight: 700;
`;
