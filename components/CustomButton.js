import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from "react-native";
import Colors from "../constants/colors";

const CustomButton = props => {
  let ButtonComponent = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }
  return (
    <ButtonComponent onPress={props.press}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.title}</Text>
        {props.children}
      </View>
    </ButtonComponent>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10
  },
  buttonText: {
    color: "white",
    fontFamily: "openSans",
    fontSize: 18
  }
});
