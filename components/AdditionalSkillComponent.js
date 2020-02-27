import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";

const AdditionalSkillComponent = ({ additionalSkillTextLabel, onGetText }) => (
  <View style={styles.container}>
    <Text>{additionalSkillTextLabel}</Text>
    <TextInput
      style={styles.input}
      placeholder="e.g. Cooking"
      onChangeText={val => onGetText(val)}
    />
  </View>
);

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10
  }
});

export default AdditionalSkillComponent;
