import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

export default function LogoutButton({ text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.item}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20
  },
  buttonText: {
    color: "#F27821",
    fontFamily: "Quicksand-Medium",
    fontSize: 19
  }
});
