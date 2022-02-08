import { Text, StyleSheet } from 'react-native';

const TitleText = (props) => {
  return (
    <Text style={{ ...styles.title, ...props.style }}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'roboto-black',
    fontSize: 18,
  },
});

export default TitleText;
