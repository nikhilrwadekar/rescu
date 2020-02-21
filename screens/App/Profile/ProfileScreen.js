import React, { Component } from "react";
import { Text, View } from "react-native";
import ProfileHeader from "../../../components/ProfileHeader";
import pic from "../../../assets/images/profile.png";
import ConfirmDeclineNotificationComponent from "../../../components/ConfirmDeclineNotificationComponent";



export class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: pic,
      buttonText: "Edit Profile"
    };
  }
    // Edit Profile Function
    onPressEditProfile = () => {
      this.setState({
        buttonText: "Text Changed"
      });
    };
  render() {
    return (
      <View>
        <ProfileHeader
          imageUrl={this.state.imageUrl}
          buttonText={this.state.buttonText}
          onPressEditProfile={this.onPressEditProfile}

        />
    

      </View>
    );
  }
}

ProfileScreen.navigationOptions = {
  title: "Profile Screen"
};

export default ProfileScreen;
