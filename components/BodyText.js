import React from "react";
import { StyleSheet, Text, View } from "react-native";

const BodyText = props => {
  return <Text style={styles.text}>{props.children}</Text>;
};

export default BodyText;

const styles = StyleSheet.create({
  text: {
    fontFamily: "openSans"
  }
});
