import React from "react";
import { Text, View, Button, TextInput, StyleSheet } from "react-native";


const DonationAmountComponent = ({
  currency,
  initialAmount,
  question,
  onPressIncrement,
  onPressDecrement,
  onChangeDonationValue
}) => (
  <View style={styles.mainContainer}>
    <Text>{question}</Text>

    <View style={styles.donationContainer}>
      <Button title="-" onPress={onPressDecrement} />
      <Text>{currency}</Text>
      <TextInput
        style={styles.donationInput}
        editable
        keyboardType="numeric"
        defaultValue={initialAmount}
        onChangeText={newValue => onChangeDonationValue(newValue)}
      />
      <Button title="+" onPress={onPressIncrement} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  donationContainer: {
    flexDirection: "row",
    backgroundColor: "#0f0",
    width: "100%",
    justifyContent: "center"
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#f00",
    justifyContent: "center",
    alignItems: "center"
  },
  donationInput: {
    width: 200
  }
});
export default DonationAmountComponent;
