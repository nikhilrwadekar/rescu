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
    marginTop: 20,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "black"
  },
  btnText: {
    color: "white",
    textAlign: "center"
  }
});

export default UpdateButtonProfileComponent;
