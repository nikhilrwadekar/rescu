import React, { Component } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import DonationAmountComponent from "../../../components/DonationAmountComponent";

export class DonateScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialAmount: 200,
      question: "How much would you like to Donate?",
      currency: "$"
    };
  }

  // Increment Donation by 1
  handleIncrementDonation = () => {
    this.setState({
      initialAmount: this.state.initialAmount + 1
    });
  };

  // Decrement Donation by 1
  handleDecrementDonation = () => {
    this.setState({
      initialAmount: this.state.initialAmount - 1
    });
  };

  // If user decides to type in the Donation Amount
  handleDonationChange = newValue => {
    this.setState({
      initialAmount: parseInt(newValue)
    });
  };
  render() {
    // Destructuring the State
    const { initialAmount, question, currency } = this.state;
    return (
      <View style={styles.container}>
        <DonationAmountComponent
          question={question}
          initialAmount={initialAmount.toString()}
          currency={currency}
          onPressIncrement={this.handleIncrementDonation}
          onPressDecrement={this.handleDecrementDonation}
          onChangeDonationValue={this.handleDonationChange}
        />
      </View>
    );
  }
}

DonateScreen.navigationOptions = {
  title: "Donate"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    textAlign: "center"
  }
});
export default DonateScreen;
