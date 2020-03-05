import React from "react";
import { Text, View, StyleSheet } from "react-native";

const DonationSuccess = ({ thankingText, donationConfirmationText, currency, donationAmount}) => (
  <View style={styles.mDSContainer}>
    <Text>{thankingText}</Text>

    <View style={styles.donationSuccContainer}>
      <Text>{currency}</Text>
      <Text>{donationAmount}</Text>
      <Text>{donationConfirmationText}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  donationSuccContainer: {
    flexDirection: "row",
    backgroundColor: "#0f0",
    width: "100%",
    justifyContent: "center"
  },
  mDSContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
export default DonationSuccess;
