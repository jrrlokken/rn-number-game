import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import LargeButton from '../components/LargeButton';

import Colors from '../constants/colors';

const GameOverScreen = (props) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <TitleText style={styles.gameOver}>GAME OVER!</TitleText>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            resizeMode="cover"
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Dimensions.get('window').height < 600 ? 10 : 20,
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: (Dimensions.get('window').width * 0.7) / 2,
    borderColor: 'black',
    borderWidth: 3,
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 30,
  },
  resultsContainer: {
    marginHorizontal: 30,
    marginVertical: Dimensions.get('window').height / 60,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gameOver: {
    fontSize: Dimensions.get('window').height < 600 ? 20 : 30,
    marginTop: Dimensions.get('window').height < 600 ? 5 : 30,
  },
  resultText: {
    textAlign: 'center',
    fontSize: Dimensions.get('window').height < 600 ? 16 : 20,
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'roboto-black',
  },
});

export default GameOverScreen;
