import React, { Component } from "react";
import { Text, View, Share, StyleSheet } from "react-native";
import DonationSuccess from "../../../components/DonationSuccess";
import ShareDonationComponent from "../../../components/ShareDonationComponent";
import UpdateButtonProfileComponent from "../../../components/UpdateButtonProfileComponent";

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

  // Function for share the donation amount
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

  render() {
    const { thanksText, currency, donationCmfText } = this.state;

    const { navigation } = this.props;
    const { amount } = this.props.navigation.state.params.data;
    return (
      <View style={styles.container}>
        <Text style={styles.thankyouText}>Thank you!</Text>
        <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          style={{
            width: 200,
            height: 200,
            backgroundColor: "",
            alignSelf: "center",
            marginTop: 5
          }}
          source={require("../../../assets/lottie-animations/piggyDonation.json")}
          // OR find more Lottie files @ https://lottiefiles.com/featured
          // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
        />

        {/* Component to display the thanks message and value donated */}
        <DonationSuccess
          thankingText={thanksText}
          currency={currency}
          donationAmount={amount}
          donationConfirmationText={donationCmfText}
        />

        {/* Component to share the donation amount */}
        <ShareDonationComponent
          textButton={"Share"}
          textStatement={"Encourage your friends to donate"}
          onShareButtonPress={this.onShare}
          customStyle={styles.buttonShare}
        />

        {/* Component for sign up button */}
        <UpdateButtonProfileComponent
          buttonText="Sign Up"
          customStyle={styles.buttonConfirm}
          onPressUpdate={() => {
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

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center"
  },
  thankyouText: {
    textAlign: "center",
    marginTop: 40,
    fontFamily: "Quicksand-SemiBold",
    fontSize: 40,
    color: "#F27821"
  },
  buttonConfirm: {
    marginTop: 10
  },
  buttonShare: {
    marginTop: 10
  }
});
export default DonationSuccessScreen;
