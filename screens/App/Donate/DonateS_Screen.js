import React, { Component } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import DonationSuccess from "../../../components/DonationSuccess";

export class DonateS_Screen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      thanksText: "Thank you!",
      currency: "$",
      initialAmount: this.initialAmount,
      donationCmfText: "Your donation was successful"
    };
  }

  render() {
    const { thanksText, currency, initialAmount, donationCmfText } = this.state;
    return (
      <View style={styles.container}>
        <DonationSuccess
          thanksText={this.thanksText}
          currency={currency}
          initialAmount={initialAmount}
          donationCmfText={donationCmfText}
        />
      </View>
    );
  }
}

DonateScreen.navigationOptions = {
  title: "Sucess"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    textAlign: "center"
  }
});
export default DonateS_Screen;
