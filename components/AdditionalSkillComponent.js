import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";

const AdditionalSkillComponent = ({ additionalSkillTextLabel, onGetText }) => (
  <View style={styles.container}>
    <Text style={styles.textLabel}>{additionalSkillTextLabel}</Text>
    <TextInput style={styles.input} onChangeText={val => onGetText(val)} />
  </View>
);

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#F27821",
    padding: 8,
    borderRadius: 10,
    marginTop: 5,
    marginRight: 22,
    height: 45,
    width: 330,
    backgroundColor: "white"
  },
  textLabel: {
    textAlign: "left",
    marginTop: 25,
    fontSize: 17,
    fontFamily: "OpenSans-Regular"
  }
});

export default AdditionalSkillComponent;
