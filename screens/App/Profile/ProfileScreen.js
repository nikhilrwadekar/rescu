import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ToastAndroid,
  AsyncStorage,
  ScrollView
} from "react-native";

// Custom Outreach Components
import ProfileHeader from "../../../components/ProfileHeader";
import ProfileOption from "../../../components/AssignedVolunteerings";
import AvailabilityToggleComponent from "../../../components/AvailabilityToggleComponent";
import UpdateButtonProfileComponent from "../../../components/UpdateButtonProfileComponent";
import LogoutButton from "../../../components/LogoutButton";

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAvailable: true,
      user: {},
      profile_picture_url: "",
      user: { photoUrl: "" }
    };
  }

  // Handle Edit Profile Press
  handleEditProfile = () => {
    this.props.navigation.navigate("EditProfile");
  };
  // Assigned Volunteerings
  handleAssignedVolunteeringsPress = () => {
    this.props.navigation.navigate("Tasks");
  };

  //Edit Preferences
  handleEditPreferencesPress = () => {
    this.props.navigation.navigate("EditPreferences");
  };

  //Donate
  handleDonatePress = () => {
    this.props.navigation.navigate("DonateSelectCauseWithID", {
      type: "withID"
    });
  };

  //Terms & Conditions
  handleTermsAndConditionsPress = () => {
    this.props.navigation.navigate("Terms");
  };

  async componentDidMount() {
    // Email Sign In
    const email = await AsyncStorage.getItem("userDetails");
    let userDetails = JSON.parse(email);
    this.setState({ user: userDetails });

    const google = await AsyncStorage.getItem("googleSignInDetails");

    let googleDetails = JSON.parse(google);

    this.setState({ user: googleDetails.user });
  }

  // Sign Out!
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("SignIn");
  };

  render() {
    const { isAvailable } = this.state;
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: "#f7f7f7" }}>
        <ScrollView>
          <ProfileHeader
            customHeadStyle={styles.header}
            imageUrl={{
              uri:
                this.state.user.photoUrl || this.state.user.profile_picture_url
            }}
            onPressEditProfile={this.handleEditProfile}
            key="1"
            fName={this.state.user.name}
          />

          <UpdateButtonProfileComponent
            onPressUpdate={this.handleEditProfile}
            buttonText="Edit Profile"
            customStyle={{ marginTop: 8, marginBottom: 30 }}
          />

          <AvailabilityToggleComponent
            availabilityText="Availability"
            onToggleChange={isAvailable => {
              ToastAndroid.showWithGravityAndOffset(
                "A wild toast appeared!",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
              this.setState({ isAvailable });
            }}
            switchValue={isAvailable}
          />

          <ProfileOption
            buttonText="Edit Preferences"
            onOptionPressed={this.handleEditPreferencesPress}
          />
          <ProfileOption
            buttonText="Donate"
            onOptionPressed={this.handleDonatePress}
          />
          <ProfileOption
            buttonText="Terms & Conditions"
            onOptionPressed={this.handleTermsAndConditionsPress}
          />

          {/* Logout */}
          <LogoutButton
            text="Logout"
            customStyle={{ marginTop: 10, marginBottom: 20 }}
            onPress={() => {
              Alert.alert(
                "Logout",
                "Do you really want to logout?",
                [
                  {
                    text: "Yes, please.",
                    onPress: () => this._signOutAsync()
                  },
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  }
                  // { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
              );
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

ProfileScreen.navigationOptions = {
  title: "Your Profile"
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    marginTop: 50
  }
});
