import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import CardNumberComponent from "../../../components/credit_card_details/CardNumberComponent";
import ExpirationCVVComponent from "../../../components/credit_card_details/ExpirationCVVComponent";
import CardHolderNameComponent from "../../../components/credit_card_details/CardHolderNameComponent";
import UpdateButtonProfileComponent from "../../../components/UpdateButtonProfileComponent";
import DonationAmountComponent from "../../../components/DonationAmountComponent";
import DonationValueButtonComponent from "../../../components/DonationValueButtonComponent";

export default class DonateScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialAmount: 200,
      question: "How much would you like to Donate?",
      currency: "$",

      // An array of values of buttons
      values: [
        {
          text: "$5",
          value: "5"
        },
        {
          text: "$20",
          value: "20"
        },
        {
          text: "$50",
          value: "50"
        },
        {
          text: "$100",
          value: "100"
        }
      ]
    };
  }

  // If user decides to type in the Donation Amount
  handleDonationChange = newValue => {
    this.setState({
      initialAmount: parseInt(newValue)
    });
    console.log(newValue);
  };

  render() {
    // Destructuring the State
    const { initialAmount, question, currency } = this.state;
    const { values } = this.state;

    // Params from Navigation
    const { params } = this.props.navigation.state;
    const { type } = params;

    const renderedButtons = values.map(b => {
      return (
        <DonationValueButtonComponent
          key={b.text}
          buttonText={b.text}
          onPressUpdate={() => {
            this.setState({ initialAmount: b.value });
            console.log(b.value);
          }}
        />
      );
    });

    return (
      <View style={styles.container}>
        <ScrollView>
          {/* Header */}
          <Text
            style={{
              textAlign: "center",
              marginTop: 12,
              marginBottom: 20,
              fontSize: 25,
              fontFamily: "Quicksand-Medium",
              color: "#383940"
            }}
          >
            Donate
          </Text>

          {/* Donation statement */}
          <DonationAmountComponent
            question={question}
            initialAmount={initialAmount.toString()}
            currency={currency}
            onChangeDonationValue={this.handleDonationChange}
          />

          {/* Rendering the buttons */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 30,
              marginLeft: 25,
              marginRight: 25,
              marginBottom: 30
            }}
          >
            {renderedButtons}
          </View>

          {/* Text Input for credit card number */}
          <CardNumberComponent />

          {/* Text input for expiration and cvv number */}
          <ExpirationCVVComponent />

          {/* Text input for card holder name */}
          <CardHolderNameComponent />

          {/* Button to confirm the donation */}
          <UpdateButtonProfileComponent
            buttonText="Confirm"
            customStyle={{ marginTop: 30, marginBottom: 40 }}
            onPressUpdate={() => {
              if (type == "withID") {
                this.props.navigation.navigate("DonateSuccessWithID", {
                  type: "withID",
                  data: { amount: initialAmount }
                });
              } else if (type == "withoutID") {
                this.props.navigation.navigate("DonateSuccessWithoutID", {
                  type: "withoutID",
                  data: { amount: initialAmount }
                });
              }
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  // test: {
  //   marginTop: 20
  // },
  container: {
    flex: 1,
    padding: 10,
    textAlign: "center",
    backgroundColor: "#f7f7f7"
  },
  btnStyle: {
    marginLeft: 40,
    marginTop: 20
  },
  customDonate: {
    marginLeft: 30,
    marginBottom: 20
  }
});
