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
    marginLeft: 22,
    marginRight: 22,
    height: 45
  },
  textLabel: {
    textAlign: "left",
    marginTop: 25,
    fontSize: 17,
    fontFamily: "OpenSans-Light",
    marginLeft: 22
  }
});

export default AdditionalSkillComponent;
