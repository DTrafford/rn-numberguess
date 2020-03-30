import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  Image,
  Keyboard,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions
} from "react-native";
import Card from "../components/Card";
import Input from "../components/Input";
import CustomButton from "../components/CustomButton";
import NumberContainer from "../components/NumberContainer";
import Colors from "../constants/colors";
import { ScreenOrientation } from "expo";

// This import will automatically load the file with appropriate os extension
import MainButton from "../components/MainButton";

const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [orientation, setOrientation] = useState(
    Dimensions.get("window").height > 500 ? "portrait" : "landscape"
  );

  const numberInputHandler = inputValue => {
    setEnteredValue(inputValue.replace(/[^0-9]/g, ""));
  };

  useEffect(() => {
    const updateOrientation = () => {
      setOrientation(
        Dimensions.get("window").height > 500 ? "portrait" : "landscape"
      );
    };

    Dimensions.addEventListener("change", updateOrientation);
    return () => {
      Dimensions.removeEventListener("change", updateOrientation);
    };
  });
  const resetInputHandler = () => {
    setEnteredValue("");
    setGameStarted(false);
  };

  const confirmStartHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid Number", "Number must be between 1-99", [
        { text: "Okay", style: "destructive", onPress: resetInputHandler }
      ]);
      return;
    }
    setGameStarted(true);
    setSelectedNumber(parseInt(enteredValue));
    setEnteredValue("");
    Keyboard.dismiss();
  };

  let confirmOutput;

  if (gameStarted) {
    confirmOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You Selected:</Text>
        <NumberContainer number={selectedNumber} />
        <CustomButton
          title="Start Game"
          press={() => props.onStartGame(selectedNumber)}
        />
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position">
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.screen}>
            <Text style={styles.title}>Start A New Game</Text>
            <Card style={styles.inputContainer}>
              <Text style={styles.text}>Select A Number</Text>
              <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="numeric"
                maxLength={2}
                value={enteredValue}
                onChangeText={numberInputHandler}
              />
              <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  <Button
                    title="Confirm"
                    color={Colors.primary}
                    onPress={confirmStartHandler}
                  />
                </View>
                <View style={styles.button}>
                  <Button
                    title="Reset"
                    color={Colors.accent}
                    onPress={resetInputHandler}
                  />
                </View>
              </View>
            </Card>
            {confirmOutput}
            {!gameStarted ? (
              <View
                style={{
                  ...styles.imageContainer,
                  display: orientation === "portrait" ? "flex" : "none"
                }}
              >
                <Image
                  style={styles.image}
                  resizeMode="stretch"
                  source={require("../assets/images/iu-4.jpeg")}
                />
              </View>
            ) : null}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    fontFamily: "openSansBold",
    marginVertical: 15
  },
  text: {
    fontFamily: "openSans"
  },
  inputContainer: {
    maxWidth: "80%",
    width: "80%",
    minWidth: 300,
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15
  },
  button: {
    width: "35%"
  },
  input: {
    width: "25%",
    textAlign: "center",
    fontSize: 30,
    height: 40
  },
  summaryContainer: {
    marginVertical: 10,
    alignItems: "center"
  },
  imageContainer: {
    // display: Dimensions.get("window").height < 500 ? "none" : "flex",
    flex: 1,
    marginVertical: 10,
    maxWidth: "75%",
    height: 300,
    borderRadius: 20,
    justifyContent: "center"
  },
  image: {
    marginVertical: 10,
    maxWidth: "100%",
    height: "50%",
    borderRadius: 20
  }
});
