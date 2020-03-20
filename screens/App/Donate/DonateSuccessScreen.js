import React, { Component } from "react";
import { Text, View, Share, Button, StyleSheet } from "react-native";
import DonationSuccess from "../../../components/DonationSuccess";
import ShareDonationComponent from "../../../components/ShareDonationComponent";

// Lottie
import LottieView from "lottie-react-native";
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

  componentDidMount() {
    this.animation.play();
    // Or set a specific startFrame and endFrame with:
    // this.animation.play(30, 120);
  }

  resetAnimation = () => {
    this.animation.reset();
    this.animation.play();
  };

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

  handleShareDonate = () => {};

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
        <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          style={{
            width: 400,
            height: 400,
            backgroundColor: ""
          }}
          source={require("../../../assets/lottie-animations/piggyDonation.json")}
          // OR find more Lottie files @ https://lottiefiles.com/featured
          // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
        />

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
  title: "Success"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    textAlign: "center"
  }
});
export default DonationSuccessScreen;
