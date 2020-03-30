import React, { useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native"; // Safe Area View Helps With Notches
import * as Font from "expo-font";
import { AppLoading } from "expo";
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

const fecthFonts = () => {
  return Font.loadAsync({
    openSans: require("./assets/fonts/OpenSans-Regular.ttf"),
    openSansBold: require("./assets/fonts/OpenSans-Bold.ttf")
  });
};

const fetchImages = () => {
  return;
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fecthFonts}
        onFinish={() => setFontLoaded(true)}
        onError={err => console.log(err)}
      />
    );
  }
  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = numRounds => {
    setGuessRounds(numRounds);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        numRounds={guessRounds}
        userNumber={userNumber}
        startGame={configureNewGameHandler}
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Number Guesser" />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
