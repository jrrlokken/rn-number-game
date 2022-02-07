import { View, StyleSheet, Text, Button, Image } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import LargeButton from '../components/LargeButton';

import Colors from '../constants/colors';

const GameOverScreen = (props) => {
  return (
    <View style={styles.container}>
      <TitleText style={styles.gameOver}>GAME OVER!</TitleText>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          resizeMode="cover"
          // source={{
          //   uri: 'https://s3.amazonaws.com/www.explorersweb.com/wp-content/uploads/2021/05/23233000/Summit-Everest-MingmaG.jpg',
          // }}
          source={require('../assets/success.png')}
        />
      </View>
      <View style={styles.resultsContainer}>
        <BodyText style={styles.resultText}>
          Your phone needed{' '}
          <Text style={styles.highlight}>{props.numRounds}</Text> rounds to
          guess the number{' '}
          <Text style={styles.highlight}>{props.userNumber}</Text>
        </BodyText>
      </View>
      <LargeButton onPress={props.onNewGame}>NEW GAME</LargeButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 250,
    height: 250,
    borderRadius: 150,
    borderColor: 'black',
    borderWidth: 3,
    overflow: 'hidden',
    marginVertical: 30,
  },
  resultsContainer: {
    marginHorizontal: 30,
    marginVertical: 15,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gameOver: {
    fontSize: 30,
  },
  resultText: {
    textAlign: 'center',
    fontSize: 20,
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold',
  },
});

export default GameOverScreen;
