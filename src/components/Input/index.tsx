import React from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
  Dimensions,
} from 'react-native';

interface Props extends TextInputProps {
  label: string;
}

const { width } = Dimensions.get('window');

const Input: React.FC<Props> = ({ label, ...props }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },

  label: {
    color: '#8fa7b3',
    marginBottom: 8,
    paddingLeft: 15,
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 24,
    textAlignVertical: 'top',
    borderColor: '#d3e2e6',
    marginBottom: 16,
    height: 56,
    width: width * 0.98,
  },
});

export default Input;
