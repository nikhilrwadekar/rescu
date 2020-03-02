import React, { Component } from "react";
import { Text, View, Share, StyleSheet } from "react-native";
import ShareDonationComponent from "../../../components/ShareDonationComponent";
import UpdateButtonProfileComponent from "../../../components/UpdateButtonProfileComponent";
import AdditionalSkillComponent from "../../../components/AdditionalSkillComponent";
import AvailabilityToggleComponent from "../../../components/AvailabilityToggleComponent";

export class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // switchValue1 = false
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

  handleToggleValue = value => {
    // console.log("Toggle button was called");
    this.setState({ switchValue1: value });
    console.log("Switch 1 is: " + value);
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <Text> This is Profile Screen </Text> */}
        <ShareDonationComponent
          textButton={"Share"}
          textStatement={"Encourage your friends to donate"}
          onShareButtonPress={this.onShare}
        />

        <UpdateButtonProfileComponent
          buttonText={"Update"}
          onPressUpdate={() => console.log("Update")}
        />

        <AdditionalSkillComponent
          additionalSkillTextLabel={"Additional skills or services"}
          onGetText={val => console.log(val)}
        />

        <AvailabilityToggleComponent
          availabilityText={"Availibility"}
          switchValue={this.state.switchValue1}
          onToggleChange={this.handleToggleValue}
        />
      </View>
    );
  }
}

ProfileScreen.navigationOptions = {
  title: "Profile Screen"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    textAlign: "center"
  }
});

export default ProfileScreen;
