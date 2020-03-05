import React, { Component } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import DonationSuccess from "../../../components/DonationSuccess";

export class DonationSuccessScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      thanksText: "Thank you!",
      currency: "$",
      donationAmount: "120",
      donationCmfText: "Your donation was successful!"
    };
  }

  render() {
    const {
      thanksText,
      currency,
      donationAmount,
      donationCmfText
    } = this.state;

    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <DonationSuccess
          thankingText={thanksText}
          currency={currency}
          donationAmount={donationAmount}
          donationConfirmationText={donationCmfText}
        />

        <Button
          title="Sign Up"
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        />
      </View>
    );
  }
}

DonationSuccessScreen.navigationOptions = {
  title: "Sucess"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    textAlign: "center"
  }
});
export default DonationSuccessScreen;
