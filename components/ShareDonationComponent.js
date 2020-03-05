import React from "react";
import { Text, View, Button, TextInput, StyleSheet } from "react-native";

const ShareDonationComponent = ({
  textButton,
  textStatement,
  onShareButtonPress
}) => (
  <View>
    <Text style={styles.text}>{textStatement}</Text>
    <View style={styles.button}>
      <Button title={textButton} onPress={onShareButtonPress} color="#ec4714" />
    </View>
  </View>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    textAlign: "center"
  },
  button: {
    marginTop: 20
  }
});

export default ShareDonationComponent;
