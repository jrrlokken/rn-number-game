import { View, Text, StyleSheet, Platform } from 'react-native';
import TitleText from '../components/TitleText';

import Colors from '../constants/colors';

const Header = (props) => {
  return (
    <View
      style={{
        ...styles.headerBase,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid,
        }),
      }}
    >
      <TitleText style={styles.title}>{props.title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBase: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIOS: {
    backgroundColor: 'white',
    borderBottomColor: Colors.secondary,
    borderBottomWidth: 2,
  },
  headerAndroid: {
    backgroundColor: Colors.primary,
  },
  title: {
    color: Platform.OS === 'ios' ? Colors.primary : Colors.tertiary,
    fontSize: 22,
  },
});

export default Header;
