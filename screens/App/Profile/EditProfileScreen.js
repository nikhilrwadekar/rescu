import React, { Component } from "react";

// React Native
import {
  Text,
  StyleSheet,
  View,
  Alert,
  ScrollView,
  AsyncStorage
} from "react-native";

// Custom Components
import AppInput from "../../../components/AppInput";
import UpdateButtonProfileComponent from "../../../components/UpdateButtonProfileComponent";
import ProfileHeader from "../../../components/ProfileHeader";

export default class EditProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: "Anonymous User",
      email: "example@example.com",
      phoneNumber: "1234567890"
    };
  }

  componentDidMount = async () => {
    // Get User Data

    // Email Sign In
    const email = await AsyncStorage.getItem("userDetails");
    let userDetails = JSON.parse(email);
    this.setState({
      fullName: userDetails.name,
      email: userDetails.email,
      phoneNumber: userDetails.contact_number.toString(),
      photoURL: userDetails.profile_picture_url
    });
  };

  // Handle Change - Full Name
  handleFullNameChange = fullName => {
    this.setState({ fullName });
  };

  // Handle Change - Phone Number
  handlePhoneNumberChange = phoneNumber => {
    this.setState({ phoneNumber });
  };

  render() {
    return (
      <ScrollView>
        <View style={{ marginLeft: 20, marginRight: 20, paddingTop: 30 }}>
          {/* Profile Photo */}
          <View style={{ marginBottom: 30 }}>
            <ProfileHeader
              imageUrl={{ uri: this.state.photoURL }}
              // onPressEditProfile={this.handleEditProfile}
              key="1"
              fName={this.state.fullName}
            />
          </View>

          {/* Full Name */}
          <AppInput
            baseInputCustomStyle={styles.appInputStyle}
            label="Full Name"
            placeholderValue="John Doe"
            value={this.state.fullName}
            onChange={this.handleFullNameChange}
          />

          {/* Email */}
          <AppInput
            baseInputCustomStyle={styles.appInputStyle}
            label="Email Address"
            value={this.state.email}
            placeholderValue="johndoe@example.com"
          />

          {/* Phone Number */}
          <AppInput
            baseInputCustomStyle={styles.appInputStyle}
            label="Phone Number"
            value={this.state.phoneNumber}
            placeholderValue="1236127388"
            onChange={this.handlePhoneNumberChange}
          />

          {/* Update Profile Settings */}
          <UpdateButtonProfileComponent
            buttonText="Update"
            customStyle={{ marginTop: 10, marginBottom: 40 }}
            onPressUpdate={() =>
              Alert.alert("Profile information was updated!")
            }
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  appInputStyle: { marginBottom: 20 }
});
