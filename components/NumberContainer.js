import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/colors";

const NumberContainer = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{props.number}</Text>
    </View>
  );
};

export default NumberContainer;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.accent,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "80%"
  },
  number: {
    color: Colors.primary,
    fontSize: 22,
    fontFamily: "openSans"
  }
});
