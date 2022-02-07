import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
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

const renderListItem = (value, round) => (
  <View key={value} style={styles.listItem}>
    <BodyText>Guess # {round}</BodyText>
    <BodyText>{value}</BodyText>
  </View>
);

const GameScreen = (props) => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const currentMin = useRef(1);
  const currentMax = useRef(100);

  const { userChoice, onGameOver } = props;

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
    // setRounds((currentRounds) => currentRounds + 1);
    setPastGuesses((currentPastGuesses) => [nextNumber, ...currentPastGuesses]);
  };

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
        <ScrollView contentContainerStyle={styles.listView}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView>
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
    marginTop: 20,
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
  },
  listView: {},
});

export default GameScreen;
