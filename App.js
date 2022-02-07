import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onError={(error) => console.log(error)}
        onFinish={() => setLoading(false)}
      />
    );
  }

  const newGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = (numRounds) => {
    setGuessRounds(numRounds);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;
  // content = (
  //   <GameOverScreen numRounds={1} userNumber={1} onNewGame={newGameHandler} />
  // );
  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        numRounds={guessRounds}
        userNumber={userNumber}
        onNewGame={newGameHandler}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Header title="LET-ME-GUESS!" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecd1ee',
  },
});
