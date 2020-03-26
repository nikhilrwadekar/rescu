// import React, { Component } from "react";
// import { Text, View, Button, StyleSheet } from "react-native";
// import DonationAmountComponent from "../../../components/DonationAmountComponent";

// export class DonateScreen extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       initialAmount: 200,
//       question: "How much would you like to Donate?",
//       currency: "$"
//     };
//   }

//   // Increment Donation by 1
//   handleIncrementDonation = () => {
//     this.setState({
//       initialAmount: this.state.initialAmount + 1
//     });
//   };

//   // Decrement Donation by 1
//   handleDecrementDonation = () => {
//     this.setState({
//       initialAmount: this.state.initialAmount - 1
//     });
//   };

//   // If user decides to type in the Donation Amount
//   handleDonationChange = newValue => {
//     this.setState({
//       initialAmount: parseInt(newValue)
//     });
//   };
//   render() {
//     // Destructuring the State
//     const { initialAmount, question, currency } = this.state;
//     return (
//       <View style={styles.container}>
//         <DonationAmountComponent
//           question={question}
//           initialAmount={initialAmount.toString()}
//           currency={currency}
//           onPressIncrement={this.handleIncrementDonation}
//           onPressDecrement={this.handleDecrementDonation}
//           onChangeDonationValue={this.handleDonationChange}
//         />

//         <Button
//           title="Go To Donation Success"
//           onPress={() => {
//             this.props.navigation.navigate("DonateSuccess");
//           }}
//         />
//       </View>
//     );
//   }
// }

// DonateScreen.navigationOptions = {
//   title: "Donate"
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     textAlign: "center"
//   }
// });

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
              this.props.navigation.navigate("DonationSuccess", {
                data: { amount: initialAmount }
              });
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
    textAlign: "center"
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
