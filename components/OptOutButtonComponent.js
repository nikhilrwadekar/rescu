import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const OptOutButtonComponent = ({ buttonText, onPressUpdate, customStyle }) => (
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
    borderColor: "#F27821",
    width: 100,
    alignSelf: "center",
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontFamily: "Quicksand-SemiBold",
    textTransform: "uppercase",
    color: "#F27821",
    fontSize: 16,
  },
});

export default OptOutButtonComponent;
