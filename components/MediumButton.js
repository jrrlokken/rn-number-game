import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Colors from '../constants/colors';

const MediumButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{ ...styles.button, ...props.style }}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'open-sans',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default MediumButton;
