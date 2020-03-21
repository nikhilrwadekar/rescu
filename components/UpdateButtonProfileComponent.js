import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const UpdateButtonProfileComponent = ({ buttonText, onPressUpdate }) => (
  <TouchableOpacity onPress={onPressUpdate}>
    <LinearGradient colors={["#F16908", "#E7281F"]} style={styles.button}>
      <Text style={styles.btnText}>{buttonText}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    marginTop: 18,
    borderRadius: 10,
    paddingVertical: 14,
    // paddingHorizontal: 10,
    backgroundColor: "#F27821",
    width: 150,
    alignSelf: "center",
    marginBottom: 30
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontFamily: "Quicksand-SemiBold"
  }
});

export default UpdateButtonProfileComponent;
