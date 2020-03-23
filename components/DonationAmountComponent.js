import React from "react";
import { Text, View, Button, TextInput, StyleSheet } from "react-native";
import DonationValueButtonComponent from "./DonationValueButtonComponent";

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
      <Text
        style={{
          fontFamily: "OpenSans-Light",
          fontSize: 40,
          marginTop: 30
        }}
      >
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
    {/* <DonationValueButtonComponent buttonText="$10" /> */}
  </View>
);

const styles = StyleSheet.create({
  donationContainer: {
    flexDirection: "row",

    width: "100%",
    justifyContent: "center"
  },
  mainContainer: {
    // flex: 1,

    justifyContent: "center",
    alignItems: "center"
  },
  donationInput: {
    borderBottomWidth: 1,
    fontFamily: "OpenSans-Light",
    fontSize: 40,
    marginTop: 30
    // marginBottom: 30
  }
});
export default DonationAmountComponent;
