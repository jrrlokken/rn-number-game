import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import CustomButton from '../components/LargeButton';
import BodyText from '../components/BodyText';

import Colors from '../constants/colors';
import Styles from '../constants/styles';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const randomNumber = Math.floor(Math.random() * (max - min)) + min;

  if (randomNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNumber;
  }
};

const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <BodyText>Guess # {listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
);

const GameScreen = (props) => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get('window').width
  );
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get('window').height
  );
  const currentMin = useRef(1);
  const currentMax = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width);
      setAvailableDeviceHeight(Dimensions.get('window').height);
    };

    const subscription = Dimensions.addEventListener('change', updateLayout);
    return () => subscription?.remove();
  });

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'higher' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't Cheat!", 'You know that hint was wrong... :(', [
        { text: 'Sorry', style: 'cancel' },
      ]);
      return;
    }

    if (direction === 'lower') {
      currentMax.current = currentGuess;
    } else {
      currentMin.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentMin.current,
      currentMax.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setPastGuesses((currentPastGuesses) => [
      nextNumber.toString(),
      ...currentPastGuesses,
    ]);
  };

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.container}>
        <Text style={Styles.title}>The Computer Guesses...</Text>
        <View style={styles.landscapeView}>
          <CustomButton onPress={nextGuessHandler.bind(this, 'lower')}>
            <Ionicons name="ios-arrow-down" size={24} color="white" />
          </CustomButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <CustomButton onPress={nextGuessHandler.bind(this, 'higher')}>
            <Ionicons name="ios-arrow-up" size={24} color="white" />
          </CustomButton>
        </View>
        <View style={styles.listContainer}>
          {/* <ScrollView contentContainerStyle={styles.listView}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView> */}
          <FlatList
            keyExtractor={(item) => item}
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
            contentContainerStyle={styles.listView}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={Styles.title}>The Phone Guesses...</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <CustomButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <Ionicons name="ios-arrow-down" size={24} color="white" />
        </CustomButton>
        <CustomButton onPress={nextGuessHandler.bind(this, 'higher')}>
          <Ionicons name="ios-arrow-up" size={24} color="white" />
        </CustomButton>
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.listView}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView> */}
        <FlatList
          keyExtractor={(item) => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.listView}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 400,
    maxWidth: '90%',
  },
  listItem: {
    borderColor: Colors.border,
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'space-around',
  },
  listContainer: {
    flex: 1,
    width: '90%',
    marginTop: 15,
  },
  listView: {
    flexGrow: 1,
  },
  landscapeView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
  },
});

export default GameScreen;
