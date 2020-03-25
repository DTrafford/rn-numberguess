import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ScrollView,
  FlatList,
  Dimensions
} from "react-native";
import Card from "../components/Card";
import NumberContainer from "../components/NumberContainer";
import DefaultStyles from "../constants/deafult-styles";
import Colors from "../constants/colors";

const generateNumberBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  if (randomNumber === exclude) {
    return generateNumberBetween(min, max, exclude);
  } else {
    return randomNumber;
  }
};

// Use with ScrollView
// const renderListItem = (value, numRound) => (
//   <View key={value} style={styles.list}>
//     <Text style={DefaultStyles.titleText}>ROUND {numRound}: </Text>
//     <Text style={DefaultStyles.titleText}>{value}</Text>
//   </View>
// );

// Use with FlatList
const renderListItem = (listLength, itemData) => (
  <View style={styles.fListItem}>
    <Text style={DefaultStyles.titleText}>
      ROUND {listLength - itemData.index}:{" "}
    </Text>
    <Text style={DefaultStyles.titleText}>{itemData.item}</Text>
  </View>
);

const GameScreen = props => {
  const initalGuess = generateNumberBetween(1, 100, props.userChoice);
  // InitialGuess is only added to state on first render
  const [currentGuess, setCurrentGuess] = useState(initalGuess);
  const [pastGuesses, setPastGuesses] = useState([initalGuess.toString()]);
  const [orientation, setOrientation] = useState(
    Dimensions.get("window").height > 500 ? "portrait" : "landscape"
  );
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  // useEffect is run after every render
  useEffect(() => {
    const updateOrientation = () => {
      setOrientation(
        Dimensions.get("window").height > 500 ? "portrait" : "landscape"
      );
      console.log(orientation);
    };

    Dimensions.addEventListener("change", updateOrientation);
    return () => {
      Dimensions.removeEventListener("change", updateOrientation);
    };
  });

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if (
      (direction == "lower" && currentGuess < props.userChoice) ||
      (direction == "higher" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't Lie!", "You know this is wrong", [
        { text: "Sorry!", style: "cancel" }
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateNumberBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);

    setPastGuesses(currentPastGuesses => [
      nextNumber.toString(),
      ...currentPastGuesses
    ]);
  };

  // Use with FlatList
  const renderListItem = (listLength, itemData) => (
    <View
      style={{
        ...styles.fListItem,
        height:
          orientation === "portrait"
            ? Dimensions.get("window").height / 15
            : Dimensions.get("window").height / 8
      }}
    >
      <Text style={DefaultStyles.titleText}>
        ROUND {listLength - itemData.index}:{" "}
      </Text>
      <Text style={DefaultStyles.titleText}>{itemData.item}</Text>
    </View>
  );

  if (Dimensions.get("window").height < 500) {
    return (
      <View style={styles.screenLandscape}>
        <View style={styles.screenLeft}>
          <Text style={DefaultStyles.titleText}>Opponents Guess: </Text>
          <NumberContainer number={currentGuess} />
          <Card style={styles.buttonContainer}>
            <Button
              style={{ paddingRight: -15 }}
              title="LOWER"
              color="red"
              onPress={nextGuessHandler.bind(this, "lower")}
            />
            <Button
              title="HIGHER"
              onPress={nextGuessHandler.bind(this, "higher")}
            />
          </Card>
        </View>
        <View style={styles.screenRight}>
          <View style={styles.fListContainer}>
            <FlatList
              keyExtractor={item => item}
              data={pastGuesses}
              renderItem={renderListItem.bind(this, pastGuesses.length)}
              contentContainerStyle={styles.fList}
            />
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.titleText}>Opponents Guess: </Text>
      <NumberContainer number={currentGuess} />
      <Card style={styles.buttonContainer}>
        <Button
          style={{ paddingRight: -15 }}
          title="LOWER"
          color="red"
          onPress={nextGuessHandler.bind(this, "lower")}
        />
        <Button
          title="HIGHER"
          onPress={nextGuessHandler.bind(this, "higher")}
        />
      </Card>
      {/* <ScrollView style={{ width: "80%" }}>
        {pastGuesses.map((guess, index) =>
          renderListItem(guess, pastGuesses.length - index)
        )}
      </ScrollView> */}
      <View style={styles.fListContainer}>
        <FlatList
          keyExtractor={item => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.fList}
        />
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  screenLandscape: {
    flexDirection: "row",
    paddingVertical: 10
  },
  screenLeft: {
    flex: 1,
    flexDirection: "column",
    width: "50%",
    height: "100%",

    justifyContent: "center",
    alignItems: "center"
  },
  screenRight: {
    flexDirection: "column",
    width: "50%",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: Dimensions.get("window").height > 600 ? 20 : 1,
    width: 300,
    maxWidth: "80%"
  },
  list: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 5,
    padding: 10,
    borderWidth: 1,
    height: 50,
    // width: "80%",
    borderColor: Colors.accent,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  fListContainer: {
    flex: 1,
    width: "100%"
  },
  fListContainerSmall: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  fList: {
    flexGrow: 1,
    alignItems: "center"
  },
  fListItem: {
    width: "70%",
    borderWidth: 1,
    borderColor: Colors.accent,
    backgroundColor: Colors.primary,
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    // height: "30%",
    height: Dimensions.get("window").height / 15,
    flexDirection: "row"
  },
  fListItemSmall: {
    width: "70%",
    borderWidth: 1,
    borderColor: Colors.accent,
    backgroundColor: Colors.primary,
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    // height: 80,
    height: Dimensions.get("window").height / 8,
    flexDirection: "row"
  }
});
