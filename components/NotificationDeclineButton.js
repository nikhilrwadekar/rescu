import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";

const NotificationDeclineButton = ({
  buttonText,
  onPressUpdate,
  customStyle
}) => (
  <TouchableOpacity onPress={onPressUpdate} style={customStyle}>
    <View style={styles.button}>
      <Text style={styles.btnText}>{buttonText}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#707070",
    width: 95,
    alignSelf: "center"
  },
  btnText: {
    textAlign: "center",
    fontFamily: "Quicksand-SemiBold",
    color: "#707070",
    textTransform: "uppercase",
    fontSize: 16
  }
});

export default NotificationDeclineButton;
