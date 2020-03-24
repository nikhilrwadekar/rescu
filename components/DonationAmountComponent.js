import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";

const DonationAmountComponent = ({
  currency,
  initialAmount,
  question,
  onChangeDonationValue
}) => (
  <View style={styles.mainContainer}>
    {/* Text for the question */}
    <Text
      style={{ fontFamily: "OpenSans-Light", fontSize: 18, color: "#383940" }}
    >
      {question}
    </Text>

    <View style={styles.donationContainer}>
      {/* Text for the currency */}
      <Text
        style={{
          fontFamily: "OpenSans-Light",
          fontSize: 40,
          marginTop: 10,
          color: "#383940"
        }}
      >
        {currency}
      </Text>

      {/* Text input to display the value for donation */}
      <TextInput
        style={styles.donationInput}
        editable
        keyboardType="numeric"
        defaultValue={initialAmount}
        onChangeText={newValue => onChangeDonationValue(newValue)}
      />
    </View>
  </View>
);

// Styles
const styles = StyleSheet.create({
  donationContainer: {
    flexDirection: "row",

    width: "100%",
    justifyContent: "center"
  },
  mainContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  donationInput: {
    borderBottomWidth: 1,
    borderColor: "#383940",
    fontFamily: "OpenSans-Light",
    fontSize: 40,
    marginTop: 10,
    color: "#383940"
  }
});
export default DonationAmountComponent;
