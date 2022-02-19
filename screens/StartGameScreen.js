import { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import LargeButton from '../components/LargeButton';
import MediumButton from '../components/MediumButton';

import Colors from '../constants/colors';

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get('window').width / 4
  );

  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setIsConfirmed(false);
  };

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4);
    };

    const subscription = Dimensions.addEventListener('change', updateLayout);
    return () => subscription?.remove();
  });

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid input', 'Input must be a number between 1 and 99', [
        { text: 'OK', style: 'destructive', onPress: resetInputHandler },
      ]);
      return;
    }
    setIsConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (isConfirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <BodyText>You selected</BodyText>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <LargeButton onPress={() => props.onStartGame(selectedNumber)}>
          START GAME
        </LargeButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={20}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.screen}>
            <TitleText style={styles.title}>Start a New Game</TitleText>
            <Card style={styles.inputContainer}>
              <BodyText>Input a Number</BodyText>
              <Input
                style={styles.numberInput}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredValue}
              />
              <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  <MediumButton
                    style={{ backgroundColor: Colors.secondary }}
                    onPress={resetInputHandler}
                  >
                    Reset
                  </MediumButton>
                </View>
                <View style={styles.button}>
                  <MediumButton
                    style={{ backgroundColor: Colors.primary }}
                    onPress={confirmInputHandler}
                  >
                    Confirm
                  </MediumButton>
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    minWidth: 300,
    maxWidth: '95%',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 15,
  },
  title: {
    fontFamily: 'roboto-black',
    fontSize: 20,
    color: Colors.secondary,
    marginVertical: 10,
  },
  button: {
    width: '40%',
    // width: Dimensions.get('window').width / 4,
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  numberInput: {
    width: 50,
    textAlign: 'center',
    fontFamily: 'roboto-black',
    fontSize: 20,
    color: Colors.secondary,
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'roboto-regular',
  },
});

export default StartGameScreen;
