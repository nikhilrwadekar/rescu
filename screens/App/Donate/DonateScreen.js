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
import { Text, View, Button, StyleSheet } from "react-native";
import CardNumberComponent from "../../../components/credit_card_details/CardNumberComponent";
import ExpirationCVVComponent from "../../../components/credit_card_details/ExpirationCVVComponent";
import CardHolderNameComponent from "../../../components/credit_card_details/CardHolderNameComponent";
import UpdateButtonProfileComponent from "../../../components/UpdateButtonProfileComponent";
import DonationAmountComponent from "../../../components/DonationAmountComponent";

export default class DonateScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialAmount: 200,
      question: "How much would you like to Donate?",
      currency: "$"
    };

    // check = () => {
    //   console.log("Hello");
    // };

    // displayDate = () => {
    //   console.log("Hello");
    // };
  }

  render() {
    // Destructuring the State
    const { initialAmount, question, currency } = this.state;
    return (
      <View style={styles.container}>
        <Text
          style={{
            textAlign: "center",
            marginTop: 25,
            marginBottom: 20,
            fontSize: 25,
            fontFamily: "Quicksand-Medium",
            color: "#383940"
          }}
        >
          Donate
        </Text>

        <DonationAmountComponent
          question={question}
          initialAmount={initialAmount.toString()}
          currency={currency}
          // onPressIncrement={this.handleIncrementDonation}
          // onPressDecrement={this.handleDecrementDonation}
          // onChangeDonationValue={this.handleDonationChange}
        />
        <CardNumberComponent />
        <ExpirationCVVComponent />
        <CardHolderNameComponent />
        <UpdateButtonProfileComponent
          buttonText="Confirm"
          customStyle={styles.test}
          onPressUpdate={() => {
            this.props.navigation.navigate("DonationSuccess");
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  test: {
    marginTop: 20
  },
  container: {
    flex: 1,
    padding: 10,
    textAlign: "center"
  }
});
