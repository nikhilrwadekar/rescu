import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function ButtonLink({ text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.item}>
        <Text style={styles.buttonText}>{text}</Text>
        <AntDesign name="right" size={18} color="#F27821" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    marginRight: 42,
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  buttonText: {
    color: "#F27821",
    fontFamily: "Quicksand-Medium",
    fontSize: 19,
    textAlign: "right",
    alignSelf: "center",
    marginRight: 3
  }
});
