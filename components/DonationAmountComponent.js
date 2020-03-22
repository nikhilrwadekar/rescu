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
    <Text style={{ fontFamily: "OpenSans-Light", fontSize: 18 }}>
      {question}
    </Text>

    <View style={styles.donationContainer}>
      {/* <Button title="-" onPress={onPressDecrement} /> */}
      <Text style={{ fontFamily: "OpenSans-Light", fontSize: 40 }}>
        {currency}
      </Text>
      <TextInput
        style={styles.donationInput}
        editable
        keyboardType="numeric"
        defaultValue={initialAmount}
        onChangeText={newValue => onChangeDonationValue(newValue)}
      />
      {/* <Button title="+" onPress={onPressIncrement} /> */}
    </View>
  </View>
);

const styles = StyleSheet.create({
  donationContainer: {
    flexDirection: "row",

    width: "100%",
    justifyContent: "center"
  },
  mainContainer: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center"
  },
  donationInput: {
    borderBottomWidth: 1,
    fontFamily: "OpenSans-Light",
    fontSize: 40
  }
});
export default DonationAmountComponent;
