import React from 'react';
import { View, Text } from 'react-native';

const Loading: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#010101',
      }}
    >
      <Text style={{ color: '#FFF', fontSize: 24, fontFamily: '700' }}>
        Loading ...
      </Text>
    </View>
  );
};

export default Loading;
