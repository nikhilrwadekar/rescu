import React, { Component } from "react";
import { Text, View, Share, Button, StyleSheet } from "react-native";
import DonationSuccess from "../../../components/DonationSuccess";
import ShareDonationComponent from "../../../components/ShareDonationComponent";

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

  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React"
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  handleShareDonate = () => {
    console.log("Profile Screen: handleShareDonate() was called");
  };

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

        <ShareDonationComponent
          textButton={"Share"}
          textStatement={"Encourage your friends to donate"}
          onShareButtonPress={this.onShare}
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
