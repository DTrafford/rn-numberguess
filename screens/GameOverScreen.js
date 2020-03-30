import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import Colors from "../constants/colors";
import DefaultStyles from "../constants/deafult-styles";
import CustomButton from "../components/CustomButton";
import { Ionicons } from "@expo/vector-icons";

const GameOverScreen = props => {
  const [orientation, setOrientation] = useState(
    Dimensions.get("window").height > 500 ? "portrait" : "landscape"
  );
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

  if (orientation === "landscape") {
    return (
      <View style={styles.screenLandscape}>
        <View style={styles.screenLeft}>
          <View style={styles.imageContainer}>
            <Image
              // fadeDuration={1000}
              style={styles.image}
              resizeMode="stretch"
              source={require("../assets/images/iu-2.png")}
              // source={{
              //   uri:
              //     "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.icone-png.com%2Fpng%2F52%2F52078.png&f=1&nofb=1"
              // }}
            />
          </View>
        </View>
        <View style={styles.screenRight}>
          <Text style={{ ...DefaultStyles.bodyText, ...styles.text }}>
            The Opponent Guessed The Number in{" "}
            <Text style={{ color: Colors.primary, fontFamily: "openSansBold" }}>
              {props.numRounds}
            </Text>{" "}
            Rounds
          </Text>
          <Text
            style={{
              ...DefaultStyles.bodyText,
              ...styles.text,
              marginBottom: 10
            }}
          >
            The Number Was:{" "}
            <Text style={{ color: Colors.primary, fontFamily: "openSansBold" }}>
              {props.userNumber}
            </Text>
          </Text>
          <CustomButton title="RETURN" press={props.startGame}>
            <Ionicons
              name="md-refresh"
              size={24}
              color="white"
              style={{ marginLeft: 10 }}
            />
          </CustomButton>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image
          // fadeDuration={1000}
          style={styles.image}
          resizeMode="stretch"
          source={require("../assets/images/iu-2.png")}
          // source={{
          //   uri:
          //     "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.icone-png.com%2Fpng%2F52%2F52078.png&f=1&nofb=1"
          // }}
        />
      </View>
      <Text style={{ ...DefaultStyles.bodyText, ...styles.text }}>
        The Opponent Guessed The Number in{" "}
        <Text style={{ color: Colors.primary, fontFamily: "openSansBold" }}>
          {props.numRounds}
        </Text>{" "}
        Rounds
      </Text>
      <Text
        style={{ ...DefaultStyles.bodyText, ...styles.text, marginBottom: 10 }}
      >
        The Number Was:{" "}
        <Text style={{ color: Colors.primary, fontFamily: "openSansBold" }}>
          {props.userNumber}
        </Text>
      </Text>
      <CustomButton title="RETURN" press={props.startGame}>
        <Ionicons
          name="md-refresh"
          size={24}
          color="white"
          style={{ marginLeft: 10 }}
        />
      </CustomButton>
    </View>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  screenLandscape: {
    flexDirection: "row"
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
    padding: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  imageContainer: {
    maxWidth:
      Dimensions.get("window").width < 500
        ? Dimensions.get("window").width * 0.8
        : Dimensions.get("window").width * 0.3,
    height: Dimensions.get("window").width < 400 ? 400 : 200,
    marginBottom: 0
  },
  image: {
    maxWidth: "100%",
    height: "100%",
    marginBottom: 0
  },
  text: {
    textAlign: "center",
    fontSize: Dimensions.get("window").width > 400 ? 20 : 13
  }
});
