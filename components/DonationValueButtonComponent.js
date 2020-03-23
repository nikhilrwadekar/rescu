import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const DonationValueButtonComponent = ({
  buttonText,
  onPressUpdate,
  customButtonStyle
}) => (
  <TouchableOpacity onPress={onPressUpdate} style={customButtonStyle}>
    <View style={styles.button}>
      <Text style={styles.btnText}>{buttonText}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 12,
    backgroundColor: "#3672BC",
    width: 60
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontFamily: "Quicksand-SemiBold",
    fontSize: 15
  }
});

export default DonationValueButtonComponent;
