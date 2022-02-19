import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

import Colors from '../constants/colors';

const LargeButton = (props) => {
  let ButtonComponent = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }

  return (
    <ButtonComponent onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </ButtonComponent>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'roboto-regular',
    fontSize: 18,
  },
});

export default LargeButton;
