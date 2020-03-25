import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import Colors from "../constants/colors";

const Header = props => {
  return (
    <View
      style={{
        ...styles.header,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid
        })
      }}
    >
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 46,
    alignItems: "center",
    borderBottomWidth: 2
  },
  headerIOS: {
    backgroundColor: "white",
    borderBottomColor: Colors.accent
  },
  headerAndroid: {
    backgroundColor: Colors.primary,
    borderBottomColor: "transparent"
  },
  headerTitle: {
    color: Platform.OS === "android" ? "white" : Colors.primary,
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "openSansBold"
  }
});
