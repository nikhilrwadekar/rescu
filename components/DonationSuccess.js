import React from "react";
import { Text, View, StyleSheet } from "react-native";
import DonationAmountComponent from "../../../components/DonationAmountComponent";

const DonationSuccess = ({ thanksText, donationCmfText }) => (
  <View style={styles.mDSContainer}>
    <Text>{thanksText}</Text>

    <View style={styles.donationSuccContainer}>
      <Text>{this.props.currency}</Text>
      <Text>{this.props.initialAmount}</Text>
      <Text>{donationCmfText}</Text>
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
