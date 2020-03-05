import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";

const EncourageLogin= ({ encouragingText, buttonText, onPressLogin}) => (
  <View style={styles.mELContainer}>
    <Text>{encouragingText}</Text>

    <View style={styles.EncourageLoginContainer}>
    <Button title={buttonText} onPress={onPressLogin} />

    </View>
  </View>
);

const styles = StyleSheet.create({
  EncourageLoginContainer: {
    flexDirection: "row",
   // backgroundColor: "gray",
    width: "100%",
    justifyContent: "center"
  },
  mELContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
export default EncourageLogin;
