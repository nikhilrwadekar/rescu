import React from "react";
import { Text, View, StyleSheet } from "react-native";

const DonationSuccess = ({
  // thankingText,
  donationConfirmationText,
  currency,
  donationAmount
}) => (
  <View style={styles.mDSContainer}>
    {/* <Text>{thankingText}</Text> */}

    <View style={styles.donationSuccContainer}>
      <View style={styles.donationValue}>
        <Text style={styles.currencyValue}>{currency}</Text>
        <Text style={styles.donationAmt}>{donationAmount}</Text>
      </View>
      <Text style={styles.donationConfirmationText}>
        {donationConfirmationText}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  donationSuccContainer: {
    // flexDirection: "row",
    // backgroundColor: "#0f0",
    width: "100%",
    justifyContent: "center",
    marginTop: 20
  },
  mDSContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  donationAmt: {
    fontFamily: "Quicksand-SemiBold",
    color: "#F27821",
    fontSize: 35
  },
  donationValue: {
    flexDirection: "row",
    justifyContent: "center"
  },
  donationConfirmationText: {
    textAlign: "center",
    fontFamily: "OpenSans-Regular",
    fontSize: 22,
    color: "#383940"
  },
  currencyValue: {
    fontFamily: "Quicksand-SemiBold",
    color: "#F27821",
    fontSize: 35
  }
});
export default DonationSuccess;
