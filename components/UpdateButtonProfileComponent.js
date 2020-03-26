import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const UpdateButtonProfileComponent = ({
  buttonText,
  onPressUpdate,
  customStyle
}) => (
  <TouchableOpacity onPress={onPressUpdate} style={customStyle}>
    <LinearGradient colors={["#F16908", "#E7281F"]} style={styles.button}>
      <Text style={styles.btnText}>{buttonText}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: "#F27821",
    width: 150,
    alignSelf: "center"
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontFamily: "Quicksand-SemiBold",
    textTransform: "uppercase",
    fontSize: 19
  }
});

export default UpdateButtonProfileComponent;
