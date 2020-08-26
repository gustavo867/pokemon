import React, { useState } from 'react';
import { Ionicons, AntDesign } from '@expo/vector-icons';

import { Wrapper, Button } from './styles';
import { useNavigation } from '@react-navigation/native';

const Header: React.FC = () => {
  const [isHeart, setIsHeart] = useState(false);

  const { goBack } = useNavigation();

  function handleHeart() {
    setIsHeart((prevState) => !prevState);
  }

  function handleNavigate() {
    goBack();
  }

  return (
    <Wrapper>
      <Button onPress={() => handleNavigate()}>
        <Ionicons name="ios-arrow-round-back" size={27} color="#FFF" />
      </Button>
      <Button onPress={handleHeart}>
        <AntDesign
          name={isHeart ? 'heart' : 'hearto'}
          size={23}
          color={isHeart === true ? '#fc6c6d' : '#FFF'}
        />
      </Button>
    </Wrapper>
  );
};

export default Header;
