import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const ShareDonationLinkButton = ({
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

// Styles
const styles = StyleSheet.create({
  button: {
    justifyContent: "center"
  },
  btnText: {
    color: "#3672BC",
    textAlign: "center",
    fontFamily: "Quicksand-SemiBold",
    fontSize: 22
  }
});

export default ShareDonationLinkButton;
