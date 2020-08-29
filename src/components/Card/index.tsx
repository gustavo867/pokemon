import React from 'react';
import { Dimensions, Text } from 'react-native';
import {
  CardContainer,
  Heading,
  StyledImage,
  Types,
  TypesText,
  Row,
} from './styles';

interface TypeOject {
  name: string;
  url: string;
}

interface Type {
  slot: number;
  type: TypeOject;
}

interface Props {
  id: number | string;
  name: string;
  type: Type | any;
  color: string;
}

const { width, height } = Dimensions.get('window');

const Card: React.FC<Props> = ({ id, name, type, color }: Props) => {
  return (
    <CardContainer
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 5,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
        elevation: 24,
        backgroundColor: color === 'rgba(0, 0, 0, 0.7)' ? '#FFFFFF' : color,
      }}
      activeOpacity={0.9}
    >
      <Heading>{name}</Heading>
      <StyledImage
        resizeMode="contain"
        source={{
          uri: `https://pokeres.bastionbot.org/images/pokemon/${id}.png`,
        }}
      />
      <Row>
        {type !== undefined &&
          type.map((item: Type) => {
            return (
              <Types key={item.type.name}>
                <TypesText>{item.type.name}</TypesText>
              </Types>
            );
          })}
      </Row>
    </CardContainer>
  );
};

export default Card;
