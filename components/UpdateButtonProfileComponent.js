import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const UpdateButtonProfileComponent = ({ buttonText, onPressUpdate }) => (
  <TouchableOpacity onPress={onPressUpdate}>
    <View style={styles.button}>
      <Text style={styles.btnText}>{buttonText}</Text>
    </View>
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
