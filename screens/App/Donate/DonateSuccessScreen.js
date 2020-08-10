import React, { Component } from "react";
import { Text, View, Share, StyleSheet, SafeAreaView } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import DonationSuccess from "../../../components/DonationSuccess";
import ShareDonationComponent from "../../../components/ShareDonationComponent";
import UpdateButtonProfileComponent from "../../../components/UpdateButtonProfileComponent";

// Lottie
import LottieView from "lottie-react-native";
import { ScrollView } from "react-native-gesture-handler";
export class DonationSuccessScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      thanksText: "Thank you!",
      currency: "$",
      donationAmount: "120",
      donationCmfText: "Your donation was successful!",
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
          "React Native | A framework for building native apps using React",
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
    // Params from Navigation
    const { params } = this.props.navigation.state;
    const { type } = params;

    // Other
    const { thanksText, currency, donationCmfText } = this.state;

    const { navigation } = this.props;
    const { amount } = this.props.navigation.state.params.data;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.thankyouText}>Thank you!</Text>
          <LottieView
            ref={(animation) => {
              this.animation = animation;
            }}
            style={{
              // width: 200,
              // height: 200,
              width: wp("25%"),
              height: hp("25%"),
              backgroundColor: "",
              alignSelf: "center",
              marginTop: 5,
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

          {/* If not signed in, Show Sign Up! */}
          {type == "withoutID" && (
            <View>
              <Text style={styles.encouragingText}>
                Let's all come together to help the people in need.
              </Text>

              <UpdateButtonProfileComponent
                buttonText="Sign Up"
                customStyle={styles.buttonConfirm}
                onPressUpdate={() => {
                  navigation.navigate("SignUp");
                }}
              />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

DonationSuccessScreen.navigationOptions = {
  title: "Success",
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    backgroundColor: "#f7f7f7",
  },
  thankyouText: {
    textAlign: "center",
    marginTop: "5 %",
    fontFamily: "Quicksand-SemiBold",
    fontSize: 40,
    color: "#F27821",
  },
  buttonConfirm: {
    marginTop: 17,
  },
  buttonShare: {
    marginTop: 20,
  },
  encouragingText: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "OpenSans-Regular",
    color: "#383940",
    marginLeft: 15,
    marginRight: 15,
    marginTop: "8%",
  },
});
export default DonationSuccessScreen;
